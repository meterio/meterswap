import { ChainId, Token } from 'meterswap-sdk'

export const MeterTokens: { [chainId in ChainId]: { [address: string]: Token } } = {
  [ChainId.METER]: {
    '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3': new Token(
      ChainId.METER,
      '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3',
      18,
      'MTRG',
      'MTRG')
  },
  [ChainId.MAINNET]: {},
  [ChainId.RINKEBY]: {
    '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e': new Token(
      ChainId.RINKEBY,
      '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e',
      18,
      'EMTR',
      'EMTR'),
    '0x4f6d94accf73713968f6d1b3d191a05762bfd2c1': new Token(
      ChainId.RINKEBY,
      '0x4f6d94accf73713968f6d1b3d191a05762bfd2c1',
      18,
      'EMTRG',
      'EMTRG')

  },
  [ChainId.ROPSTEN]: {},
  [ChainId.KOVAN]: {},
  [ChainId.GÖRLI]: {}
}
