import * as actionTypes from "./actionTypes"
import {
    IPodcastResult,
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
