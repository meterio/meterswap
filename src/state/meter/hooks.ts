import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { selectPair } from './actions'

export function useMeterState(): AppState['meter'] {
  return useSelector<AppState, AppState['meter']>(state => state.meter)
}

export function useMeterActionHandlers(): {
  onPairSelected: (contractAddress: string | undefined) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onPairSelected = useCallback(
    (selectedPair: string | undefined) => {
      dispatch(
        selectPair({
          selectedPair
        })
      )
    },
    [dispatch]
  )

  return {
    onPairSelected
  }
}
