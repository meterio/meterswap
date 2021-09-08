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
import { uniClient } from '../../queries/client';
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

export default function Earn() {
  const { chainId } = useActiveWeb3React();
  const stakingInfos = useStakingInfo();

  const [getGeysers, { loading: geyserLoading, data: geyserData }] = useLazyQuery(GET_GEYSERS, {
    pollInterval: POLL_INTERVAL
  });
  const [getPairs, { loading: pairLoading, data: pairData }] = useLazyQuery(GET_PAIRS, {
    pollInterval: 3000,
    client: uniClient
  });
  const [geysers, setGeysers] = useState<Geyser[]>([]);
  const [pairs, setPairs] = useState<TokenPair[]>([]);

  useEffect(() => {
    getPairs();
    getGeysers();
  }, []);

  useEffect(() => {
    // console.log('geyser data updated:', geyserData);

    if (geyserData && geyserData.geysers) {
      const geysers = [...geyserData.geysers].map(
        geyser =>
          ({
            ...geyser,

            status: geyser.powerSwitch.status
          } as Geyser)
      );

      setGeysers(geysers);
      if (pairData && pairData.pairs) {
        setPairs(pairData.pairs);
      }
    }
  }, [geyserData, pairData]);

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `;

  const stakingRewardsExist = true;

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
          {geysers?.length === 0 || pairs?.length == 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            geysers?.map(geyserInfo => {
              // need to sort by added liquidity here
              let tokenPair: TokenPair | undefined = undefined;
              for (const p of pairs) {
                if (p.id === geyserInfo.stakingToken) {
                  tokenPair = p;
                  break;
                }
              }

              return tokenPair && <PoolCard geyserInfo={geyserInfo} tokenPair={tokenPair} key={geyserInfo.id} />;
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  );
}
