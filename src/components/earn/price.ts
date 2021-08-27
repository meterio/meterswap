import CGApi from 'coingecko-api'

import * as ls from './cache'

const MS_PER_SEC = 1000

export const MIN_IN_SEC = 60
export const HOUR_IN_SEC = 60 * MIN_IN_SEC
export const DAY_IN_SEC = 24 * HOUR_IN_SEC
export const WEEK_IN_SEC = 7 * DAY_IN_SEC
export const MONTH_IN_SEC = 30 * DAY_IN_SEC
export const YEAR_IN_SEC = 365 * DAY_IN_SEC

export const MIN_IN_MS = MIN_IN_SEC * MS_PER_SEC
export const HOUR_IN_MS = HOUR_IN_SEC * MS_PER_SEC

const DEFAULT_PRICES: Record<string, number> = {
  AMPL: 1.0,
  BTC: 50000.0,
  WETH: 320,
  LINK: 5,
  BAL: 10,
  LEND: 0.33,
  COMP: 100,
  MKR: 350,
  CRV: 0.5,
  BZRX: 0.1,
  YFI: 17000,
  NMR: 25,
  USDC: 1,
  MTRG:2.37,
  MTR:2.91,
  'UNI-V2':2.91,
  'yDAI+yUSDC+yUSDT+yTUSD': 1.1,
}

const SYMBOL_TO_QUERY: Record<string, string> = {
  WBTC: 'wrapped-bitcoin',
  AMPL: 'ampleforth',
  WETH: 'ethereum',
  LINK: 'chainlink',
  BAL: 'balancer',
  LEND: 'ethlend',
  COMP: 'compound-governance-token',
  MKR: 'maker',
  CRV: 'curve-dao-token',
  BZRX: 'bzx-protocol',
  YFI: 'yearn-finance',
  NMR: 'numeraire',
  USDC: 'usd-coin',
  MTRG: 'meter-governance-mapped-by-meter-io',
  MTR: 'meter-stable',
  'UNI-V2':'meter-stable',
  'yDAI+yUSDC+yUSDT+yTUSD': 'curve-fi-ydai-yusdc-yusdt-ytusd',
}

export const getCurrentPrice = async (symbol: string) => {
  const cacheKey = `geyser|${symbol}|spot`
  const TTL = HOUR_IN_MS

  try {
    const query = SYMBOL_TO_QUERY[symbol]
    
    if (!query) {
      throw new Error(`Can't fetch price for ${symbol}`)
    }

    return await ls.computeAndCache<number>(
      async () => {
        const client = new CGApi()
        const reqTimeoutSec = 10
        const p: any = await Promise.race([
          client.simple.price({
            ids: [query],
            vs_currencies: ['usd'],
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('request timeout')), reqTimeoutSec * 1000)),
        ])
       
        
        const price = p.data[query].usd
        return price as number
      },
      cacheKey,
      TTL,
    )
  } catch (e) {
    console.error(e)
    return DEFAULT_PRICES[symbol] || 0
  }
}
