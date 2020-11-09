import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import AppBody from '../AppBody'
import Tabs from './Tabs'
import Swap from './Swap'
import Pool from './Pool'

export default function() {
  const match = useRouteMatch<{ tab: string }>()
  console.log('useRouteMatch match', match)
  const currentTab: string = match.params['tab'] ?? 'swap'

  return (
    <AppBody>
      <Tabs currentTab={currentTab} />
      {
        currentTab === 'swap' && <Swap />
      }
      {
        currentTab === 'pool' && <Pool />
      }
    </AppBody>
  )
}
