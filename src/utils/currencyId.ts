import { Currency, ETHER, Token } from 'voltswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency?.symbol === ETHER.symbol) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
