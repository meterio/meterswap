import { ChainId, Token } from 'meterswap-sdk'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from '../../../../hooks'
import { CONNECT_WALLET } from '../strings'
import { ActionType } from '../../Pool/constants'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { isValidNumber, tryParseAmount } from '../utils'
import { parseEther } from 'ethers/lib/utils'
import { useExpectedTarget, useTotalBaseCapital, useTotalQuoteCapital } from '../../contracts/useChargePair'

export function useInputError(
  contractAddress: string | undefined,
  currentAction: ActionType,
  currentToken: Token | null,
  inputTokenAmount: string): string | null {

  const { account, chainId } = useActiveWeb3React()
  // const baseToken = useBaseToken(contractAddress)
  const balance = useCurrencyBalance(account ?? undefined, currentToken ?? undefined)
  const balanceBI = balance ? BigNumber.from(balance.raw.toString()) : null
  // const myBaseCapitalBalance = useMyBaseCapitalBalance(contractAddress)
  // const myQuoteCapitalBalance = useMyQuoteCapitalBalance(contractAddress)
  // const isBase = currentToken?.symbol === baseToken?.symbol
  const inputTokenAmountBI = tryParseAmount(inputTokenAmount, currentToken?.decimals)

  // TODO: Withdraw should compare with token amount instead of LP amount

  if (!account) {
    return CONNECT_WALLET
  }

  if (chainId !== ChainId.RINKEBY && chainId !== ChainId.MAINNET) {
    return 'Wrong network'
  }

  if (!isValidNumber(inputTokenAmount) || parseEther(inputTokenAmount).lte(0)) {
    return 'Enter a number'
  }

  if (!balanceBI || !inputTokenAmountBI) {
    return 'Loading...'
  }

  if (currentAction === ActionType.Deposit && inputTokenAmountBI.gt(balanceBI)) {
    return 'Insufficient balance'
  }

  return null
}

export function useEstimateTokenAmount(
  contractAddress: string | undefined,
  baseCapitalAmount: BigNumber | null,
  quoteCapitalAmount: BigNumber | null)
  : { base: BigNumber | null, quote: BigNumber | null } {
  // requireBaseCapital / totalBaseCapital  * baseTarget
  const totalBaseCapital = useTotalBaseCapital(contractAddress)
  const totalQuoteCapital = useTotalQuoteCapital(contractAddress)
  const { baseTarget, quoteTarget } = useExpectedTarget(contractAddress)
  return {
    base: totalBaseCapital && baseCapitalAmount && baseTarget && baseCapitalAmount.mul(baseTarget).div(totalBaseCapital),
    quote: totalQuoteCapital && quoteCapitalAmount && quoteTarget && quoteCapitalAmount.mul(quoteTarget).div(totalQuoteCapital)
  }
}
