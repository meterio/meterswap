import { useBaseToken, useQueryBuyBaseToken, useQuerySellBaseToken, useQuoteToken } from '../../contracts/useChargePair'
import { ActionType } from '../../Swap/constants'
import { BigNumber } from 'ethers'
import { TokenAmount, Token } from '@uniswap/sdk'

export function useExpectedQuoteAmount(
  contractAddress: string | undefined,
  action: ActionType,
  inputBaseAmount?: BigNumber | null
): BigNumber | null {
  const buyPayQuoteAmount = useQueryBuyBaseToken(contractAddress, inputBaseAmount)
  const sellReceiveQuoteAmount = useQuerySellBaseToken(contractAddress, inputBaseAmount)
  return action === ActionType.Buy ? buyPayQuoteAmount : sellReceiveQuoteAmount
}

export function useExpectedPay(
  contractAddress: string | undefined,
  action: ActionType,
  inputBaseAmount?: BigNumber | null
): { payToken: Token | null, payAmount: BigNumber | null } {
  const expectedQuoteAmount = useExpectedQuoteAmount(contractAddress, action, inputBaseAmount)

  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const payToken = action === ActionType.Buy ? quoteToken : baseToken
  const result: { payToken: Token | null, payAmount: BigNumber | null } = {
    payToken: payToken,
    payAmount: null
  }

  if (payToken) {
    if (payToken === quoteToken && expectedQuoteAmount) {
      result.payAmount = expectedQuoteAmount
    }
    if (payToken === baseToken && inputBaseAmount) {
      result.payAmount = inputBaseAmount
    }
  }
  return result
}
