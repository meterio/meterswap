import { ChainId, Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from 'voltswap-sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency?.symbol === ETHER[chainId || 82].symbol ? WETH[chainId] : currency instanceof Token ? currency : undefined
}



export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token, chainId:ChainId): Currency {
  if (token.equals(WETH[token.chainId])) return ETHER[chainId||82 ]
  return token
}
