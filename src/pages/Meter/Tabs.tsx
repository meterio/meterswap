import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

interface TabProps {
  isActive: boolean
}

const Tab = styled.div<TabProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ isActive, theme }) => isActive ? theme.text1 : theme.text3};
  font-size: 20px;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export default function({ currentTab, onTabChanged }: { currentTab: string, onTabChanged: (tab: string) => void }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }}>
      <Tab id={`swap-nav-link`} isActive={currentTab === 'swap'} onClick={() => onTabChanged('swap')}>
        {t('swap')}
      </Tab>
      <Tab id={`pool-nav-link`} isActive={currentTab === 'pool'} onClick={() => onTabChanged('pool')}>
        {t('pool')}
      </Tab>
    </Tabs>
  )
}
