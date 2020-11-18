import React from 'react'
import styled from 'styled-components'
import { SectionBreak } from '../../../components/swap/styleds'
import { ActionType } from './constants'
import {
  useBaseToken,
  useLpFeeRate,
  useOraclePrice,
  useQueryBuyBaseToken, useQuerySellBaseToken,
  useQuoteToken
} from '../contracts/useChargePair'
import { useUserSlippageTolerance } from '../../../state/user/hooks'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { Fraction } from 'meterswap-sdk'
import { displaySymbol, formatBigNumber, isValidNumber, tryParseAmount, tryParseToBigNumber } from '../common/utils'
import { BigNumber } from 'ethers'
import { useExpectedQuoteAmount, useInputError } from '../common/hooks/useSwap'

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

  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const feeToken = action === ActionType.Buy ? baseToken : quoteToken
  const payToken = action === ActionType.Buy ? quoteToken : baseToken
  const inputBaseAmountBI = tryParseAmount(amount, baseToken?.decimals)
  const expectedQuoteAmount = useExpectedQuoteAmount(contractAddress, action, inputBaseAmountBI)
  const oracleQuoteAmount = useExpectedQuoteAmount(contractAddress, action, BigNumber.from(1))
  const targetPrice = useOraclePrice(contractAddress)

  const [allowedSlippage] = useUserSlippageTolerance()
  const { account } = useActiveWeb3React()
  const payTokenBalance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)


  const lpFeeRate = useLpFeeRate(contractAddress)
  const lpFeeRateFormatted = lpFeeRate ? formatUnits(lpFeeRate, 18) : null

  if (!baseToken || !quoteToken) {
    return null
  }

  let actualPrice = null
  let oraclePrice = null
  if (expectedQuoteAmount && oracleQuoteAmount && inputBaseAmountBI) {
    actualPrice = expectedQuoteAmount.mul(BigNumber.from(10).pow(baseToken.decimals)).div(inputBaseAmountBI)
    oraclePrice = oracleQuoteAmount.mul(BigNumber.from(10).pow(quoteToken.decimals))
    console.log(actualPrice.toString(), oraclePrice.toString())
  }
  const priceImpact = (actualPrice && oraclePrice && oracleQuoteAmount) ?
    actualPrice.sub(oraclePrice).mul(10000).div(oraclePrice) : null

  return (
    <Panel>
      <PriceRow>
        <div>Expect to {action === ActionType.Buy ? 'Pay' : 'Receive'}:</div>
        <div>{expectedQuoteAmount ? formatBigNumber(expectedQuoteAmount, quoteToken.decimals, 2) : '-'} {displaySymbol(quoteToken)}</div>
      </PriceRow>
      <Row>
        <div>1 {displaySymbol(baseToken)} = {actualPrice ? formatBigNumber(actualPrice, quoteToken.decimals, 2) : '-'} {displaySymbol(quoteToken)}</div>
        <div>Balance: {payTokenBalance?.toSignificant(6)} {displaySymbol(payToken)}</div>
      </Row>
      <Row>
        <div>Target Price: 1 {displaySymbol(baseToken)} = {targetPrice && payToken ? formatBigNumber(targetPrice, payToken.decimals) : '-'} {displaySymbol(quoteToken)}</div>
        <div>Price Impact: {priceImpact ? formatBigNumber(priceImpact, 2) : '-'}%</div>
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
              <div>{lpFeeRateFormatted ? (parseFloat(lpFeeRateFormatted) * parseFloat(amount)).toFixed(2) : '-'} {displaySymbol(feeToken)}</div>
            </>
            : null
        }

      </Row>
    </Panel>
  )
}
