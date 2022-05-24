import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './store/reducer'
import breadcrumbsReducer from './store/breadcrumbs/reducer'
import playerReducer from './store/player/reducer'
import searchReducer from './store/search/reducer'
import menuReducer from './store/menu/reducer'
import counterSlice from './store/counter/counterSlice'


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        articles: articleReducer,
        breadcrumbs: breadcrumbsReducer,
        player: playerReducer,
        search: searchReducer,
        counter: counterSlice
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
