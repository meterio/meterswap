import { Currency, ETHER, Token, ChainId } from 'voltswap-sdk'

export function currencyId(currency: Currency, chainId:ChainId): string {
  if (currency?.symbol === ETHER[chainId || 82].symbol) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
