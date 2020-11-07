import { ActionType } from '../../Swap/constants'
import { TokenAmount } from '@uniswap/sdk'
import { displaySymbol, isWETH, tryParseAmount } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { useBaseToken, useQuoteToken } from '../../contracts/useChargePair'
import { useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useCharge, useChargeEthProxy } from '../../contracts/useContract'
import usePairs from './usePairs'
import { useExpected } from './useSwap'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../../hooks'

export default function(action: ActionType, baseAmount: string, isConnectWallet: boolean) {
  const { selectedPair } = usePairs()
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)

  const baseAmountBI = tryParseAmount(baseAmount, baseToken?.decimals)
  const { payToken } = useExpected(selectedPair, action, baseAmountBI)
  const totalBalance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)

  const [approval, approveCallback] = useApproveCallback(totalBalance, selectedPair)
  const chargeContract = useCharge(selectedPair, true)
  const chargeEthProxyContract = useChargeEthProxy(true)

  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!isWETH(payToken)) {
      console.log('approve', totalBalance?.raw.toString(), payToken?.symbol)
      await approveCallback()
    }

    if (!baseToken || !quoteToken || !baseAmountBI) {
      return
    }
    console.log(`Swap submit: ${action} ${baseToken.symbol}`, baseAmountBI.toString())


    if (isWETH(baseToken) || isWETH(quoteToken)) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = action === ActionType.Buy ?
        (isWETH(baseToken) ? chargeEthProxyContract.buyEthWithToken : chargeEthProxyContract.buyTokenWithEth) :
        (isWETH(baseToken) ? chargeEthProxyContract.sellEthToToken : chargeEthProxyContract.sellTokenToEth)

      const address = isWETH(baseToken) ? quoteToken.address : baseToken
      const ethAmount = baseAmountBI
      const limitAmount = action === ActionType.Buy ? baseAmountBI.mul(2) : '0x00'
      const options = { value: isWETH(payToken) ? baseAmountBI : undefined, gasLimit: 350000 }
      const response = await method(address, ethAmount, limitAmount, options)
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    } else {
      if (!chargeContract) {
        return
      }
      const method = action === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
      const baseAmount = baseAmountBI
      const limitQuoteAmount = action === ActionType.Buy ? baseAmountBI.mul(10000) : '0x00'
      const data = '0x'
      const options = { gasLimit: 350000 }
      const response = await method(baseAmount, limitQuoteAmount, data, options)
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    }
  }
}
