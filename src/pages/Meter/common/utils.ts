import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { Token } from '@uniswap/sdk'

export function tryParseBigNumber(value: any): BigNumber | null {
  try {
    return BigNumber.from(value)
  } catch (e) {
    return null
  }
}

export function formatBigNumber(value: BigNumber, decimals: number, digits: number = 4): string {
  const result = formatUnits(value, decimals)
  const parts = result.split('.')
  if (parts.length !== 2) {
    return result
  }
  return parts[0] + '.' + parts[1].slice(0, digits)
}

export function displaySymbol(token: Token | null | undefined): string {
  if (!token) {
    return ''
  }
  if (token.symbol === 'WETH') {
    return 'ETH'
  }
  return token.symbol ?? ''
}
