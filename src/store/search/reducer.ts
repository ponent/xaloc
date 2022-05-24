import * as actionTypes from "./actionTypes"
import { ReduxAction } from "../../type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { updateExternalModuleReference } from "typescript";

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
    drawerOpen: boolean;
    drawerLoading: boolean;
    drawerContentType: string;
    drawerContentUrl: string;
    drawerContent: Array<PodcastEpisode>;
}

const initialState: ISearchState = {
    searchModalOpen: false,
    searchResults: [],
    searchResultsLoading: false,
    searchTerm: "",
    searchTermLastSearch: "",
    drawerOpen: false,
    drawerLoading: false,
    drawerContentUrl: "",
    drawerContentType: "",
    drawerContent: []
}

export type UpdateSearchResultsAction = {
    type: string,
    searchResults: Array<IPodcastResult>
}

export type UpdateSearchTermAction = {
    type: string,
    searchTerm: string
}

export type OpenDrawerWithPodcastAction = {
    type: string,
    contentType: string,
    url: string
}

export type CloseSearchDrawerAction = {
    type: string
}

const reducer = (
    state: ISearchState = initialState,
    action: ReduxAction
): ISearchState => {
    switch (action.type) {
        case actionTypes.SEARCH__UPDATE_SEARCH_TERM:
            const UpdateSearchTerm = action as UpdateSearchTermAction;
            return {
                ...state,
                searchTerm: UpdateSearchTerm.searchTerm,
            }
        /*case actionTypes.SEARCH__OPEN_DRAWER:
            const OpenDrawerWithPodcast = action as OpenDrawerWithPodcastAction;
            return {
                ...state,
                drawerOpen: true,
                drawerContentType: OpenDrawerWithPodcast.contentType,
                drawerContentUrl: OpenDrawerWithPodcast.url
            }*/
        case actionTypes.SEARCH__CLOSE_DRAWER:
            //const CloseSearchDrawer = action as CloseSearchDrawerAction;
            return {
                ...state,
                drawerOpen: false,
                drawerContentType: "",
                drawerContentUrl: ""
            }
    }
    return state
}

export const executeSearch = createAsyncThunk(
    'podcasts/search',
    async (searchTerm: string, { dispatch }) => {
        const results = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=podcast`)
        return { results: results.data.results, searchTerm: searchTerm } as { results: Array<IPodcastResult>; searchTerm: string; }
    }
)

export interface PodcastEpisode {
    trackId: number;
    episodeUrl: string;
    trackName: string;
    releaseDate: string;
    description: string;
    trackTimeMillis: number;
    artworkUrl600: string;
}

export const executePodcastSearch = createAsyncThunk(
    'podcasts/details',
    async (podcast: IPodcastResult, {dispatch}) => {
        dispatch(openDrawer())
        //const results = await axios.get(podcast.feedUrl)
        const results = await axios.get(`https://itunes.apple.com/lookup?id=${podcast.trackId}&media=podcast&entity=podcastEpisode&limit=100`)
        const parsedResults = results.data.results as Array<PodcastEpisode>
        console.log(parsedResults)
        return parsedResults.slice(1) // We remove the first element because iTunes gives information about the podcast but is not an episode
    }
  )

export const searchSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        openDrawer: (state: ISearchState) => {
            return {
                ...state,
                drawerOpen: true,
                drawerLoading: true
            }
          },
          closeDrawer: (state: ISearchState) => {
            return {
                ...state,
                drawerOpen: false,
                drawerContent: []
            }
          },
        /*updateSearchResults: (state: ISearchState, action: PayloadAction<Array<IPodcastResult>>) => {
            return {
                ...state,
                searchResults: action.payload.sort((a: IPodcastResult, b: IPodcastResult) => (
                    (new Date(b.releaseDate).getTime()) - (new Date(a.releaseDate).getTime())
                )),
                searchResultsLoading: false,
                searchTermLastSearch: state.searchTerm
            }
        }*/
        /*increment: (state) => {
          state.value += 1
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.loading = action.payload
        },
        decrement: (state) => {
          state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.value += action.payload
        },*/
    },
    extraReducers: (builder) => {
        /*// Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
          // Add user to the state array
          state.user = action.payload
          state.loading = false
        })*/
        builder.addCase(executeSearch.fulfilled, (state, action) => {
            // Add user to the state array
            state.searchResults = action.payload.results
            .sort((a: IPodcastResult, b: IPodcastResult) => (
                (new Date(b.releaseDate).getTime()) - (new Date(a.releaseDate).getTime())
            ))
            .map((podcast: IPodcastResult) => ({...podcast, feedUrl: podcast.feedUrl.replace('http://','https://')}))
            state.searchResultsLoading = false
            state.searchTermLastSearch = action.payload.searchTerm
            //state.loading = false
        })
        builder.addCase(executePodcastSearch.fulfilled, (state, action) => {
            console.log("----")
            console.log(action.payload)
            // Add user to the state array
            state.drawerContent = action.payload
            state.drawerLoading = false
        })
    },
})

export const { openDrawer, closeDrawer } = searchSlice.actions

export default searchSlice.reducer