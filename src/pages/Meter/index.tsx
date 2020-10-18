import React, { useState } from 'react'
import AppBody from '../AppBody'
import Tabs from './Tabs'
import Dropdown from './Dropdown'

export default function Swap() {
  const [currentTab, setCurrentTab] = useState('swap')

  return (
    <>
      <AppBody>
        <Tabs currentTab={currentTab} onTabChanged={(tab) => setCurrentTab(tab)} />
        <div className="relative">
          <Dropdown />
        </div>
      </AppBody>
    </>
  )
}
