import { CurrencyAmount, ETHER, JSBI, ChainId } from 'voltswap-sdk'
import { MIN_ETH } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount, chainId?:ChainId): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency?.symbol === ETHER[chainId||82].symbol) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_ETH), chainId || 82)
    } else {
      return CurrencyAmount.ether(JSBI.BigInt(0), chainId ||82)
    }
  }
  return currencyAmount
}
