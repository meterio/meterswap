import { Contract } from 'ethers'
import { useActiveWeb3React } from '../../../hooks'
import { useMemo } from 'react'
import { getContract } from '../../../utils'
import ChargeFactoryABI from './abis/ChargeFactory.json'
import ChargeABI from './abis/Charge.json'
import EthProxyABI from './abis/ChargeEthProxy.json'
import { ChainId, Token } from 'voltswap-sdk'
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

export const ChargeFactoryAddress: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
  [ChainId.ROPSTEN]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
  [ChainId.RINKEBY]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
  [ChainId.GÖRLI]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
  [ChainId.KOVAN]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
  [ChainId.METER]: '0x56aD9A9149685b290ffeC883937caE191e193135',
  [ChainId.THETA]:'0xdB29b2314F0E3c6d04CCD0C303223f28d6aF2d8E',
  [ChainId.MOONBEAM]:'0xeC550D7cE45CD0cEC9eE471C9B52A7D9cf92476C'
}

export const ChargeEthProxyAddress: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.ROPSTEN]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.RINKEBY]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.GÖRLI]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.KOVAN]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.METER]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.THETA]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.MOONBEAM]:'0x053caB1Ba35F99991F8dD43CCca58D97a702490c'
}

export function useChargeFactory(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? ChargeFactoryAddress[chainId] : undefined, ChargeFactoryABI, false)
}

export function useChargeEthProxy(withSigner: boolean = false): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? ChargeEthProxyAddress[chainId] : undefined, EthProxyABI, withSigner)
}

export function useCharge(address: string | undefined, withSigner: boolean = false): Contract | null {
  return useContract(address, ChargeABI, withSigner)
}
