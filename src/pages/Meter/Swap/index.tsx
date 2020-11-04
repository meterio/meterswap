import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/components/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import { useGetCharges } from '../contracts/useChargeFactory'
import { useCharge } from '../contracts/useContract'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import CurrencyInputPanel from '../common/components/CurrencyInputPanel'
import { ETHER, TokenAmount } from '@uniswap/sdk'
import { BigNumber } from 'ethers'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { isValidNumber } from '../common/utils'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { useMeterActionHandlers, useMeterState } from '../../../state/meter/hooks'
import useInputError from '../common/hooks/useInputError'
import { CONNECT_WALLET } from '../common/strings'
import usePairs from '../common/hooks/usePairs'

export default function Swap() {
  // pair
  const { pairs, selectedPair, onSelectPair } = usePairs()

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(selectedPair)
  const quoteToken = useQuoteToken(selectedPair)
  const payToken = currentAction === ActionType.Buy ? quoteToken : baseToken

  const inputError = useInputError(amount, payToken)

  // submit
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const currencyAmount = payToken ? new TokenAmount(
    payToken,
    parseUnits(amount || '0', payToken.decimals).toString()
  ) : undefined
  const [approval, approveCallback] = useApproveCallback(currencyAmount, selectedPair)
  const chargeContract = useCharge(selectedPair, true)

  const submit = async () => {
    if (inputError === CONNECT_WALLET) {
      toggleWalletModal()
      return
    }
    if (!chargeContract || !baseToken) {
      return
    }
    await approveCallback()
    const method = currentAction === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
    const submitAmount = parseEther(amount)
      .mul(BigNumber.from(10).pow(BigNumber.from(baseToken.decimals)))
      .div(BigNumber.from(10).pow(BigNumber.from(ETHER.decimals)))
    console.log(`Swap submit: ${currentAction} ${baseToken.symbol}`, submitAmount.toString())
    const response = await method(submitAmount.toHexString(), currentAction === ActionType.Buy ? submitAmount.mul(1000000).toHexString() : '0x0', '0x', { gasLimit: 350000 })
    addTransaction(response, { summary: 'submit' })
  }

  if (!selectedPair) {
    return null
  }

  return (
    <>
      <Pairs pairs={pairs} selectedPair={selectedPair} onClick={onSelectPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel showBalance={false} amount={amount} setAmount={i => setAmount(i)} token={baseToken} />
      {(isValidNumber(amount) && parseFloat(amount) > 0) ?
        <Info action={currentAction} contractAddress={selectedPair} amount={amount} /> : null}
      <ButtonPrimary disabled={inputError !== null && inputError !== CONNECT_WALLET} onClick={submit}>
        {inputError ?? 'Submit'}
      </ButtonPrimary>
    </>
  )
}
