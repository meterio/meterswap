import { useQueryBuyBaseToken, useQuerySellBaseToken } from '../../contracts/useChargePair'
import { ActionType } from '../../Swap/constants'
import { BigNumber } from 'ethers'

export default function(contractAddress: string | undefined, action: ActionType, inputBaseAmount: BigNumber | undefined): BigNumber | null {
  const buyPayQuoteAmount = useQueryBuyBaseToken(contractAddress, inputBaseAmount)
  const sellReceiveQuoteAmount = useQuerySellBaseToken(contractAddress, inputBaseAmount)
  return action === ActionType.Buy ? buyPayQuoteAmount : sellReceiveQuoteAmount
}
