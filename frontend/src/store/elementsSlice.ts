import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface TableElement {
    symbol: string
    price: number
}

interface ElementsMap {
    [symbol: string]: TableElement
}

const initialState: ElementsMap = {};

export const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<TableElement[]>) => {
            const elements = state;
            action.payload.forEach(element => elements[element.symbol] = element)
            return elements
        },
        set: (state, action: PayloadAction<TableElement[]>) => {
            return action.payload
                .reduce((map: ElementsMap, element) => {
                    map[element.symbol] = element
                    return map
                }, {});
        },
    },
})

export const { update, set } = elementsSlice.actions

export const selectElements = (state: RootState) => state.elements

export default elementsSlice.reducer