import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import AppBody from '../AppBody'
import Tabs from './Tabs'
import Swap from './Swap'
import Pool from './Pool'

export default function() {
  const match = useRouteMatch()
  console.log('useRouteMatch match.path:', match.path)
  const currentTab = match.path.slice(1) === 'swap' ? 'swap' : 'pool'

  return (
    <AppBody>
      <Tabs currentTab={currentTab} />
      {
        {
          'swap': <Swap />,
          'pool': <Pool />,
        }[currentTab]
      }
    </AppBody>
  )
}
