import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 10px;
`

const SizePanel = styled(Panel)`
  flex-direction: column !important;
`

const Section = styled.div`
  text-align: center;
`

export default function() {
  return (
    <>
      <Panel>
        <Section>
          <div>My Pool</div>
          <div>0.0000 DODO</div>
          <div>Staked 0.0000</div>
          <div>Staked DLP 0.0000</div>
        </Section>
        <Section>
          <div>Proportion</div>
          <div>0.00%</div>
          <div>Now 0.00%</div>
          <div>Add +0.00%</div>
        </Section>
      </Panel>
      <SizePanel>
        <div>Pool Size(USDT): 0</div>
        <div>Pool Size(DAI): 0</div>
      </SizePanel>
    </>
  )
}
