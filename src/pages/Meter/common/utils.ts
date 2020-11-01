import { BigNumber } from 'ethers'

export function tryParseBigNumber(value: any): BigNumber | null {
  try {
    const result = BigNumber.from(value)
    return result
  } catch (e) {
    return null
  }
}

