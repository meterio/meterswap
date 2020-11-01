import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { useGetCharges } from '../contracts/useChargeFactory'
import { ActionType } from './constants'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import { Token, CurrencyAmount, TokenAmount, ETHER } from '@uniswap/sdk'
import { useCharge } from '../contracts/useContract'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { Field } from '../../../state/mint/actions'
import { ROUTER_ADDRESS } from '../../../constants'
import { BigNumber } from 'ethers'
import { tryParseBigNumber } from '../common/utils'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { parseEther } from 'ethers/lib/utils'

export default function Pool() {
  const pairs = useGetCharges()
  const { account } = useActiveWeb3React()

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
    if (!chargeContract || !currentToken || !baseToken || !quoteToken) {
      return
    }
    await approveCallback()
    const method = currentAction === ActionType.Deposit ?
      (currentToken.symbol === baseToken.symbol ? chargeContract.depositBase : chargeContract.depositQuote)
      :
      (currentToken.symbol === baseToken.symbol ? chargeContract.withdrawBase : chargeContract.withdrawQuote)
    const submitAmount = parseEther(amount)
      .mul(BigNumber.from(10).pow(BigNumber.from(currentToken.decimals)))
      .div(BigNumber.from(10).pow(BigNumber.from(ETHER.decimals)))
    console.log(submitAmount.toString())
    const response = await method(submitAmount, { gasLimit: 350000 })
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
      <ButtonPrimary disabled={inputError !== null} onClick={submit}>{inputError ?? 'Submit'}</ButtonPrimary>
    </>
  )
}
