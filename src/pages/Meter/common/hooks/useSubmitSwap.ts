import { ActionType } from '../../Swap/constants'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { ETHER, Token, TokenAmount } from '@uniswap/sdk'
import { displaySymbol, isValidNumber, isWETH } from '../utils'
import { useWalletModalToggle } from '../../../../state/application/hooks'
import { useTransactionAdder } from '../../../../state/transactions/hooks'
import { useBaseToken, useQuoteToken } from '../../contracts/useChargePair'
import { useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useCharge, useChargeEthProxy } from '../../contracts/useContract'
import usePairs from './usePairs'
import { BigNumber } from 'ethers'

export default function(action: ActionType, baseAmount: string, isConnectWallet: boolean) {
  const { selectedPair } = usePairs()
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)
  const payToken = action === ActionType.Buy ? quoteToken : baseToken

  const baseAmountBI = isValidNumber(baseAmount) ? parseUnits(baseAmount, baseToken?.decimals) : undefined
  const currencyAmount = (baseToken && baseAmountBI) ? new TokenAmount(baseToken, baseAmountBI.toString()) : undefined

  const [approval, approveCallback] = useApproveCallback(currencyAmount, selectedPair)
  const chargeContract = useCharge(selectedPair, true)
  const chargeEthProxyContract = useChargeEthProxy(true)

  return async () => {
    if (isConnectWallet) {
      toggleWalletModal()
      return
    }
    if (!approval && !isWETH(payToken)) {
      await approveCallback()
    }

    if (!baseToken || !quoteToken) {
      return
    }

    if (isWETH(baseToken) || isWETH(quoteToken)) {
      if (!chargeEthProxyContract || !baseAmountBI) {
        return
      }

      console.log(`Swap submit: ${action} ${baseToken.symbol}`, baseAmountBI.toString())

      const method = action === ActionType.Buy ?
        (isWETH(baseToken) ? chargeEthProxyContract.buyEthWithToken : chargeEthProxyContract.buyTokenWithEth) :
        (isWETH(baseToken) ? chargeEthProxyContract.sellEthToToken : chargeEthProxyContract.sellTokenToEth)
      const response = await method(
        isWETH(baseToken) ? quoteToken.address : baseToken,
        baseAmountBI,
        action === ActionType.Buy ? baseAmountBI.mul(2) : '0x00',
        { value: isWETH(payToken) ? baseAmountBI : undefined, gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    } else {
      if (!chargeContract || !baseAmountBI) {
        return
      }

      console.log(`Swap submit: ${action} ${baseToken.symbol}`, baseAmountBI.toString())

      const method = action === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
      const response = await method(
        baseAmountBI,
        action === ActionType.Buy ? baseAmountBI.mul(2) : '0x00',
        '0x',
        { gasLimit: 350000 })
      addTransaction(response, { summary: `${action} ${displaySymbol(baseToken)}` })
    }
  }
}
