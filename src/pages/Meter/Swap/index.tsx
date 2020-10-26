import React, { useCallback, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import InputPanel from './InputPanel'
import { ActionType } from './constants'
import { useGetCharges } from '../contracts/useChargeFactory'
import { useCharge } from '../contracts/useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'

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

  return (
    <>
      <Pairs pairs={pairs} currentIndex={currentPairIndex} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <InputPanel action={currentAction} />
      <Info action={currentAction} contractAddress={contractAddress} />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
