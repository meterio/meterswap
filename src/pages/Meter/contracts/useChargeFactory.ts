import { useChargeFactory } from './useContract'
import { useSingleCallResult } from '../../../state/multicall/hooks'

export function useGetCharges() {
  const chargeFactoryContract = useChargeFactory()
  const { result } = useSingleCallResult(chargeFactoryContract, 'getCharges', [])
  return result ? result[0] : []
}
