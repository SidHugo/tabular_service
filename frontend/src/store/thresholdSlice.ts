import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

const initialState: number = 1000;

export const thresholdSlice = createSlice({
    name: 'threshold',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<number>) => {
            if (action.payload === null || isNaN(action.payload)) {
                return 0;
            }
            return action.payload
        }
    },
})

export const { set } = thresholdSlice.actions

export const selectThreshold = (state: RootState) => state.threshold

export default thresholdSlice.reducer