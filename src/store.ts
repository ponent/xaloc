import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/reducer'
import breadcrumbsReducer from './store/breadcrumbs/reducer'
import playerReducer from './store/player/reducer'
import thunk from "redux-thunk"


export const store = configureStore({
    reducer: {
        articles: articleReducer,
        breadcrumbs: breadcrumbsReducer,
        player: playerReducer
    },
    devTools: true,
    middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch