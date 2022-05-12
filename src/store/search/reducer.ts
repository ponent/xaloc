import * as actionTypes from "./actionTypes"
import {ReduxAction} from "../../type";

export interface IPodcastResult {
    artistId: number;
    collectionId: number;
    trackId: number;
    kind: string;
    artistName: string;
    trackName: string;
    feedUrl: string;
    artworkUrl100: string;
    releaseDate: string;
    genres: Array<string>;
    trackCount: number;
}

export interface ISearchState {
    searchModalOpen: boolean;
    searchResults: Array<IPodcastResult>;
    searchResultsLoading: boolean;
    searchTerm: string;
    searchTermLastSearch: string;
}

const initialState: ISearchState = {
    searchModalOpen: false,
    searchResults: [],
    searchResultsLoading: false,
    searchTerm: "",
    searchTermLastSearch: ""
}

export type UpdateSearchResultsAction = {
    type: string,
    searchResults: Array<IPodcastResult>
}

export type UpdateSearchTermAction = {
    type: string,
    searchTerm: string
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
                searchResults: UpdateSearchResults.searchResults.sort((a: IPodcastResult, b: IPodcastResult) => (
                    (new Date(b.releaseDate).getTime()) - (new Date(a.releaseDate).getTime())
                )),
                searchResultsLoading: false,
                searchTermLastSearch: state.searchTerm
            }
        case actionTypes.SEARCH__UPDATE_SEARCH_TERM:
            const UpdateSearchTerm = action as UpdateSearchTermAction;
            return {
                ...state,
                searchTerm: UpdateSearchTerm.searchTerm,
            }
    }
    return state
}

export default reducer