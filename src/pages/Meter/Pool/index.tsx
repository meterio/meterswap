import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { useGetCharges } from '../contracts/useChargeFactory'
import { ActionType } from './constants'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import { Token, CurrencyAmount, TokenAmount } from '@uniswap/sdk'
import { useCharge } from '../contracts/useContract'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { Field } from '../../../state/mint/actions'
import { ROUTER_ADDRESS } from '../../../constants'
import { BigNumber } from 'ethers'

export default function Pool() {
  const addTransaction = useTransactionAdder()

  const pairs = useGetCharges()

  // pair
  const [currentPairIndex, setcurrentPairIndex] = useState(0)
  const contractAddress = pairs ? pairs[currentPairIndex] : undefined

  const onClickPair = useCallback((index: number) => {
    setcurrentPairIndex(index)
  }, [setcurrentPairIndex])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Deposit)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const [currentToken, setCurrentToken] = useState<Token | null>(null)
  useEffect(() => {
    if (currentToken == null && baseToken !== null) {
      setCurrentToken(baseToken)
    }
  }, [baseToken])
  useEffect(() => {
    setCurrentToken(baseToken)
  }, [currentPairIndex])


  // submit
  const currencyAmount = currentToken ? new TokenAmount(
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

  const submit = async () => {
    console.log(BigNumber.isBigNumber(amount), amount)
    if (!chargeContract || !currentToken || !baseToken || !quoteToken) {
      return
    }
    await approveCallback()
    const method = currentAction === ActionType.Deposit ?
      (currentToken.symbol === baseToken.symbol ? chargeContract.depositBase : chargeContract.depositQuote)
      :
      (currentToken.symbol === baseToken.symbol ? chargeContract.withdrawBase : chargeContract.withdrawQuote)
    const decimal = BigNumber.from(10).pow(BigNumber.from(currentToken.decimals))
    const depositAmount = BigNumber.from(amount).mul(decimal).toHexString()
    const response = await method(depositAmount, { gasLimit: 350000 })
    addTransaction(response, { summary: 'submit' })
  }

  return (
    <>
      <Pairs pairs={pairs} currentIndex={currentPairIndex} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel
        amount={amount}
        setAmount={setAmount}
        token={currentToken}
        setToken={setCurrentToken}
        tokens={baseToken && quoteToken ? [baseToken, quoteToken] : []}
      />
      {contractAddress && currentToken && <Info contractAddress={contractAddress} currentToken={currentToken} />}
      <ButtonPrimary onClick={submit}>Submit</ButtonPrimary>
    </>
  )
}
