import { createReducer } from '@reduxjs/toolkit'
import { selectPair } from './actions'

export interface MeterState {
  readonly selectedPair: string | undefined
}

const initialState: MeterState = {
  selectedPair: undefined
}

export default createReducer<MeterState>(initialState, builder =>
  builder
    .addCase(
      selectPair,
      (state, { payload: { selectedPair } }) => {
        return {
          ...state,
          selectedPair: selectedPair
        }
      }
    )
)
