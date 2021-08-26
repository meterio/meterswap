import React from 'react'
import { AutoColumn } from '../../components/Column'
import { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import {  useLazyQuery } from '@apollo/client'
import { GET_GEYSERS } from '../../queries/geyser'

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


const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()

  const [getGeysers, { loading: geyserLoading, data: geyserData }] = useLazyQuery(GET_GEYSERS, {
    pollInterval: POLL_INTERVAL
  })

 

  const [geysers, setGeysers] = useState<Geyser[]>([])

  useEffect(() => {
    
    getGeysers()
  }, [])

  useEffect(() => {
   
    if (geyserData && geyserData.geysers) {
      const currentGeysers = [...geyserData.geysers].map((geyser) => ({ ...geyser, status: geyser.powerSwitch.status })) as Geyser[]
      
      setGeysers(currentGeysers)
    }

    },[geyserData])


  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `


  const stakingRewardsExist = true

  
  const poolData = [
    {
        "id": "0xa7fff5af87d781be595353057721c679ebb7f0f5",
        "lastUpdate": "1629420833",
        "powerSwitch": {
            "id": "0x820545769c375eb060e1b0837810baa7aee7a2e9",
            "status": "Online"
        },
        "rewardSchedules": [
            {
                "duration": "2592000",
                "id": "0xa7fff5af87d781be595353057721c679ebb7f0f5-1",
                "rewardAmount": "1000000000000000",
                "start": "1629252369"
            }
        ],
        "rewardToken": "0xbb8cf46dbc7b195c64147e6392a6a6588effc5aa",
        "scalingCeiling": "100",
        "scalingFloor": "33",
        "scalingTime": "2592000",
        "stakingToken": "0xa150efad5e942e1dfaeb6bd872ea59d992843b91",
        "totalStake": "2507250000000000000",
        "totalStakeUnits": "337604623290000000000000",
        "unlockedReward": "64993827160494"
    }
]

  
  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Meter liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive MTRG, the Meter protocol governance token.
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://meter.io"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about METER</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />
        </DataRow>

        <PoolSection>
          {geysers?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            geysers?.map(geyserInfo => {
              // need to sort by added liquidity here
              return <PoolCard geyserInfo={geyserInfo} key={geyserInfo.id} />
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
