import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { DAI } from '../../../constants'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { ActionType } from './constants'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'

const Panel = styled.div`
  margin-bottom: 1rem;
`

export default function({ action, amount, setAmount, contractAddress }: { action: ActionType, contractAddress: string | undefined, amount: string, setAmount: (value: string) => void }) {
  if (!contractAddress) {
    return null
  }

  const baseToken = useBaseToken(contractAddress)

  return (
    <Panel>
      <CurrencyInputPanel
        value={amount}
        onUserInput={(i) => setAmount(i)}
        showMaxButton={false}
        currency={baseToken}
        label={''}
        disableCurrencySelect={true}
        id="swap-input"
      />
    </Panel>
  )
}
