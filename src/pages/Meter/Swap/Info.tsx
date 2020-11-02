import React from 'react'
import styled from 'styled-components'
import { SectionBreak } from '../../../components/swap/styleds'
import { ActionType } from './constants'
import { useBaseToken, useLpFeeRate, useOraclePrice, useQuoteToken } from '../contracts/useChargePair'
import { useUserSlippageTolerance } from '../../../state/user/hooks'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { Fraction } from '@uniswap/sdk'

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
  margin-bottom: 1rem;
  word-break: break-word;
`

const PriceRow = styled(Row)`
  font-size: 1.2rem;
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
  const feeToken = action === ActionType.Buy ? baseToken : quoteToken
  const payToken = action === ActionType.Buy ? quoteToken : baseToken
  const price = useOraclePrice(contractAddress)

  const [allowedSlippage] = useUserSlippageTolerance()
  const { account } = useActiveWeb3React()
  const payTokenBalance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)


  const lpFeeRate = useLpFeeRate(contractAddress)
  const lpFeeRateFormatted = lpFeeRate ? formatUnits(lpFeeRate, 18) : null

  console.log(price?.toString(), baseToken?.decimals, quoteToken?.decimals)

  return (
    <Panel>
      <Row>
        <div>Balance: {payTokenBalance?.toSignificant(6)} {payToken?.symbol}</div>
      </Row>
      <PriceRow>
        <div>Expected {action === ActionType.Buy ? 'Pay' : 'Receive'}:</div>
        <div>{price ? formatUnits(price.mul(parseUnits(amount, 10)), 10 + (quoteToken?.decimals ?? 0)) : '-'} {quoteToken?.symbol}</div>
      </PriceRow>
      <Row>
        <div>1 {baseToken?.symbol} = {price ? formatUnits(price, quoteToken?.decimals) : '-'} {quoteToken?.symbol}</div>
      </Row>
      <Break />
      <Row>
        <div>Slippage Tolerance:</div>
        <div>{allowedSlippage / 100}%</div>
      </Row>
      <Row>
        {
          lpFeeRate ?
            <>
              <div>Liquidity Provider
                Fee({lpFeeRateFormatted ? (parseFloat(lpFeeRateFormatted) * 100).toFixed(2) : '-'}%):
              </div>
              <div>{lpFeeRateFormatted ? (parseFloat(lpFeeRateFormatted) * parseFloat(amount)).toFixed(2) : '-'} {feeToken?.symbol}</div>
            </>
            : null
        }

      </Row>
    </Panel>
  )
}
