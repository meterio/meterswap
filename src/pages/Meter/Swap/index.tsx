import React, { useState } from 'react'
import Pairs from '../Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import InputPanel from './InputPanel'
import { ActionType } from './constants'

export default function Swap() {
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  return (
    <>
      <Pairs />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <InputPanel action={currentAction} />
      <Info action={currentAction} />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
