import React from 'react'
import styled from 'styled-components'
import { ActionType } from './constants'

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
  flex: 1;
  text-align: center;
`

const Title = styled.div`
  font-size: 0.9rem;
`

const Value = styled.div`
  font-size: 1rem;
`

const Key = styled.span`
  opacity: 0.6;
`

export default function({ action, contractAddress, amount }: { action: ActionType, contractAddress: string | undefined, amount: string }) {
  if (!contractAddress) {
    return null
  }

  return (
    <>
      <Panel>
        <Section>
          <Title>My Pool</Title>
          <Value>0.0000 DODO</Value>
          <div>
            <Key>Staked</Key> 0.0000
          </div>
          <div>
            <Key>Staked DLP</Key> 0.0000
          </div>
        </Section>
        <Section>
          <Title>Proportion</Title>
          <Value>0.00%</Value>
          <div>
            <Key>Now</Key> 0.00%
          </div>
          <div>
            <Key>Add</Key> +0.00%
          </div>
        </Section>
      </Panel>
      <SizePanel>
        <div>Pool Size(USDT): 0</div>
        <div>Pool Size(DAI): 0</div>
      </SizePanel>
    </>
  )
}
