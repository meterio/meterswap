import { useCharge } from './useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'
import { BigNumber } from 'ethers'
import { Token } from '@uniswap/sdk'
import { useToken } from '../../../hooks/Tokens'
import { useActiveWeb3React } from '../../../hooks'
import { useTokenContract } from '../../../hooks/useContract'

/**
 * Swap
 */

export function useLpFeeRate(address: string): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_LP_FEE_RATE_', [])
}

export function useBaseToken(address: string | undefined): Token | null {
  const contract = useCharge(address)
  const tokenAddress = useOnceCallResult(contract, '_BASE_TOKEN_', [])
  return useToken(tokenAddress) ?? null
}

export function useQuoteToken(address: string | undefined): Token | null {
  const contract = useCharge(address)
  const tokenAddress = useOnceCallResult(contract, '_QUOTE_TOKEN_', [])
  return useToken(tokenAddress) ?? null
}

export function useOraclePrice(address: string | undefined): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, 'getOraclePrice', [])
}

/**
 * Pool
 */

export function useBaseBalance(address: string | undefined): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_BASE_BALANCE_', [])
}

export function useQuoteBalance(address: string | undefined): BigNumber | null {
  const contract = useCharge(address)
  return useOnceCallResult(contract, '_QUOTE_BALANCE_', [])
}

export function useMyBaseCapitalBalance(address: string | undefined): BigNumber | null {
  const { account } = useActiveWeb3React()
  const contract = useCharge(address)
  const baseCapitalToken = useOnceCallResult(contract, '_BASE_CAPITAL_TOKEN_', []) as string
  const tokenContract = useTokenContract(baseCapitalToken)
  return useOnceCallResult(tokenContract, 'balanceOf', [account || undefined])
}
