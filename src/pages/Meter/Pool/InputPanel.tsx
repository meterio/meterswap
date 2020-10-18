import { useTranslation } from 'react-i18next'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { DAI } from '../../../constants'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'

const Panel = styled.div`
  margin-bottom: 1rem;
`

export default function() {
  const [typedValue, setTypedValue] = useState('')

  const onUserInput = useCallback((typedValue: string) => {
  }, [])

  const handleMax = useCallback(() => {
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
        customBalanceText={'Available DAI: '}
        id="swap-input"
      />
    </Panel>
  )
}
