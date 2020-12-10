import { Contract } from 'ethers'
import { useActiveWeb3React } from '../../../hooks'
import { useMemo } from 'react'
import { getContract } from '../../../utils'
import ChargeFactoryABI from './abis/ChargeFactory.json'
import ChargeABI from './abis/Charge.json'
import EthProxyABI from './abis/ChargeEthProxy.json'
import { ChainId, Token } from 'meterswap-sdk'
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
  [ChainId.METER]: '0x205532D70FffcfBBDA46b9559D8e3D4aa9E484CD',
}

export const ChargeEthProxyAddress: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.ROPSTEN]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.RINKEBY]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.GÖRLI]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.KOVAN]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
  [ChainId.METER]: '0x053caB1Ba35F99991F8dD43CCca58D97a702490c',
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
