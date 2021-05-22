import { BigNumber, BigNumberish } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { Token } from 'my-meter-swap-sdk'

export function tryParseToBigNumber(value: any): BigNumber | null {
  try {
    return BigNumber.from(value)
  } catch (e) {
    return null
  }
}

export function tryParseAmount(amount: string, decimals?: number): BigNumber | null {
  return isValidNumber(amount) ? parseUnits(amount, decimals) : null
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

export function isValidNumber(str: string | undefined | null): boolean {
  if (!str) {
    return false
  }
  return !isNaN(parseFloat(str))
}

export function isWETH(token: Token | undefined | null): boolean {
  if (!token) {
    return false
  }
  return token.symbol === 'WETH'
}
