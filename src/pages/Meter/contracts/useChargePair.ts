import { useCharge } from './useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'
import { BigNumber } from 'ethers'
import { Token } from '@uniswap/sdk'
import { useToken } from '../../../hooks/Tokens'

export function useLpFeeRate(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_LP_FEE_RATE_', [])
}

export function useTargetBaseTokenAmount(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_TARGET_BASE_TOKEN_AMOUNT_', [])
}

export function useTargetQuoteTokenAmount(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_TARGET_QUOTE_TOKEN_AMOUNT_', [])
}

export function useBaseToken(address: string): Token | null {
  const contract = useCharge(address)
  const tokenAddress = useOnceCallResult(contract, '_BASE_TOKEN_', [])
  return useToken(tokenAddress) ?? null
}

export function useQuoteToken(address: string): Token | null {
  const contract = useCharge(address)
  const tokenAddress = useOnceCallResult(contract, '_QUOTE_TOKEN_', [])
  return useToken(tokenAddress) ?? null
}

export function useOraclePrice(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, 'getOraclePrice', [])
}

export function useQuoteCapitalBalanceOf(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, 'getQuoteCapitalBalanceOf', [])
}
