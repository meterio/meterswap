import { ChainId, Token } from '@uniswap/sdk'

export const MeterTokens: { [chainId in ChainId]: { [address: string]: Token } } = {
  [ChainId.MAINNET]: {},
  [ChainId.RINKEBY]: {
    '0x4f6D94accF73713968f6D1B3d191A05762BfD2c1': new Token(
      ChainId.MAINNET,
      '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e',
      18,
      'EMTR',
      'EMTR')

  },
  [ChainId.ROPSTEN]: {},
  [ChainId.KOVAN]: {},
  [ChainId.GÖRLI]: {}
}
