import articleReducer from './store/reducer'
import breadcrumbsReducer from './store/breadcrumbs/reducer'
import playerReducer from './store/player/reducer'
import {Action} from "redux";

export default function rootReducer(state: any = {}, action: Action) {
    // always return a new object for the root state
    return {
        // the value of `state.todos` is whatever the todos reducer returns
        articles: articleReducer(state.articles, action),
        breadcrumbs: breadcrumbsReducer(state.breadcrumbs, action),
        player: playerReducer(state.player, action)
    }
}