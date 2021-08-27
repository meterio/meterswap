import React, {useEffect, useState} from 'react'

import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { TYPE, StyledInternalLink,ExternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ETHER, JSBI, TokenAmount,Fraction  } from 'meterswap-sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
import {getTokenPriceUSD} from './getTokenUSDPrice'
import {getCurrentPrice} from './price';
import BigNumber from 'bignumber.js';
import { darken } from 'polished';
import {useToken} from '../../hooks/Tokens';
import {getTokenSymbol} from './tokenSymbol';

const MS_PER_SEC = 1000
// polling interval for querying subgraph
const POLL_INTERVAL = 30 * MS_PER_SEC
enum GeyserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  SHUTDOWN = 'Shutdown',
}

type RewardSchedule = {
  id: string
  duration: string
  start: string
  rewardAmount: string
}

type Geyser = {
  id: string
  rewardToken: string
  stakingToken: string
  totalStake: string
  totalStakeUnits: string
  status: GeyserStatus
  scalingFloor: string
  scalingCeiling: string
  scalingTime: string
  unlockedReward: string
  rewardSchedules: RewardSchedule[]
  lastUpdate: string
}

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `};
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`
const activeClassName = 'ACTIVE'

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  position:absolute;
  right:8px;
  
  padding: 10px;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

const nowInSeconds = () => Math.round(Date.now() / 1000)

const getGeyserDuration = (geyser: Geyser) => {
  const now = nowInSeconds()
  const { rewardSchedules } = geyser
  const schedulesEndTime = rewardSchedules.map(
    (schedule) => parseInt(schedule.start, 10) + parseInt(schedule.duration, 10),
  )
  return Math.max(...schedulesEndTime.map((endTime) => endTime - now), 0)
}






export default function PoolCard({geyserInfo }: {geyserInfo:Geyser}) {



  
  
  //console.log(geyserInfo)

  const [token0Price, setToken0Price] = useState(1)
  const [token1Price, setToken1Price] = useState(1)
  const [token0Symbol, setToken0symbol] = useState("")
  const [token1Symbol, setToken1symbol] = useState("")
  let duration_sec = 86400

  let duration_left = getGeyserDuration(geyserInfo) / duration_sec
  
 
 
  

  let totalDeposited = new BigNumber(geyserInfo.totalStake)
  let _totalDeposited = totalDeposited.dividedBy(1e18)
 


  useEffect(()=>{

    getTokenSymbol(geyserInfo.stakingToken).then((symbol:string)=>{
     
      getCurrentPrice(symbol).then((price:number) => {
        setToken0symbol(symbol)
        setToken0Price(price)
      }).catch((error:any)=>{
        setToken0Price(0)
      })
  
    })

    getTokenSymbol(geyserInfo.rewardToken).then((symbol:string)=>{
     
      setToken1symbol(symbol)
      getCurrentPrice(symbol).then((price:number) => {
      
        setToken1Price(price)
      }).catch((error:any)=>{
        setToken1Price(0)
      })
  
    })


  },[token0Symbol, token1Symbol,token0Price, token1Price])




  
  //console.log(apy.toSignificant(4, { groupSeparator: ',' }))



  
    
  

  return (
    <Wrapper showBackground={true} bgColor={'#2172E5'}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        {/* <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} /> */}
        <TYPE.white fontWeight={400} fontSize={24} style={{ marginLeft: '8px', width:"200px" }}>
          {token0Symbol}-{token1Symbol}
        </TYPE.white>

        <StyledExternalLink href={`http://voltswapfarm.surge.sh`} >
          <ButtonPrimary padding="8px" borderRadius="8px">
             Detail <span style={{ fontSize: '11px' }}>↗</span>
          </ButtonPrimary>
        </StyledExternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> Total deposited</TYPE.white>
          <TYPE.white>
           {  Number(_totalDeposited.multipliedBy((token0Price + token1Price) / 2)).toFixed(2).toString()} USD
          </TYPE.white>
        </RowBetween>
        
        <RowBetween>
          <TYPE.white>Ends In</TYPE.white>
          <TYPE.white>
            {duration_left.toFixed(2)} Days
          </TYPE.white>
        </RowBetween>
        
        <RowBetween>
          <TYPE.white> Earn up to (yearly) </TYPE.white>
          <TYPE.white>98 %</TYPE.white>
        </RowBetween>
      </StatContainer>
      

      {/* {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>Your rate</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7}`)
                ?.toSignificant(4, { groupSeparator: ',' })} MTRG / week`}
            </TYPE.black>
          </BottomSection>
        </>
      )} */}
    </Wrapper>
  )
}
