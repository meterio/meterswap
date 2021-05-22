import { ActionType } from '../../Pool/constants'
import { CurrencyAmount, Token, TokenAmount } from 'my-meter-swap-sdk'
import { displaySymbol, isWETH, tryParseAmount } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import {
  useBaseCapitalToken,
  useBaseToken,
  useMyBaseCapitalBalance, useMyQuoteCapitalBalance,
  useQuoteCapitalToken,
  useQuoteToken
} from '../../contracts/useChargePair'
import { useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useCharge, useChargeEthProxy } from '../../contracts/useContract'
import usePairs from './usePairs'

export default function(action: ActionType, inputAmount: string, token: Token | null, isConnectWallet: boolean) {
  const { selectedPair } = usePairs()
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)
  const baseCapitalToken = useBaseCapitalToken(selectedPair)
  const quoteCapitalToken = useQuoteCapitalToken(selectedPair)
  const myBaseCapitalBalance = useMyBaseCapitalBalance(selectedPair)
  const myQuoteCapitalBalance = useMyQuoteCapitalBalance(selectedPair)

  const isDeposit = action === ActionType.Deposit
  const isBase = token?.symbol === baseToken?.symbol

  const capitalToken = isBase ? baseCapitalToken : quoteCapitalToken
  const payToken = isDeposit ? token : capitalToken
  const inputAmountBI = tryParseAmount(inputAmount, payToken?.decimals)

  let approvalAmount: CurrencyAmount | undefined = undefined
  if (payToken && inputAmountBI) {
    if (isDeposit) {
      approvalAmount = new TokenAmount(payToken, inputAmountBI.mul(100).toString())
    } else {
      const capitalBalance = isBase ? myBaseCapitalBalance : myQuoteCapitalBalance
      if (capitalBalance) {
        approvalAmount = new TokenAmount(payToken, capitalBalance.toString())
      }
    }
  }

  const chargeContract = useCharge(selectedPair, true)
  const chargeEthProxyContract = useChargeEthProxy(true)
  const [approval, approveCallback] = useApproveCallback(
    approvalAmount, isWETH(token) ? chargeEthProxyContract?.address : selectedPair
  )


  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!token || !baseToken || !quoteToken || !inputAmountBI) {
      console.error({ token, baseToken, quoteToken, amountBI: inputAmountBI })
      return
    }
    if (!(isDeposit && isWETH(token))) {
      await approveCallback()
    }

    console.log('Pool submit', action, inputAmountBI.toString(), displaySymbol(token))

    if (isWETH(token)) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeEthProxyContract.depositEthAsBase : chargeEthProxyContract.depositEthAsQuote) :
        (isBase ? chargeEthProxyContract.withdrawEthAsBase : chargeEthProxyContract.withdrawEthAsQuote)
      const response = await method(
        inputAmountBI,
        isBase ? quoteToken.address : baseToken.address,
        { value: (isDeposit && isWETH(payToken)) ? inputAmountBI : undefined, gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(token)}` })
    } else {
      if (!chargeContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeContract.depositBase : chargeContract.depositQuote) :
        (isBase ? chargeContract.withdrawBase : chargeContract.withdrawQuote)
      const response = await method(
        inputAmountBI,
        { gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(token)}` })
    }
  }
}
