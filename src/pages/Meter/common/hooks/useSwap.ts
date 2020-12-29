import {
  useBaseBalance,
  useBaseToken,
  useQueryBuyBaseToken,
  useQuerySellBaseToken,
  useQuoteBalance,
  useQuoteToken
} from '../../contracts/useChargePair'
import { ActionType } from '../../Swap/constants'
import { BigNumber } from 'ethers'
import { ChainId, Token } from 'meterswap-sdk'
import { useActiveWeb3React } from '../../../../hooks'
import { isValidNumber, tryParseAmount, tryParseToBigNumber } from '../utils'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { CONNECT_WALLET } from '../strings'
import { parseEther } from 'ethers/lib/utils'

export function useExpectedQuoteAmount(
  contractAddress: string | undefined,
  action: ActionType,
  inputBaseAmount?: BigNumber | null
): BigNumber | null {
  const payAmount = useQueryBuyBaseToken(contractAddress, inputBaseAmount)
  const receiveAmount = useQuerySellBaseToken(contractAddress, inputBaseAmount)
  return action === ActionType.Buy ? payAmount : receiveAmount
}

type ExpectedResult = {
  receiveToken: Token | null,
  receiveAmount: BigNumber | null,
  payToken: Token | null,
  payAmount: BigNumber | null,
}

export function useExpected(
  contractAddress: string | undefined,
  action: ActionType,
  inputBaseAmount: BigNumber | null | undefined
): ExpectedResult {
  const expectedQuoteAmount = useExpectedQuoteAmount(contractAddress, action, inputBaseAmount)

  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const payToken = action === ActionType.Buy ? quoteToken : baseToken
  const receiveToken = action === ActionType.Buy ? baseToken : quoteToken

  const result: ExpectedResult = {
    payToken,
    payAmount: null,
    receiveToken,
    receiveAmount: null
  }

  if (action === ActionType.Buy) {
    result.payAmount = expectedQuoteAmount
    result.receiveAmount = inputBaseAmount ?? null

  }
  if (action === ActionType.Sell) {
    result.payAmount = inputBaseAmount ?? null
    result.receiveAmount = expectedQuoteAmount
  }
  return result
}

export function useInputError(
  contractAddress: string | undefined,
  currentAction: ActionType,
  inputBaseAmount: string): string | null {

  const { account, chainId } = useActiveWeb3React()
  const baseToken = useBaseToken(contractAddress)
  const inputBaseAmountBI = tryParseAmount(inputBaseAmount, baseToken?.decimals)
  const { payToken, payAmount, receiveAmount } = useExpected(contractAddress, currentAction, inputBaseAmountBI)

  const poolBaseBalance = useBaseBalance(contractAddress)
  const poolQuoteBalance = useQuoteBalance(contractAddress)
  const poolBalance = currentAction === ActionType.Buy ? poolBaseBalance : poolQuoteBalance

  const balance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)
  const balanceBI = tryParseToBigNumber(balance?.raw.toString())

  if (!account) {
    return CONNECT_WALLET
  }

  if (chainId !== ChainId.RINKEBY && chainId !== ChainId.MAINNET) {
    return 'Wrong network'
  }

  if (!isValidNumber(inputBaseAmount) || parseEther(inputBaseAmount).lte(0)) {
    return 'Enter a number'
  }

  if (!payAmount || !receiveAmount || !poolBalance || !balanceBI) {
    return 'Loading...'
  }

  if (payAmount.gt(balanceBI)) {
    return 'Insufficient balance'
  }

  if (receiveAmount.gt(poolBalance)) {
    return 'Insufficient balance'
  }

  return null
}
