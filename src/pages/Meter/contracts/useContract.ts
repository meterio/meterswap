import { Contract } from 'ethers'
import { useActiveWeb3React } from '../../../hooks'
import { useMemo } from 'react'
import { getContract } from '../../../utils'
import ChargeFactoryABI from './abis/ChargeFactory.json'
import ChargeABI from './abis/Charge.json'
import { ChainId, Token } from '@uniswap/sdk'
import { Call, ListenerOptions } from '../../../state/multicall/actions'
import { useBlockNumber } from '../../../state/application/hooks'

function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export const ChargeFactoryToken: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.ROPSTEN, '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD', 18, 'UNI', 'Uniswap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD', 18, 'UNI', 'Uniswap'),
  [ChainId.GÖRLI]: new Token(ChainId.ROPSTEN, '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD', 18, 'UNI', 'Uniswap'),
  [ChainId.KOVAN]: new Token(ChainId.ROPSTEN, '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD', 18, 'UNI', 'Uniswap'),
  [ChainId.RINKEBY]: new Token(ChainId.ROPSTEN, '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD', 18, 'UNI', 'Uniswap')
}

export function useChargeFactory(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? ChargeFactoryToken[chainId].address : undefined, ChargeFactoryABI, false)
}

export function useCharge(address: string): Contract | null {
  return useContract(address, ChargeABI, false)
}
