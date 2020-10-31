import React, { useCallback, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import { useGetCharges } from '../contracts/useChargeFactory'
import { useCharge } from '../contracts/useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'
import { useBaseToken } from '../contracts/useChargePair'
import CurrencyInputPanel from '../common/CurrencyInputPanel'

export default function Swap() {
  const pairs = useGetCharges()

  // pair
  const [currentPairIndex, setcurrentPairIndex] = useState(0)
  const contractAddress = pairs ? pairs[currentPairIndex] : undefined

  const onClickPair = useCallback((index: number) => {
    setcurrentPairIndex(index)
  }, [setcurrentPairIndex])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)

  return (
    <>
      <Pairs pairs={pairs} currentIndex={currentPairIndex} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel amount={amount} setAmount={i => setAmount(i)} token={baseToken} />
      <Info action={currentAction} contractAddress={contractAddress} amount={amount} />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
