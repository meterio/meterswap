import { ChainId, Token } from '@uniswap/sdk'
import { useActiveWeb3React } from '../../../../hooks'
import { parseEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import { isValidNumber } from '../utils'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { CONNECT_WALLET } from '../strings'

export default function(amount: string, token: Token | null): string | null {
  const { account, chainId } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, token ?? undefined)

  if (!account) {
    return CONNECT_WALLET
  }

  if (!(chainId === ChainId.RINKEBY)) {
    return 'Wrong network'
  }

  if (!isValidNumber(amount) || parseFloat(amount) <= 0) {
    return 'Enter a number'
  }

  if (!token || !balance) {
    return 'Loading...'
  }

  const isInsufficient = parseEther(amount)
    .mul(BigNumber.from(10).pow(token.decimals))
    .gt(parseEther(balance.raw.toString()))
  if (isInsufficient) {
    return 'Insufficient balance'
  }

  return null
}
