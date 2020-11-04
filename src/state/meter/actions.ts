import { createAction } from '@reduxjs/toolkit'

export const selectPair = createAction<{ selectedPair: string | undefined }>('meter/selectPair')
