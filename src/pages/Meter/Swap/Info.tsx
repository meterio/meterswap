import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { SectionBreak } from '../../../components/swap/styleds'
import { ActionType } from './constants'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PriceRow = styled(Row)`
  font-size: 1.4rem;
  margin: 1rem 0;
`

const Break = styled(SectionBreak)`
  margin-bottom: 1rem;
`

export default function({ action }: { action: ActionType }) {
  const { t } = useTranslation()
  return (
    <Panel>
      <Row>
        <div>1 DAI = 1.001 USDT</div>
        <div>Price Impact: 0.00%</div>
      </Row>
      <PriceRow>
        <div>Expected {action === ActionType.Buy ? 'Pay' : 'Receive'}:</div>
        <div>0 USDT</div>
      </PriceRow>
      <Break />
      <Row>
        <div>Slippage Tolerance:</div>
        <div>0.50%</div>
      </Row>
      <Row>
        <div>Max {action === ActionType.Buy ? 'Pay' : 'Receive'}:</div>
        <div>0.35 USDT</div>
      </Row>
      <Row>
        <div>Liquidity Provider Fee (0.00%):</div>
        <div>0.0000 {action === ActionType.Buy ? 'DAI' : 'USDT'}</div>
      </Row>
      <Row>
        <div>Maintainer Fee (0.00%):</div>
        <div>0.0000 {action === ActionType.Buy ? 'DAI' : 'USDT'}</div>
      </Row>
    </Panel>
  )
}
