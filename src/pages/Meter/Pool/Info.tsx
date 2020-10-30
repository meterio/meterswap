import React from 'react'
import styled from 'styled-components'
import { ActionType } from './constants'
import { useBaseBalance, useBaseToken, useMyBaseCapitalBalance, useQuoteBalance, useQuoteToken } from '../contracts/useChargePair'
import { formatUnits } from 'ethers/lib/utils'
import { TextWrapper } from '../../../theme'

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
  width: 80%;
`

const Section = styled.div`
  flex: 1;
  text-align: center;
`


export default function({ action, contractAddress, amount }: { action: ActionType, contractAddress: string | undefined, amount: string }) {
  if (!contractAddress) {
    return null
  }

  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const baseBalance = useBaseBalance(contractAddress)
  const quoteBalance = useQuoteBalance(contractAddress)

  const myBaseCapitalBalance = useMyBaseCapitalBalance(contractAddress)

  return (
    <>
      <Panel>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>My Pool</TextWrapper>
          <TextWrapper fontSize={16} color={'text2'}>{(myBaseCapitalBalance && baseToken) ? formatUnits(myBaseCapitalBalance, baseToken.decimals) : '-'} {baseToken?.symbol}</TextWrapper>
          <Row>
            <TextWrapper color={'text2'} opacity={0.6}>Pool Asset: </TextWrapper>
            <div>{(myBaseCapitalBalance && baseToken) ? formatUnits(myBaseCapitalBalance, baseToken.decimals) : '-'} {baseToken?.symbol}</div>
          </Row>
        </Section>
        <Section>
          <TextWrapper fontSize={14} color={'text2'}>Proportion</TextWrapper>
          <TextWrapper fontSize={16} color={'text2'}>0.00%</TextWrapper>
          <Row>
            <TextWrapper color={'text2'} opacity={0.6}>Now</TextWrapper>
            <div>+0.00%</div>
          </Row>
        </Section>
      </Panel>
      <SizePanel>
        <SizeRow>Pool Size({baseToken?.symbol}): {(baseBalance && baseToken) ? formatUnits(baseBalance, baseToken.decimals) : '-'}</SizeRow>
        <SizeRow>Pool Size({quoteToken?.symbol}): {(quoteBalance && quoteToken) ? formatUnits(quoteBalance, quoteToken.decimals) : '-'}</SizeRow>
      </SizePanel>
    </>
  )
}
