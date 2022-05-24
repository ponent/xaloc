import { AnyAction } from "redux";
import * as actionTypes from "./actionTypes"
import {
    CloseSearchDrawerAction,
    OpenDrawerWithPodcastAction,
    UpdateSearchTermAction
} from "./reducer";

export function updateSearchTerm(searchTerm: string): UpdateSearchTermAction {
    return {
        type: actionTypes.SEARCH__UPDATE_SEARCH_TERM,
        searchTerm: searchTerm
    }
}

export function openDrawerWithPodcast(url: string): OpenDrawerWithPodcastAction {
    return {
        type: actionTypes.SEARCH__OPEN_DRAWER,
        contentType: "podcast",
        url: url
    }
}

export function closeSearchDrawer(): CloseSearchDrawerAction {
    return {
        type: actionTypes.SEARCH__CLOSE_DRAWER,
    }
}

export interface SetLoadingDrawerAction extends AnyAction {
    loading: boolean;
}

export function setLoadingAction(loading: boolean): SetLoadingDrawerAction {
    return {
        type: actionTypes.SEARCH__CLOSE_DRAWER,
        loading: loading
    }
}