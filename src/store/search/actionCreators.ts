import * as actionTypes from "./actionTypes"
import {
    CloseSearchDrawerAction,
    IPodcastResult,
    OpenDrawerWithPodcastAction,
    UpdateSearchResultsAction,
    UpdateSearchTermAction
} from "./reducer";

export function updateSearchResults(results: Array<IPodcastResult>) : UpdateSearchResultsAction {
    return {
        type: actionTypes.SEARCH__UPDATE_RESULTS,
        searchResults: results
    }
}

export function updateSearchTerm(searchTerm: string) : UpdateSearchTermAction {
    return {
        type: actionTypes.SEARCH__UPDATE_SEARCH_TERM,
        searchTerm: searchTerm
    }
}

export function openDrawerWithPodcast(url: string) : OpenDrawerWithPodcastAction {
    return {
        type: actionTypes.SEARCH__OPEN_DRAWER,
        contentType: "podcast",
        url: url
    }
}

export function closeSearchDrawer() : CloseSearchDrawerAction {
    return {
        type: actionTypes.SEARCH__CLOSE_DRAWER,
    }
}
