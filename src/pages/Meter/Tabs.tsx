import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useHistory } from 'react-router-dom'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
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

export default function({ currentTab }: { currentTab: string }) {
  const { t } = useTranslation()
  const history = useHistory()
  return (
    <Tabs>
      <Tab isActive={currentTab === 'swap'} onClick={() => history.push('/meter/swap')}>
        {t('swap')}
      </Tab>
      <Tab isActive={currentTab === 'pool'} onClick={() => history.push('/meter/pool')}>
        {t('pool')}
      </Tab>
    </Tabs>
  )
}
