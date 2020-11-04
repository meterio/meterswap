import { ActionType } from '../../Pool/constants'
import { parseUnits } from 'ethers/lib/utils'
import { Token, TokenAmount } from '@uniswap/sdk'
import { displaySymbol, isValidNumber, isWETH } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { useBaseToken, useQuoteToken } from '../../contracts/useChargePair'
import { useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useCharge, useChargeEthProxy } from '../../contracts/useContract'
import usePairs from './usePairs'

export default function(action: ActionType, amount: string, token: Token | null, isConnectWallet: boolean) {
  const { selectedPair } = usePairs()
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)

  const isEther = isWETH(token)

  const amountBI = isValidNumber(amount) ? parseUnits(amount, token?.decimals) : undefined
  const currencyAmount = (token && amountBI) ? new TokenAmount(token, amountBI.toString()) : undefined

  const [approval, approveCallback] = useApproveCallback(currencyAmount, selectedPair)
  const chargeContract = useCharge(selectedPair, true)
  const chargeEthProxyContract = useChargeEthProxy(true)


  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!token || !baseToken || !quoteToken || !currencyAmount || !amountBI) {
      console.error({ token, baseToken, quoteToken, currencyAmount, amountBI })
      return
    }
    if (!approval && !isEther) {
      await approveCallback()
    }

    const isDeposit = action === ActionType.Deposit
    const isBase = token.symbol === baseToken.symbol

    console.log('Pool submit', action, amountBI.toString(), displaySymbol(token))

    if (isEther) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeEthProxyContract.depositEthAsBase : chargeEthProxyContract.depositEthAsQuote) :
        (isBase ? chargeEthProxyContract.withdrawEthAsBase : chargeEthProxyContract.withdrawEthAsQuote)
      const response = await method(
        amountBI,
        isBase ? quoteToken.address : baseToken.address,
        { value: isDeposit ? amountBI : undefined, gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(token)}` })
    } else {
      if (!chargeContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeContract.depositBase : chargeContract.depositQuote) :
        (isBase ? chargeContract.withdrawBase : chargeContract.withdrawQuote)
      const response = await method(
        amountBI,
        { gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(token)}` })
    }
  }
}
