interface ChargeInfo {
  base: string;
  quote: string;
}

export const ChargesInfo: { [address: string]: ChargeInfo } = {
  '0x75029090907214Fe8CB9b97c071447829A7DB28c': {
    base: 'WETH',
    quote: 'USDC'
  },
  '0x26411A2B52C8f3fD330489047992bde860b1f823': {
    base: 'eMTR',
    quote: 'eMTRG'
  },
  '0x63DD4a125259EbC30F8eC683AFD6d25a51560A54': {
    base: 'eMTR',
    quote: 'NUSDT'
  }
}
