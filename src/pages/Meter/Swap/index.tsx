import React, { useCallback, useEffect, useState } from 'react'
import Pairs from '../common/Pairs'
import { ButtonPrimary } from '../../../components/Button'
import ActionTypes from './ActionTypes'
import Info from './Info'
import { ActionType } from './constants'
import { useGetCharges } from '../contracts/useChargeFactory'
import { useCharge } from '../contracts/useContract'
import { useBaseToken, useQuoteToken } from '../contracts/useChargePair'
import CurrencyInputPanel from '../common/CurrencyInputPanel'
import { ChainId, ETHER, TokenAmount } from '@uniswap/sdk'
import { BigNumber } from 'ethers'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { isValidNumber } from '../common/utils'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { useMeterActionHandlers, useMeterState } from '../../../state/meter/hooks'

export default function Swap() {
  const pairs = useGetCharges()
  const { account, chainId } = useActiveWeb3React()


  // pair
  const { selectedPair } = useMeterState()
  const { onPairSelected } = useMeterActionHandlers()
  const contractAddress = selectedPair

  const onClickPair = useCallback((index: number) => {
    onPairSelected(pairs ? pairs[index] : undefined)
  }, [pairs])
  useEffect(() => {
    if (pairs && pairs.length > 0 && (!selectedPair || !pairs.includes(selectedPair))) {
      console.log('onPairSelected')
      onPairSelected(pairs[0])
    }
  }, [pairs])

  // action type
  const [currentAction, setCurrentAction] = useState(ActionType.Buy)

  // input panel
  const [amount, setAmount] = useState('')
  const baseToken = useBaseToken(contractAddress)
  const quoteToken = useQuoteToken(contractAddress)
  const payToken = currentAction === ActionType.Buy ? quoteToken : baseToken
  const payTokenBalance = useCurrencyBalance(account ?? undefined, payToken ?? undefined)

  let inputError: string | null = null
  if (!isValidNumber(amount) || parseFloat(amount) <= 0) {
    inputError = 'Enter a number'
  } else if (!payToken || (payTokenBalance &&
    parseEther(amount)?.mul(BigNumber.from(10).pow(payToken.decimals))
      .div(BigNumber.from(10).pow(ETHER.decimals))
      .gt(
        BigNumber.from(payTokenBalance.raw.toString())
      ))) {
    inputError = 'Insufficient balance'
  }

  if (!(chainId === ChainId.RINKEBY)) {
    inputError = 'Wrong network'
  }

  // submit
  const toggleWalletModal = useWalletModalToggle()
  const addTransaction = useTransactionAdder()
  const currencyAmount = payToken ? new TokenAmount(
    payToken,
    parseUnits(amount || '0', payToken.decimals).toString()
  ) : undefined
  const [approval, approveCallback] = useApproveCallback(currencyAmount, contractAddress)
  const chargeContract = useCharge(contractAddress, true)

  const submit = async () => {
    if (!chargeContract || !baseToken) {
      return
    }
    await approveCallback()
    const method = currentAction === ActionType.Buy ? chargeContract.buyBaseToken : chargeContract.sellBaseToken
    const submitAmount = parseEther(amount)
      .mul(BigNumber.from(10).pow(BigNumber.from(baseToken.decimals)))
      .div(BigNumber.from(10).pow(BigNumber.from(ETHER.decimals)))
    const response = await method(submitAmount.toHexString(), currentAction === ActionType.Buy ? submitAmount.mul(1000000).toHexString() : '0x0', '0x', { gasLimit: 350000 })
    addTransaction(response, { summary: 'submit' })
  }

  if (!selectedPair) {
    return null
  }

  return (
    <>
      <Pairs pairs={pairs} selectedPair={selectedPair} onClick={onClickPair} />
      <ActionTypes currentTab={currentAction} onTabChanged={(action) => setCurrentAction(action)} />
      <CurrencyInputPanel showBalance={false} amount={amount} setAmount={i => setAmount(i)} token={baseToken} />
      {(isValidNumber(amount) && parseFloat(amount) > 0) ?
        <Info action={currentAction} contractAddress={contractAddress} amount={amount} /> : null}
      {account ?
        <ButtonPrimary disabled={inputError !== null} onClick={submit}>{inputError ?? 'Submit'}</ButtonPrimary>
        :
        <ButtonPrimary onClick={toggleWalletModal}>Connect to a wallet</ButtonPrimary>
      }
    </>
  )
}
