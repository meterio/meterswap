import React, { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from '../../../../state/application/hooks'
import { ReactComponent as DropDown } from '../../../../assets/images/dropdown.svg'
import { ApplicationModal } from '../../../../state/application/actions'
import { ChargesInfo } from '../constants'
import { useCharge } from '../../contracts/useContract'
import { useOnceCallResult } from '../../../../state/multicall/hooks'

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

export default function({ pairs, selectedPair, onClick }: { pairs: string[], selectedPair: string, onClick: (index: number) => void }) {
  const titles = pairs.map(i => `${ChargesInfo[i]?.base}-${ChargesInfo[i]?.quote}`)
  const index = pairs.indexOf(selectedPair)

  const isOpen = useModalOpen(ApplicationModal.PAIRS)
  const toggle = useToggleModal(ApplicationModal.PAIRS)
  const node = useRef<HTMLDivElement>()

  useOnClickOutside(node, isOpen ? toggle : undefined)

  const onClickItem = (i: number) => {
    toggle()
    onClick(i)
  }

  if (index < 0) {
    return null
  }

  return (
    <Panel ref={node as any}>
      <Input onClick={toggle}>
        <div>{titles[index]}</div>
        <StyledDropDown selected={isOpen} />
      </Input>
      {isOpen && (
        <Items>
          {
            titles.map((i, index) => {
              return <Item key={i} onClick={() => onClickItem(index)}>{i}</Item>
            })
          }
        </Items>
      )}
    </Panel>
  )
}
