import { useMeterActionHandlers, useMeterState } from '../../../../state/meter/hooks'
import { useCallback, useEffect } from 'react'
import { useGetCharges } from '../../contracts/useChargeFactory'

export default function() {
  const pairs = useGetCharges()
  const { selectedPair } = useMeterState()
  const { onPairSelected } = useMeterActionHandlers()

  useEffect(() => {
    if (!pairs || pairs.length === 0) {
      return
    }
    if (!selectedPair || !pairs.includes(selectedPair)) {
      onPairSelected(pairs[0])
    }
  }, [pairs])

  const onSelectPair = useCallback((index: number) => {
    onPairSelected(pairs ? pairs[index] : undefined)
  }, [onPairSelected, pairs])

  return {
    pairs,
    selectedPair,
    onSelectPair
  }
}
