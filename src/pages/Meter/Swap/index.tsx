import React, { useState } from 'react'
import Pairs from '../common/components/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import { useBaseToken } from '../contracts/useChargePair'
import CurrencyInputPanel from '../common/components/CurrencyInputPanel'
import { BigNumber } from 'ethers'
import { isValidNumber, tryParseAmount } from '../common/utils'
import { CONNECT_WALLET } from '../common/strings'
import usePairs from '../common/hooks/usePairs'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import useSubmitSwap from '../common/hooks/useSubmitSwap'
import { useInputError } from '../common/hooks/useSwap'

export default function Swap() {
  // pair
  const { pairs, selectedPair, onSelectPair } = usePairs()
  console.log(pairs)

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(selectedPair)
  const inputError = useInputError(selectedPair, currentAction, amount)

  // submit
  const submit = useSubmitSwap(currentAction, amount, inputError === CONNECT_WALLET)

  if (!selectedPair) {
    return null
  }

  return (
    <>
      <Pairs pairs={pairs} selectedPair={selectedPair} onClick={onSelectPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel showBalance={false} amount={amount} setAmount={i => setAmount(i)} token={baseToken} />
      {(isValidNumber(amount) && parseFloat(amount) > 0) ?
        <Info action={currentAction} contractAddress={selectedPair} amount={amount} /> : null}
      <ButtonPrimary disabled={inputError !== null && inputError !== CONNECT_WALLET} onClick={submit}>
        {inputError ?? 'Submit'}
      </ButtonPrimary>
    </>
  )
}
