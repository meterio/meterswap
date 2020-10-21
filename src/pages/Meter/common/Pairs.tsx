import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from '../../../state/application/hooks'
import { ReactComponent as DropDown } from '../../../assets/images/dropdown.svg'
import { ApplicationModal } from '../../../state/application/actions'

const Panel = styled.div`
  position: relative;
`

const Input = styled.div`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 10px;
  padding: 0.75rem 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ theme }) => theme.text1};
    stroke-width: 1.5px;
  }
`

const Items = styled.div`
  z-index: 100;
  background: ${({ theme }) => theme.bg1};
  width: 100%;
  position: absolute;
  top: 100%;
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

export default function() {
  const [currentPair, setCurrentPair] = useState('DAI-USDT')
  const pairs = ['ETH-USDT', 'UNI-USDT', 'DODO-USDT', 'COMP-USDT']

  const isOpen = useModalOpen(ApplicationModal.PAIRS)

  const onClickItem = (i: string) => {
    setCurrentPair(i)
    toggle()
  }

  const toggle = useToggleModal(ApplicationModal.PAIRS)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, isOpen ? toggle : undefined)

  return (
    <Panel ref={node as any}>
      <Input onClick={toggle}>
        <div>{currentPair}</div>
        <StyledDropDown selected={isOpen} />
      </Input>
      {isOpen && (
        <Items>
          {
            pairs.map(i => {
              return <Item key={i} onClick={() => onClickItem(i)}>{i}</Item>
            })
          }
        </Items>
      )}
    </Panel>
  )
}
