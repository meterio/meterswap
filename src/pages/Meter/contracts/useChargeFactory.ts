import { useChargeFactory } from './useContract'
import { useSingleCallResult } from '../../../state/multicall/hooks'

export function userGetCharges() {
  const chargeFactoryContract = useChargeFactory()
  const { result: pairs } = useSingleCallResult(chargeFactoryContract, 'getCharges', [])
}
