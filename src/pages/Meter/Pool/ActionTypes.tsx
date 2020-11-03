import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { ActionType } from './constants'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 10px;
`

interface TabProps {
  isActive: boolean
}

const Tab = styled.div<TabProps>`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ isActive, theme }) => isActive && theme.primary1};
  color: ${({ isActive, theme }) => (isActive ? theme.white : theme.text1)};
`

const LeftTab = styled(Tab)`
  border-radius: 10px 0 0 10px;
`
const RightTab = styled(Tab)`
  border-radius: 0 10px 10px 0;
`

export default function({ currentTab, onTabChanged }: { currentTab: string, onTabChanged: (tab: ActionType) => void }) {
  return (
    <Tabs>
      <LeftTab isActive={currentTab === ActionType.Deposit} onClick={() => onTabChanged(ActionType.Deposit)}>
        Deposit
      </LeftTab>
      <RightTab isActive={currentTab === ActionType.Withdraw} onClick={() => onTabChanged(ActionType.Withdraw)}>
        Withdraw
      </RightTab>
    </Tabs>
  )
}
