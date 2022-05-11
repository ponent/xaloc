import * as actionTypes from "./actionTypes"
import {
    UpdateSearchResultsAction
} from "./reducer";

export function updateSearchResults(results: Array<object>) : UpdateSearchResultsAction {
    return {
        type: actionTypes.SEARCH__UPDATE_RESULTS,
        searchResults: results
    }
}
