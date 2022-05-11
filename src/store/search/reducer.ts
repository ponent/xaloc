import * as actionTypes from "./actionTypes"
import {ReduxAction} from "../../type";

export interface ISearchState {
    searchModalOpen: boolean,
    searchResults: Array<object>,
    searchResultsLoading: boolean,
    searchTerm: string
}

const initialState: ISearchState = {
    searchModalOpen: false,
    searchResults: [],
    searchResultsLoading: false,
    searchTerm: ""
}

export type UpdateSearchResultsAction = {
    type: string,
    searchResults: Array<object>
}

const reducer = (
    state: ISearchState = initialState,
    action: ReduxAction
): ISearchState => {
    switch (action.type) {
        case actionTypes.SEARCH__UPDATE_RESULTS:
            const UpdateSearchResults = action as UpdateSearchResultsAction;
            return {
                ...state,
                searchResults: UpdateSearchResults.searchResults,
                searchResultsLoading: false
            }
    }
    return state
}

export default reducer