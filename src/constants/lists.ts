// the Uniswap Default token list lives here
import {tokens} from './swap_tokens_list.json';
export const DEFAULT_TOKEN_LIST_URL = 'tokens.uniswap.eth'

//const tokenList = 'https://github.com/meterio/token-list/blob/master/generated/swap-tokens.json'

var stringifiedTokens = JSON.stringify(tokens)
export const DEFAULT_LIST_OF_LISTS: string[] = [
    JSON.parse(stringifiedTokens)
]
