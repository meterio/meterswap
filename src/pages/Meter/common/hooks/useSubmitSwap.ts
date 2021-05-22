import { ActionType } from '../../Swap/constants'
import { TokenAmount } from 'my-meter-swap-sdk'
import { displaySymbol, formatBigNumber, isWETH, tryParseAmount } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { useBaseToken, useQuoteToken } from '../../contracts/useChargePair'
import { useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useCharge, useChargeEthProxy } from '../../contracts/useContract'
import usePairs from './usePairs'
import { useExpected } from './useSwap'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../../hooks'
import { useUserSlippageTolerance } from '../../../../state/user/hooks'

export default function(action: ActionType, baseAmount: string, isConnectWallet: boolean) {
  const { selectedPair } = usePairs()
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)

  const baseAmountBI = tryParseAmount(baseAmount, baseToken?.decimals)
  const { payToken, receiveToken, payAmount, receiveAmount } = useExpected(selectedPair, action, baseAmountBI)
  const totalBalance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)

  const chargeEthProxyContract = useChargeEthProxy(true)
  const isEthProxy = isWETH(baseToken) || isWETH(quoteToken)
  const [approval, approveCallback] = useApproveCallback(totalBalance, isEthProxy ? chargeEthProxyContract?.address : selectedPair)
  const chargeContract = useCharge(selectedPair, true)

  const [allowedSlippage] = useUserSlippageTolerance()
  const maxPayQuoteAmount = payAmount?.mul(10000 + allowedSlippage).div(10000)
  const minReceiveQuoteAmount = receiveAmount?.mul(10000 - allowedSlippage).div(10000)
  const limitQuoteAmount = action === ActionType.Buy ? maxPayQuoteAmount : minReceiveQuoteAmount

  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!baseToken || !quoteToken || !baseAmountBI || !payAmount || !receiveAmount || !payToken || !receiveToken) {
      return
    }

    console.log(`Swap submit: ${action} ${baseToken.symbol}(allowedSlippage=${allowedSlippage}):
    ${formatBigNumber(payAmount, payToken.decimals)} ${payToken.symbol}
    =>
    ${formatBigNumber(receiveAmount, receiveToken.decimals)} ${payToken.symbol}`)
    console.log('approve', totalBalance?.raw.toString(), payToken?.symbol)
    await approveCallback()

    if (isEthProxy) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = action === ActionType.Buy ?
        (isWETH(baseToken) ? chargeEthProxyContract.buyEthWithToken : chargeEthProxyContract.buyTokenWithEth) :
        (isWETH(baseToken) ? chargeEthProxyContract.sellEthToToken : chargeEthProxyContract.sellTokenToEth)

      const address = isWETH(baseToken) ? quoteToken.address : baseToken
      const ethAmount = baseAmountBI
      const options = { value: isWETH(payToken) ? baseAmountBI : undefined, gasLimit: 350000 }
      const response = await method(address, ethAmount, limitQuoteAmount, options)
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    } else {
      if (!chargeContract) {
        return
      }
      const method = action === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
      const baseAmount = baseAmountBI
      const data = '0x'
      const options = { gasLimit: 350000 }
      const response = await method(baseAmount, limitQuoteAmount, data, options)
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    }
  }
}
