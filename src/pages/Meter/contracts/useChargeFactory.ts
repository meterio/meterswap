import { useChargeFactory } from './useContract'
import { useOnceCallResult } from '../../../state/multicall/hooks'

export function useGetCharges(): string[] {
  const chargeFactoryContract = useChargeFactory()
  return useOnceCallResult(chargeFactoryContract, 'getCharges', []) ?? []
}
