import { ChainId, TokenAmount } from 'meterswap-sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import Logo from '../../assets/images/Voltswap_Logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregateUniBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'

import usePrevious from '../../hooks/usePrevious'

const FooterFrame = styled.div`
  display: inline-flex;
  
  align-items: center;
  justify-content: center;
  align-items: center;

  position: fixed;
  width: 100%;
  left: 0px;
  bottom:0px;
 
  border-top: 3px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
 
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: fixed;
  `};
 
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  display: none;
`}
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
 
 
  margin: 0 12px;
  font-weight: 500;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  
  }

  :hover{
    color: ${({ theme }) => darken(0.1, theme.text1)};
   
    text-decoration:none;
  },
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`


export default function Footer() {
 

  return (
    <FooterFrame>
        <StyledNavLink id={`stake-nav-link`}  to={'/swap'}>
            Home
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`}  to={'/swap'}>
            Info
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`}  to={'/swap'}>
            About
          </StyledNavLink>
    </FooterFrame>
  )
}
