import { useChargeFactory } from './useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'

export function useGetCharges() {
  const chargeFactoryContract = useChargeFactory()
  const { result } = useOnceCallResult(chargeFactoryContract, 'getCharges', [])
  return result ? result[0] : []
}
