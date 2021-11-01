import { TokenAmount, Pair, Currency } from 'voltswap-sdk'
import { useMemo } from 'react'
import { abi as IMeterPairABI } from '../constants/abis/IMeterPairABI.json';
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface(IMeterPairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

 
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )


  
 
  let init_hash = chainId == 82 ? '0x6e606594edd361bf44d40d92d2cdfc727a589f93838ad772145f30af1d6664eb':'0x973ae61b539a46236341ceee1b77feaafd7e9e098f799c4ae790b7a5fae726ca'
  let factory_address = chainId == 82 ? '0x56aD9A9149685b290ffeC883937caE191e193135' : '0xdB29b2314F0E3c6d04CCD0C303223f28d6aF2d8E'
  

  const pairAddresses = useMemo(
    () =>
    tokens.map(([tokenA, tokenB]) => {
       
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB,factory_address,init_hash) : undefined
      }),
    [tokens]
  )


  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
      ]
    })
  }, [results, tokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {

  return usePairs([[tokenA, tokenB]])[0]
}
