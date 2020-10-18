import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
`

export default function() {
  const { t } = useTranslation()
  return (
    <Panel>
      <div>
        1 DAI = 1.001 USDT
      </div>
      <div>
        Price Impact: 0.00%
      </div>
    </Panel>
  )
}
