import React from 'react'
import styled from 'styled-components'
import { ActionType } from './constants'
import { useBaseBalance, useBaseToken, useMyBaseCapitalBalance, useMyQuoteCapitalBalance, useQuoteBalance, useQuoteToken } from '../contracts/useChargePair'
import { formatUnits } from 'ethers/lib/utils'
import { TextWrapper } from '../../../theme'
import { Token } from '@uniswap/sdk'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SizePanel = styled(Panel)`
  flex-direction: column !important;
`
const SizeRow = styled.div`
  flex-grow: 1;
`

const Section = styled.div`
  flex: 1;
  text-align: center;
`


export default function({ contractAddress, currentToken }: { contractAddress: string, currentToken: Token }) {
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const baseBalance = useBaseBalance(contractAddress)
  const quoteBalance = useQuoteBalance(contractAddress)

  const myBaseCapitalBalance = useMyBaseCapitalBalance(contractAddress)
  const myQuoteCapitalBalance = useMyQuoteCapitalBalance(contractAddress)

  if (!baseToken || !quoteToken) {
    return null
  }

  const isBase = currentToken.symbol === baseToken.symbol

  const myPoolAmount = isBase ?
    (myBaseCapitalBalance && formatUnits(myBaseCapitalBalance, currentToken.decimals))
    :
    (myQuoteCapitalBalance && formatUnits(myQuoteCapitalBalance, currentToken.decimals))

  return (
    <>
      <Panel>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>My Pool</TextWrapper>
          <TextWrapper fontSize={16} color={'text1'}>{myPoolAmount ?? '-'} {currentToken.symbol}</TextWrapper>
        </Section>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>Proportion</TextWrapper>
          <TextWrapper fontSize={16} color={'text1'}>-</TextWrapper>
        </Section>
      </Panel>
      <SizePanel>
        <SizeRow>Pool Size({baseToken.symbol}): {baseBalance ? formatUnits(baseBalance, baseToken.decimals) : '-'}</SizeRow>
        <SizeRow>Pool Size({quoteToken.symbol}): {quoteBalance ? formatUnits(quoteBalance, quoteToken.decimals) : '-'}</SizeRow>
      </SizePanel>
    </>
  )
}
