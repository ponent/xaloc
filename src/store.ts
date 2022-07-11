import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/reducer'
import breadcrumbsReducer from './store/breadcrumbs/reducer'
import playerReducer from './store/player/reducer'
import searchReducer from './store/search/reducer'
import subscriptionReducer from './store/subscriptions/reducer'
import settingsReducer from './store/settings/reducer'

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        breadcrumbs: breadcrumbsReducer,
        player: playerReducer,
        search: searchReducer,
        subscriptions: subscriptionReducer,
        settings: settingsReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
