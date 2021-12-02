import React from 'react';

import { AutoColumn } from '../../components/Column';

import { createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks';
import { TYPE, ExternalLink } from '../../theme';
import PoolCard from '../../components/earn/PoolCard';
import { RowBetween } from '../../components/Row';
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled';
import { Countdown } from './Countdown';
import Loader from '../../components/Loader';
import { useActiveWeb3React } from '../../hooks';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_GEYSERS } from '../../queries/geyser';
import { Geyser, Lock, TokenPair, Vault } from './types';
import { uniClient, tclient } from '../../queries/thetaclient';

import { GET_PAIRS } from '../../queries/uniswap';
const MS_PER_SEC = 1000;

// polling interval for querying subgraph

const POLL_INTERVAL = 30 * MS_PER_SEC;
const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`;

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`;

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`;

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size:20px;
  margin-top: 2em;
  margin-bottom: 2em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  padding: 0 20px;
  font-weight:bolder;
  font-size:20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

const INITIAL_VOLT_ON_THETA = '0xbd515e41df155112cc883f8981cb763a286261be';

const voltsTokenPair = {
  __typename: "Pair",
  id: "0xe6a991ffa8cfe62b0bf6bf72959a3d4f11b2e0f5",
  reserveUSD: "0",
  token0: {
      __typename: "Token",
      decimals: "18",
      id: "0xe6a991ffa8cfe62b0bf6bf72959a3d4f11b2e0f5",
      symbol: "VOLT"
  },
  token0Price: "50",
  token1: {
    __typename: "Token",
    decimals: "18",
    id: "0xe6a991ffa8cfe62b0bf6bf72959a3d4f11b2e0f5",
    symbol: "VOLT"
},
  token1Price: "50",
  totalSupply: "0"
}

export default function ThetaEarn() {
  const { chainId } = useActiveWeb3React();
  const stakingInfos = useStakingInfo();

  const [getGeysers, { loading: geyserLoading, data: geyserData }] = useLazyQuery(GET_GEYSERS, {
    pollInterval: POLL_INTERVAL,
    client: tclient
  });
  const [getPairs, { loading: pairLoading, data: pairData }] = useLazyQuery(GET_PAIRS, {
    pollInterval: 3000,
    client: uniClient
  });

  
  // pagination
  const [page, setPage] = useState(1)
  const [geysers, setGeysers] = useState<Geyser[]>([]);
  const [pairs, setPairs] = useState<TokenPair[]>([]);

  useEffect(() => {
    getPairs();
    getGeysers();
  }, []);

  useEffect(() => {
    // console.log('geyser data updated:', geyserData);

    if (geyserData && geyserData.geysers) {
     
      const geysers = [...geyserData.geysers]

      

      
      const filtered = geysers
      .filter(g => g.id.toLowerCase() !== INITIAL_VOLT_ON_THETA.toLowerCase())
      .map(
        geyser =>
          ({
            ...geyser,

            status: geyser.powerSwitch.status
          } as Geyser)
      );
     
     
        
      setGeysers(filtered);
      if (pairData && pairData.pairs) {
      
        setPairs([...pairData.pairs,voltsTokenPair] );
       
        
      }
    }
  }, [geyserData, pairData]);

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `;

  const stakingRewardsExist = true;
  const maxPage = geysers.length <= 10 ? 1 : Math.ceil(geysers.length / 10);
  const ITEMS_PER_PAGE = 10;

  return (
    
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />

          <CardNoise />

          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Voltswap liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive VOLT, the VoltSwap governance token.
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://docs.voltswap.finance/the-volt-token/staking-liquidity-mining"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about VOLTSWAP Liquidity Mining</TYPE.white>
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
          {geysers?.length === 0 || pairs?.length == 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            geysers?.slice(
              page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
              (page * ITEMS_PER_PAGE) < geysers.length ? (page * ITEMS_PER_PAGE): geysers.length  
            ).map(geyserInfo => {
              // need to sort by added liquidity here
              let tokenPair: TokenPair | undefined = undefined;
              for (const p of pairs) {
                if (p.id === geyserInfo.stakingToken ) {
                  
                  tokenPair = p;
                  break;
                }
              }

             

              return tokenPair && <PoolCard geyserInfo={geyserInfo} tokenPair={tokenPair} key={geyserInfo.id} />;
            })
          )}
          <PageButtons>
        <div
          onClick={(e) => {
            setPage(page === 1 ? page : page - 1)
          }}
        >
          <Arrow>←</Arrow>
        </div>
        <TYPE.body style={{fontSize:"20px"}}>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
        <div
          onClick={(e) => {
            setPage(page === maxPage ? page : page + 1)
          }}
        >
          <Arrow>→</Arrow>
        </div>
      </PageButtons>
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  );
}
