import { ActionType } from '../../Pool/constants'
import { parseUnits } from 'ethers/lib/utils'
import { Token, TokenAmount } from '@uniswap/sdk'
import { displaySymbol, isValidNumber, isWETH } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { useBaseCapitalToken, useBaseToken, useQuoteCapitalToken, useQuoteToken } from '../../contracts/useChargePair'
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

  const isDeposit = action === ActionType.Deposit
  const isBase = token?.symbol === baseToken?.symbol
  const isEther = isWETH(token)

  const capitalToken = isBase ? baseCapitalToken : quoteCapitalToken
  const payToken = isDeposit ? token : capitalToken
  const inputAmountBI = isValidNumber(inputAmount) ? parseUnits(inputAmount, token?.decimals) : undefined
  const approvalAmount = (payToken && inputAmountBI) ? new TokenAmount(payToken, inputAmountBI.mul(100).toString()) : undefined

  const [approval, approveCallback] = useApproveCallback(approvalAmount, selectedPair)
  const chargeContract = useCharge(selectedPair, true)
  const chargeEthProxyContract = useChargeEthProxy(true)


  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!token || !baseToken || !quoteToken || !inputAmountBI) {
      console.error({ token, baseToken, quoteToken, amountBI: inputAmountBI })
      return
    }
    if (!(isDeposit && isEther)) {
      await approveCallback()
    }

    console.log('Pool submit', action, inputAmountBI.toString(), displaySymbol(token))

    if (isEther) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeEthProxyContract.depositEthAsBase : chargeEthProxyContract.depositEthAsQuote) :
        (isBase ? chargeEthProxyContract.withdrawEthAsBase : chargeEthProxyContract.withdrawEthAsQuote)
      const response = await method(
        inputAmountBI,
        isBase ? quoteToken.address : baseToken.address,
        { value: isDeposit ? inputAmountBI : undefined, gasLimit: 350000 })
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
