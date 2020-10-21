import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { DAI } from '../../../constants'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import { ActionType } from './constants'

const Panel = styled.div`
  margin-bottom: 1rem;
`

export default function({ action }: { action: ActionType }) {
  const [typedValue, setTypedValue] = useState('')

  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const handleMax = useCallback(() => {
    setTypedValue('0')
  }, [onUserInput])

  return (
    <Panel>
      <CurrencyInputPanel
        value={typedValue}
        onUserInput={onUserInput}
        onMax={handleMax}
        showMaxButton={true}
        currency={DAI}
        label={''}
        disableCurrencySelect={true}
        customBalanceText={`Available ${action === ActionType.Buy ? 'USDT' : 'DAI'}: `}
        id="swap-input"
      />
    </Panel>
  )
}
