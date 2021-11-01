import { ChainId, JSBI, Percent, Token, WETH } from 'voltswap-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'



export const ROUTER_ADDRESS = '0xC6E88363ea74F31f514b56E979413B3Ee8d76f39'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}



export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 18, 'WBTC', 'Wrapped BTC')
export const MTR = new Token(ChainId.METER, '0x687A6294D0D6d63e751A059bf1ca68E4AE7B13E2', 18, 'MTR', 'MTR')
export const MTRG = new Token(ChainId.METER, '0x228ebBeE999c6a7ad74A6130E81b12f9Fe237Ba3', 18, 'MTRG', 'MTRG')

export const USDC_eth = new Token(ChainId.METER, '0xD86e243FC0007e6226B07c9A50C9d70D78299EB5', 6, 'USD.eth', 'USD.eth')
export const BNB_bsc = new Token(ChainId.METER, '0xF8BBb44E6fD13632D36fe09eB61820f9A44f5D74', 18, 'BNB.bsc', 'BNB.bsc')
export const BUSD_bsc = new Token(ChainId.METER, '0x24aA189DfAa76c671c279262F94434770F557c35', 18, 'BUSD.bsc', 'BUSD.bsc')
export const USDT_eth = new Token(ChainId.METER, '0x5Fa41671c48e3C951AfC30816947126CCC8C162e', 6, 'USDt.eth', 'USDT.eth')
export const VOLT = new Token(ChainId.METER, '0x8Df95e66Cb0eF38F91D2776DA3c921768982fBa0', 18, 'VOLT', 'VOLT')
export const WBTC_eth = new Token(ChainId.METER, '0xc1f6C86ABEe8e2e0B6fd5BD80F0b51fef783635C', 8, 'WBTC.eth', 'WBTC.eth')
export const WETH_eth = new Token(ChainId.METER, '0x79A61D3A28F8c8537A3DF63092927cFa1150Fb3C', 18, 'WETH.eth', 'WETH.eth')
export const WETH_theta = new Token(ChainId.THETA, '0x07446A7e12C2d24d6b180d009e4255aE26fBF018', 18, 'Weth.eth', 'WETH.eth')





// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.METER]: new Token(ChainId.METER, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.THETA]: new Token(ChainId.THETA, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  
  
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [MTR],
  [ChainId.ROPSTEN]: [MTR],
  [ChainId.RINKEBY]: [MTR],
  [ChainId.GÖRLI]: [MTR],
  [ChainId.KOVAN]: [MTR],
  [ChainId.METER]: [MTR],
  [ChainId.THETA]:[WETH_theta]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.METER]: [MTRG, WETH_eth]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {}
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}


export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.METER]: [
    [MTRG, MTR],
    [MTRG, USDC_eth],
    [MTRG, BNB_bsc],
    [MTRG, USDT_eth],
    [MTRG, VOLT],
    [MTRG, WBTC_eth],
    [MTRG, WETH_eth],

  
    [MTR, USDC_eth],
    [MTR, BNB_bsc],
    [MTR, USDT_eth],
    [MTR, VOLT],
    [MTR, WBTC_eth],
    [MTR, WETH_eth],

 
    [USDC_eth, BNB_bsc],
    [USDC_eth, USDT_eth],
    [USDC_eth, VOLT],
    [USDC_eth, WBTC_eth],
    [USDC_eth, WETH_eth],

    [BNB_bsc, USDT_eth],
    [BNB_bsc, VOLT],
    [BNB_bsc, WBTC_eth],
    [BNB_bsc, WETH_eth],

    [USDT_eth, VOLT],
    [USDT_eth, WBTC_eth],
    [USDT_eth, WETH_eth],

    [VOLT, WBTC_eth],
    [VOLT, WETH_eth]

  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
