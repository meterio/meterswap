import { ChainId, Token } from 'voltswap-sdk'






export const MeterTokens: { [chainId in ChainId]: { [address: string]: Token } } = {

 [ChainId.THETA]:{
  '0x5709dDd0376014202654788466FDd70bda5E69Bb':  new Token(
    ChainId.THETA,
    '0x5709dDd0376014202654788466FDd70bda5E69Bb',
    18,
    'BUSD.bsc',
    'BUSD.bsc'
  ),

  '0x07446A7e12C2d24d6b180d009e4255aE26fBF018': new Token(
    ChainId.THETA,
    '0x07446A7e12C2d24d6b180d009e4255aE26fBF018',
    18,
    'WETH.eth',
    'WETH.eth'
  ),
  '0x4Dc08B15ea0e10B96c41Aec22fAB934bA15C983e': new Token(
    ChainId.THETA,
    '0x4Dc08B15ea0e10B96c41Aec22fAB934bA15C983e',
    18,
    'TFUEL',
    'TFUEL'
  ),
  
 },

  

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
    '0xd86e243fc0007e6226b07c9a50c9d70d78299eb5': new Token(
      ChainId.METER,
      '0xd86e243fc0007e6226b07c9a50c9d70d78299eb5',
      6,
      'USDC.eth',
      'USDC.eth'
    ),
    '0x5Fa41671c48e3C951AfC30816947126CCC8C162e': new Token(
      ChainId.METER,
      '0x5Fa41671c48e3C951AfC30816947126CCC8C162e',
      6,
      'USDT.eth',
      'USDT.eth'
    ),
    '0xF8BBb44E6fD13632D36fe09eB61820f9A44f5D74': new Token(
      ChainId.METER,
      '0xF8BBb44E6fD13632D36fe09eB61820f9A44f5D74',
      18,
      'BNB.bsc',
      'BNB.bsc'
    ),
  
    '0x24aA189DfAa76c671c279262F94434770F557c35': new Token(
      ChainId.METER,
      '0x24aA189DfAa76c671c279262F94434770F557c35',
      18,
      'BUSD.bsc',
      'BUSD.bsc'
    ),
    '0x79A61D3A28F8c8537A3DF63092927cFa1150Fb3C': new Token(
      ChainId.METER,
      '0x79A61D3A28F8c8537A3DF63092927cFa1150Fb3C',
      18,
      'WETH.eth',
      'WETH.eth'
    ),
    '0xc1f6C86ABEe8e2e0B6fd5BD80F0b51fef783635C': new Token(
      ChainId.METER,
      '0xc1f6C86ABEe8e2e0B6fd5BD80F0b51fef783635C',
      8,
      'WBTC.eth',
      'WBTC.eth'
    ),
      
  '0x8Df95e66Cb0eF38F91D2776DA3c921768982fBa0': new Token(
    ChainId.METER,
    '0x8Df95e66Cb0eF38F91D2776DA3c921768982fBa0',
    18,
    'VOLT',
    'VOLT'
  ),
  
///from here

   

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
