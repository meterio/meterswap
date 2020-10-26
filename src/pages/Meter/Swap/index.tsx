import React, { useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import InputPanel from './InputPanel'
import { ActionType } from './constants'
import { useCharge, useChargeFactory } from '../contracts/useContract'
import { useSingleCallResult } from '../../../state/multicall/hooks'
import { useGetCharges } from '../contracts/useChargeFactory'

export default function Swap() {
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  const pairs = useGetCharges()
  console.log(useGetCharges)

  // const pair =
  // console.log(pair)
  // const chargeContract = useCharge(pair)
  // const result = useSingleCallResult(chargeContract, 'getOraclePrice')
  // console.log(result)

  return (
    <>
      <Pairs pairs={pairs} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <InputPanel action={currentAction} />
      <Info action={currentAction} />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
