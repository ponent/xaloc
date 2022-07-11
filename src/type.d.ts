import {Action} from "redux";
import { IMenuState } from "./store/menu/reducer";
import {IPlayerState} from "./store/player/reducer";
import { ISearchState } from "./store/search/reducer";
import { ISettingsState } from "./store/settings/reducer";
import { ISubscriptionsState } from "./store/subscriptions/reducer";

interface IArticleId {
    value: string
}

interface IArticle {
    id: IArticleId
    title: string
    body: string,
    url: string,
    icon: string
}

interface IBreadcrumbItem {
    name: string
}

interface IBreadcrumbState {
    items: IBreadcrumbItem[]
}

type ApplicationState = {
    articles: ArticleState,
    breadcrumbs: IBreadcrumbState,
    player: IPlayerState,
    search: ISearchState,
    subscriptions: ISubscriptionsState,
    settings: ISettingsState
}

type ArticleState = {
    list: IArticle[],
    selected: IArticleId
}

interface ReduxAction {
    type: string
}

type AddArticleAction = {
    type: string
    article: IArticle
}

type RemoveArticleAction = {
    type: string,
    id: IArticleId
}

type DispatchType = (args: Action) => Action