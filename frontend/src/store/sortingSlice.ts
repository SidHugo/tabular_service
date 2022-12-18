import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type Order = 'asc' | 'desc';

export interface Sorting {
    orderBy: string,
    order: Order
}

const initialState: Sorting = {
    orderBy: 'symbol',
    order: 'asc'
};

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Sorting>) => {
            return action.payload
        }
    },
})

export const { set } = sortingSlice.actions

export const selectSorting = (state: RootState) => state.sorting

export default sortingSlice.reducer