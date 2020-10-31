import { Currency } from '@uniswap/sdk'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { RowBetween } from '../../../components/Row'
import { TextWrapper, TYPE } from '../../../theme'
import { Input as NumericalInput } from '../../../components/NumericalInput'
import { ReactComponent as DropDown } from '../../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../../hooks'

const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
`

const CurrencySelect = styled.button`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  border-radius: 12px;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const StyledDropDown = styled(DropDown)`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.text1};
    stroke-width: 1.5px;
  }
`

const InputPanel = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const StyledTokenName = styled.span`
  margin: 0 0.25rem 0 0.25rem;
  font-size: 1rem;
`


interface CurrencyInputPanelProps {
  amount: string
  setAmount: (value: string) => void
  setCurrency?: (value: Currency) => void
  currency: Currency | null
  currencies?: Currency[]
}

export default function CurrencyInputPanel({
                                             amount,
                                             setAmount,
                                             currency,
                                             setCurrency,
                                             currencies
                                           }: CurrencyInputPanelProps) {

  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const onClickCurrency = useCallback((token: Currency) => {
    if (setCurrency) {
      setCurrency(token)
    }
    setModalOpen(false)
  }, [setModalOpen])

  const onMax = () => {

  }

  return (
    <InputPanel>
      <Container>
        <LabelRow>
          <RowBetween>
            <TextWrapper color={'text2'} fontWeight={500} fontSize={14}>
            </TextWrapper>
            {account && (
              <TextWrapper onClick={onMax} color={'text2'} fontWeight={500} fontSize={14} style={{ display: 'inline', cursor: 'pointer' }}>
                {selectedCurrencyBalance ? 'Balance: ' + selectedCurrencyBalance?.toSignificant(6) : ' -'}
              </TextWrapper>
            )}
          </RowBetween>
        </LabelRow>
        <InputRow>
          <NumericalInput
            value={amount}
            onUserInput={setAmount}
          />
          <CurrencySelect
            onClick={() => {
              setModalOpen(!modalOpen)
            }}
          >
            {
              currency ?
                <>
                  <StyledTokenName className="token-symbol-container">
                    {currency.symbol}
                  </StyledTokenName>
                  {currencies && <StyledDropDown />}
                </>
                : null
            }
          </CurrencySelect>
        </InputRow>
      </Container>
      {modalOpen && (
        <Items>
          {
            currencies && currencies.map(i => (
              <Item onClick={() => onClickCurrency(i)} key={i.symbol}>{i.symbol}</Item>
            ))
          }
        </Items>
      )}
    </InputPanel>
  )
}


const Items = styled.div`
  z-index: 100;
  background: ${({ theme }) => theme.bg1};
  width: 100px;
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px,
              rgba(0, 0, 0, 0.04) 0px 4px 8px,
              rgba(0, 0, 0, 0.04) 0px 16px 24px,
              rgba(0, 0, 0, 0.01) 0px 24px 32px;
`

const Item = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;

  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.05, theme.bg1)};
  }
`
