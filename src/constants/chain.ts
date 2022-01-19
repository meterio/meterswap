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
  361: {
    networkId: 361,
    name: 'Theta Mainnet',
    rpcUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
    blockExplorer: 'https://explorer.thetatoken.org',
    nativeTokenSymbol: 'TFUEL',
    decimals: 18
  },
  82: {
    networkId: 82,
    name: 'Meter Mainnet',
    rpcUrl: 'https://rpc.meter.io',
    blockExplorer: 'https://scan.meter.io',
    nativeTokenSymbol: 'MTR',
    decimals: 18
  },
  1284:{
    networkId:1284,
    name:'Moonbeam Mainnet',
    rpcUrl:'https://moonbeam.api.onfinality.io/public',
    blockExplorer:'https://blockscout.moonriver.moonbeam.network',
    nativeTokenSymbol:'GLMR',
    decimals:18

  }
}

const getChain = (chainId: number) => {
  return chains[chainId]
}

export default getChain
