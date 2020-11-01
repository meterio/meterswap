import React, { useCallback, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import { useGetCharges } from '../contracts/useChargeFactory'
import { useCharge } from '../contracts/useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'
import { useBaseToken } from '../contracts/useChargePair'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { TokenAmount } from '@uniswap/sdk'
import { BigNumber } from 'ethers'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { useTransactionAdder } from '../../../state/transactions/hooks'

export default function Swap() {
  const pairs = useGetCharges()

  // pair
  const [currentPairIndex, setcurrentPairIndex] = useState(0)
  const contractAddress = pairs ? pairs[currentPairIndex] : undefined

  const onClickPair = useCallback((index: number) => {
    setcurrentPairIndex(index)
  }, [setcurrentPairIndex])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)

  // submit
  const addTransaction = useTransactionAdder()
  const currencyAmount = baseToken ? new TokenAmount(
    baseToken,
    BigNumber
      .from(1000)
      .mul(
        BigNumber.from(10).pow(BigNumber.from(baseToken.decimals))
      )
      .toString()
  ) : undefined
  const [approval, approveCallback] = useApproveCallback(currencyAmount, contractAddress)
  const chargeContract = useCharge(contractAddress, true)

  const submit = async () => {
    if (!chargeContract || !baseToken) {
      return
    }
    await approveCallback()
    const method = currentAction === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
    const decimal = BigNumber.from(10).pow(BigNumber.from(baseToken.decimals))
    const depositAmount = BigNumber.from(amount).mul(decimal)
    const response = await method(depositAmount.toHexString(), depositAmount.mul(1000000).toHexString(), '0x', { gasLimit: 350000 })
    addTransaction(response, { summary: 'submit' })
  }

  return (
    <>
      <Pairs pairs={pairs} currentIndex={currentPairIndex} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel showBalance={false} amount={amount} setAmount={i => setAmount(i)} token={baseToken} />
      <Info action={currentAction} contractAddress={contractAddress} amount={amount} />
      <ButtonPrimary onClick={submit}>Submit</ButtonPrimary>
    </>
  )
}
