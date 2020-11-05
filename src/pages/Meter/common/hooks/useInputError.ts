import { ChainId, Token } from '@uniswap/sdk'
import { useActiveWeb3React } from '../../../../hooks'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import { isValidNumber } from '../utils'
import { CONNECT_WALLET } from '../strings'

export default function(
  token: Token | null,
  balance: BigNumber | null,
  inputAmount: string,
  payAmount: BigNumber | null): string | null {
  const { account, chainId } = useActiveWeb3React()

  if (!account) {
    return CONNECT_WALLET
  }

  if (!(chainId === ChainId.RINKEBY)) {
    return 'Wrong network'
  }

  if (!isValidNumber(inputAmount) || parseFloat(inputAmount) <= 0) {
    return 'Enter a number'
  }

  if (!token || !balance) {
    return 'Loading...'
  }

  if (!payAmount || payAmount.gt(balance)) {
    return 'Insufficient balance'
  }

  return null
}
