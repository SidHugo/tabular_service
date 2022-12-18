import {configureStore} from '@reduxjs/toolkit'
import {elementsSlice} from "./elementsSlice";
import {thresholdSlice} from "./thresholdSlice";
import {intervalWidgetSlice} from "./intervalWidgetSlice";
import {sortingSlice} from "./sortingSlice";

const store = configureStore({
    reducer: {
        elements: elementsSlice.reducer,
        threshold: thresholdSlice.reducer,
        interval: intervalWidgetSlice.reducer,
        sorting: sortingSlice.reducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;