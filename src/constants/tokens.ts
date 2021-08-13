import { ChainId, Token } from 'meterswap-sdk'

export const MeterTokens: { [chainId in ChainId]: { [address: string]: Token } } = {

  [ChainId.METER]: {
    '0x687A6294D0D6d63e751A059bf1ca68E4AE7B13E2': new Token(
      ChainId.METER,
      '0x687A6294D0D6d63e751A059bf1ca68E4AE7B13E2',
      18,
      'MTR',
      'MTR'
    ),
    '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3': new Token(
      ChainId.METER,
      '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3',
      18,
      'MTRG',
      'MTRG'
    ),
    '0xa285BFF4202fE703B497729E4076C601CBB96d04': new Token(
      ChainId.METER,
      '0xa285BFF4202fE703B497729E4076C601CBB96d04',
      6,
      'USDT',
      'USDT'
    ),
    '0x1a6eef221e4c4a2CCf84d125E975FbB3A879F66E': new Token(
      ChainId.METER,
      '0x1a6eef221e4c4a2CCf84d125E975FbB3A879F66E',
      18,
      'ETH',
      'ETH'
    ),
    '0x39BFB931Cae5B1A3033237Db1244004a3dF5987b': new Token(
      ChainId.METER,
      '0x39BFB931Cae5B1A3033237Db1244004a3dF5987b',
      18,
      'USDC',
      'USDC'
    ),
    '0xe347E3948761832b9bcC288d2202A69278D51ddD': new Token(
      ChainId.METER,
      '0xe347E3948761832b9bcC288d2202A69278D51ddD',
      18,
      'WBTC',
      'WBTC'
    )

  },
  [ChainId.MAINNET]: {},
  [ChainId.RINKEBY]: {
    '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e': new Token(
      ChainId.RINKEBY,
      '0xBeE85b7b676f9306803B6DFC09F024c30a7A2a1e',
      18,
      'EMTR',
      'EMTR'
    ),
    '0x4f6d94accf73713968f6d1b3d191a05762bfd2c1': new Token(
      ChainId.RINKEBY,
      '0x4f6d94accf73713968f6d1b3d191a05762bfd2c1',
      18,
      'EMTRG',
      'EMTRG'
    )
  },
  [ChainId.ROPSTEN]: {},
  [ChainId.KOVAN]: {},
  [ChainId.GÖRLI]: {}
}
