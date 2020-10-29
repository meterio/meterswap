import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { useGetCharges } from '../contracts/useChargeFactory'
import { ActionType } from './constants'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import { Currency } from '@uniswap/sdk'

export default function Swap() {
  const pairs = useGetCharges()

  // pair
  const [currentPairIndex, setcurrentPairIndex] = useState(0)
  const contractAddress = pairs ? pairs[currentPairIndex] : undefined

  const onClickPair = useCallback((index: number) => {
    setcurrentPairIndex(index)
  }, [setcurrentPairIndex])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Deposit)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const [currency, setCurrency] = useState<Currency | null>(null)
  useEffect(() => {
    if (currency === null && baseToken !== null) {
      setCurrency(baseToken)
    }
  }, [baseToken])

  return (
    <>
      <Pairs pairs={pairs} currentIndex={currentPairIndex} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel
        amount={amount}
        setAmount={setAmount}
        currency={currency}
        setCurrency={setCurrency}
        currency2={quoteToken}
      />

      <Info action={currentAction} contractAddress={contractAddress} amount={amount} />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
