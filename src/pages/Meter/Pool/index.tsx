import React, { useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import InputPanel from './InputPanel'

export default function Swap() {
  const [currentAction, setCurrentAction] = useState<'deposit' | 'withdraw'>('deposit')

  return (
    <>
      <Pairs />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <InputPanel />
      <Info />
      <ButtonPrimary>Submit</ButtonPrimary>
    </>
  )
}
