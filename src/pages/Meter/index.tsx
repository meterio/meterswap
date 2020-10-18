import React, { useState } from 'react'
import AppBody from '../AppBody'
import Tabs from './Tabs'
import Swap from './Swap'
import Pool from './Pool'

export default function() {
  const [currentTab, setCurrentTab] = useState<'swap' | 'pool'>('swap')

  return (
    <AppBody>
      <Tabs currentTab={currentTab} onTabChanged={(tab) => setCurrentTab(tab)} />
      {
        {
          'swap': <Swap />,
          'pool': <Pool />
        }[currentTab]
      }
    </AppBody>
  )
}
