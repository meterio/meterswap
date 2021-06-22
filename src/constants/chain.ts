export interface Chains {
  [chainId: number]: {
    networkId: number
    name: string
    rpcUrl: string
    blockExplorer: string
    nativeTokenSymbol: string
    decimals: number
  }
}
const chains: Chains = {
  101: {
    networkId: 101,
    name: 'Meter Testnet',
    rpcUrl: 'https://rpctest.meter.io',
    blockExplorer: 'https://scan-warringstakes.meter.io',
    nativeTokenSymbol: 'MTR',
    decimals: 18
  },
  82: {
    networkId: 82,
    name: 'Meter Mainnet',
    rpcUrl: 'https://rpc.meter.io',
    blockExplorer: 'https://scan.meter.io',
    nativeTokenSymbol: 'MTR',
    decimals: 18
  }
}

const getChain = (chainId: number) => {
  return chains[chainId]
}

export default getChain
