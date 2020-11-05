import React, { useEffect, useState } from 'react'
import Pairs from '../common/components/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import CurrencyInputPanel from '../common/components/CurrencyInputPanel'
import {
  useBaseToken,
  useMyBaseCapitalBalance,
  useMyQuoteCapitalBalance,
  useQuoteToken
} from '../contracts/useChargePair'
import { Token } from '@uniswap/sdk'
import useInputError from '../common/hooks/useInputError'
import { CONNECT_WALLET } from '../common/strings'
import usePairs from '../common/hooks/usePairs'
import useSubmitPool from '../common/hooks/useSubmitPool'
import { useActiveWeb3React } from '../../../hooks'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { BigNumber } from 'ethers'
import { tryParseAmount } from '../common/utils'

export default function Pool() {
  const { pairs, selectedPair, onSelectPair } = usePairs()
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Deposit)

  // input panel
  const [amount, setAmount] = useState('')
  const [currentToken, setCurrentToken] = useState<Token | null>(null)
  useEffect(() => {
    setCurrentToken(baseToken)
  }, [baseToken])

  const isBase = currentToken?.symbol === baseToken?.symbol

  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currentToken ?? undefined)
  const myBaseCapitalBalance = useMyBaseCapitalBalance(selectedPair)
  const myQuoteCapitalBalance = useMyQuoteCapitalBalance(selectedPair)
  const limitBalance = currentAction === ActionType.Deposit ?
    (balance ? BigNumber.from(balance.raw.toString()) : null)
    :
    (isBase ? myBaseCapitalBalance : myQuoteCapitalBalance)
  const inputError = useInputError(currentToken, limitBalance, amount, tryParseAmount(amount, currentToken))

  // submit
  const submit = useSubmitPool(currentAction, amount, currentToken, inputError === CONNECT_WALLET)

  if (!selectedPair) {
    return null
  }

  return (
    <>
      <Pairs pairs={pairs} selectedPair={selectedPair} onClick={onSelectPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel
        amount={amount}
        setAmount={setAmount}
        token={currentToken}
        setToken={setCurrentToken}
        tokens={baseToken && quoteToken ? [baseToken, quoteToken] : []}
      />
      {selectedPair && currentToken && <Info contractAddress={selectedPair} currentToken={currentToken} />}
      <ButtonPrimary disabled={inputError !== null && inputError !== CONNECT_WALLET} onClick={submit}>
        {inputError ?? 'Submit'}
      </ButtonPrimary>
    </>
  )
}
