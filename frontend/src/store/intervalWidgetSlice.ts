import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

const initialState: number|null = 1000;

export const intervalWidgetSlice = createSlice({
    name: 'interval',
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

export const { set } = intervalWidgetSlice.actions

export const selectInterval = (state: RootState) => state.interval

export default intervalWidgetSlice.reducer
