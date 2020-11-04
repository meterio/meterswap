import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { useGetCharges } from '../contracts/useChargeFactory'
import { ActionType } from './constants'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import { Token, CurrencyAmount, TokenAmount, ETHER, Currency } from '@uniswap/sdk'
import { useCharge, useChargeEthProxy } from '../contracts/useContract'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { Field } from '../../../state/mint/actions'
import { ROUTER_ADDRESS } from '../../../constants'
import { BigNumber } from 'ethers'
import { tryParseBigNumber } from '../common/utils'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { parseEther } from 'ethers/lib/utils'
import { useMeterActionHandlers, useMeterState } from '../../../state/meter/hooks'

export default function Pool() {
  const pairs = useGetCharges()
  const { account } = useActiveWeb3React()

  // pair
  const { selectedPair } = useMeterState()
  const { onPairSelected } = useMeterActionHandlers()
  const contractAddress = selectedPair

  const onClickPair = useCallback((index: number) => {
    onPairSelected(pairs ? pairs[index] : undefined)
  }, [pairs])
  useEffect(() => {
    if (selectedPair === undefined && pairs && pairs.length > 0) {
      onPairSelected(pairs[0])
    }
  }, [pairs])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Deposit)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const [currentToken, setCurrentToken] = useState<Token | null>(null)
  const isCurrentEther = currentToken?.symbol === 'WETH'
  useEffect(() => {
    if (currentToken == null && baseToken !== null) {
      setCurrentToken(baseToken)
    }
  }, [baseToken])

  const currentTokenBalance = useCurrencyBalance(account ?? undefined, currentToken ?? undefined)
  let inputError: string | null = null
  if (!amount || !currentToken || (currentTokenBalance &&
    parseEther(amount)?.mul(BigNumber.from(10).pow(currentToken.decimals))
      .div(BigNumber.from(10).pow(ETHER.decimals))
      .gt(
        BigNumber.from(currentTokenBalance.raw.toString())
      ))) {
    inputError = 'Insufficient balance'
  }

  // submit
  const addTransaction = useTransactionAdder()
  const currencyAmount = (currentToken && !isCurrentEther) ? new TokenAmount(
    currentToken,
    BigNumber
      .from(1000)
      .mul(
        BigNumber.from(10).pow(BigNumber.from(currentToken.decimals))
      )
      .toString()
  ) : undefined
  const [approval, approveCallback] = useApproveCallback(currencyAmount, contractAddress)
  const chargeContract = useCharge(contractAddress, true)
  const chargeEthProxyContract = useChargeEthProxy(true)

  const submit = async () => {
    if (!currentToken || !baseToken || !quoteToken) {
      return
    }
    await approveCallback()

    const isDeposit = currentAction === ActionType.Deposit
    const isBase = currentToken.symbol === baseToken.symbol
    const submitAmount = parseEther(amount)
      .mul(BigNumber.from(10).pow(BigNumber.from(currentToken.decimals)))
      .div(BigNumber.from(10).pow(BigNumber.from(ETHER.decimals)))
    console.log(`Pool submit: ${currentAction} ${currentToken.symbol}`, submitAmount.toString())

    if (isCurrentEther) {
      if (!chargeEthProxyContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeEthProxyContract.depositEthAsBase : chargeEthProxyContract.depositEthAsQuote)
        :
        (isBase ? chargeEthProxyContract.withdrawEthAsBase : chargeEthProxyContract.withdrawEthAsQuote)
      const response = await method(
        submitAmount,
        isBase ? quoteToken.address : baseToken.address,
        {
          value: submitAmount,
          gasLimit: 350000
        })
      addTransaction(response, { summary: 'submit' })
    } else {
      if (!chargeContract) {
        return
      }
      const method = isDeposit ?
        (isBase ? chargeContract.depositBase : chargeContract.depositQuote)
        :
        (isBase ? chargeContract.withdrawBase : chargeContract.withdrawQuote)
      const response = await method(submitAmount, { gasLimit: 350000 })
      addTransaction(response, { summary: 'submit' })
    }
  }

  if (!selectedPair) {
    return null
  }

  return (
    <>
      <Pairs pairs={pairs} selectedPair={selectedPair} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel
        amount={amount}
        setAmount={setAmount}
        token={currentToken}
        setToken={setCurrentToken}
        tokens={baseToken && quoteToken ? [baseToken, quoteToken] : []}
      />
      {contractAddress && currentToken && <Info contractAddress={contractAddress} currentToken={currentToken} />}
      <ButtonPrimary disabled={inputError !== null} onClick={submit}>{inputError ?? 'Submit'}</ButtonPrimary>
    </>
  )
}
