import React from 'react'
import styled from 'styled-components'
import { ActionType } from './constants'
import {
  useBaseBalance,
  useBaseToken,
  useMyBaseCapitalBalance,
  useMyQuoteCapitalBalance,
  useQuoteBalance,
  useQuoteToken
} from '../contracts/useChargePair'
import { formatUnits } from 'ethers/lib/utils'
import { TextWrapper } from '../../../theme'
import { Token } from '@uniswap/sdk'
import { displaySymbol, formatBigNumber } from '../common/utils'
import { useEstimateTokenAmount } from '../common/hooks/usePool'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 10px;
`

const Section = styled.div`
  flex: 1;
  text-align: center;
`

const Row = styled(TextWrapper)<{ active: Boolean }>`
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
`

export default function({ contractAddress, currentToken }: { contractAddress: string, currentToken: Token }) {
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const baseBalance = useBaseBalance(contractAddress)
  const quoteBalance = useQuoteBalance(contractAddress)
  const myBaseCapitalBalance = useMyBaseCapitalBalance(contractAddress)
  const myQuoteCapitalBalance = useMyQuoteCapitalBalance(contractAddress)
  const { base, quote } = useEstimateTokenAmount(contractAddress, myBaseCapitalBalance, myQuoteCapitalBalance)

  if (!baseToken || !quoteToken) {
    return null
  }

  const isBase = currentToken.symbol === baseToken.symbol

  return (
    <>
      <Panel>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>My Liquidity</TextWrapper>
          <Row fontSize={16} color={'text1'} active={isBase}>
            {displaySymbol(baseToken)}: {base ? formatBigNumber(base, baseToken.decimals) : '-'}
          </Row>
          <Row fontSize={16} color={'text1'} active={!isBase}>
            {displaySymbol(quoteToken)}: {quote ? formatBigNumber(quote, quoteToken.decimals) : '-'}
          </Row>
        </Section>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>Pool Size</TextWrapper>
          <Row fontSize={16} color={'text1'} active={isBase}>
            {displaySymbol(baseToken)}: {baseBalance ? formatBigNumber(baseBalance, baseToken.decimals) : '-'}
          </Row>
          <Row fontSize={16} color={'text1'} active={!isBase}>
            {displaySymbol(quoteToken)}: {quoteBalance ? formatBigNumber(quoteBalance, quoteToken.decimals) : '-'}
          </Row>
        </Section>
      </Panel>
    </>
  )
}
