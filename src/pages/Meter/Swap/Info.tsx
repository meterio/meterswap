import { useTranslation } from 'react-i18next'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { SectionBreak } from '../../../components/swap/styleds'
import { ActionType } from './constants'
import { Contract } from '@ethersproject/contracts'
import { useOnceCallResult } from '../../../state/multicall/hooks'
import { useBaseToken, useLpFeeRate, useOraclePrice, useQuoteToken } from '../contracts/useChargePair'
import { useUserSlippageTolerance } from '../../../state/user/hooks'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

const Panel = styled.div`
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PriceRow = styled(Row)`
  font-size: 1.4rem;
  margin: 1rem 0;
`

const Break = styled(SectionBreak)`
  margin-bottom: 1rem;
`

export default function({ action, contractAddress, amount }: { action: ActionType, contractAddress: string | undefined, amount: string }) {
  if (!contractAddress) {
    return null
  }
  amount = isNaN(parseFloat(amount)) ? '0' : amount

  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const price = useOraclePrice(contractAddress)

  const [allowedSlippage] = useUserSlippageTolerance()

  const feeToken = action === ActionType.Buy ? baseToken : quoteToken

  const lpFeeRate = useLpFeeRate(contractAddress)?.mul(10000).div(BigNumber.from(10).pow(feeToken?.decimals ?? 0))

  return (
    <Panel>
      <Row>
        <div>1 {baseToken?.symbol} = {price ? formatUnits(price, 6) : '-'} {quoteToken?.symbol}</div>
        {/*<div>Price Impact: 0.00%</div>*/}
      </Row>
      <PriceRow>
        <div>Expected {action === ActionType.Buy ? 'Pay' : 'Receive'}:</div>
        <div>{price ? formatUnits(price.mul(parseFloat(amount)), 6) : '-'} {quoteToken?.symbol}</div>
      </PriceRow>
      <Break />
      <Row>
        <div>Slippage Tolerance:</div>
        <div>{allowedSlippage / 100}%</div>
      </Row>
      <Row>
        {
          lpFeeRate ?
            <>
              <div>Liquidity Provider Fee({formatUnits(lpFeeRate, 2)}%):</div>
              <div>- {feeToken?.symbol}</div>
            </>
            : null
        }

      </Row>
    </Panel>
  )
}
