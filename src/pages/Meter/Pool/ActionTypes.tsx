import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

interface TabProps {
  isActive: boolean
}

const Tab = styled.div<TabProps>`
  display: flex;
  flex-flow: row nowrap;
  width: 45%;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ isActive, theme }) => isActive && theme.primary1};
  color: ${({ isActive, theme }) => (isActive ? theme.white : theme.text1)};

  :hover,
  :focus {
    //color: ${({ theme }) => darken(0.1, theme.text1)};
   }
`

export default function({ currentTab, onTabChanged }: { currentTab: string, onTabChanged: (tab: 'deposit' | 'withdraw') => void }) {
  return (
    <Tabs>
      <Tab id={`swap-nav-link`} isActive={currentTab === 'deposit'} onClick={() => onTabChanged('deposit')}>
        Deposit
      </Tab>
      <Tab id={`pool-nav-link`} isActive={currentTab === 'withdraw'} onClick={() => onTabChanged('withdraw')}>
        Withdraw
      </Tab>
    </Tabs>
  )
}
