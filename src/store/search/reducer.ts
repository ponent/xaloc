import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IPodcastResult {
    platform: string;
    artistId: number;
    collectionId: number;
    trackId: string;
    kind: string;
    artistName: string;
    trackName: string;
    feedUrl: string;
    artworkUrl100: string;
    artworkUrl600: string;
    releaseDate: string;
    genres: Array<string>;
    trackCount: number;
}

const EmptyIPodcastResult = (): IPodcastResult => (
    {
        platform: "",
        artistId: 0,
        artistName: "",
        artworkUrl100: "",
        artworkUrl600: "",
        collectionId: 0,
        feedUrl: "",
        genres: [],
        kind: "",
        releaseDate: "",
        trackCount: 0,
        trackId: "",
        trackName: ""
    }
)

export interface PodcastDetail {
    info: IPodcastResult;
    podcasts: Array<PodcastEpisode>;
}

export interface ISearchState {
    searchModalOpen: boolean;
    searchResults: Array<IPodcastResult>;
    searchResultsLoading: boolean;
    searchTerm: string;
    searchTermLastSearch: string;
    drawerOpen: boolean;
    podcastDetailLoading: boolean;
    podcastDetailResults: PodcastDetail;
}

const initialState: ISearchState = {
    searchModalOpen: false,
    searchResults: [],
    searchResultsLoading: false,
    searchTerm: "",
    searchTermLastSearch: "",
    drawerOpen: false,
    podcastDetailLoading: false,
    podcastDetailResults: {
        info: EmptyIPodcastResult(),
        podcasts: []
    }
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

/*const reducer = (
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
    }
    return state
}*/

export const executeSearch = createAsyncThunk(
    'podcasts/search',
    async (searchTerm: string, { dispatch }) => {
        const results = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=podcast`)
        return { results: results.data.results, searchTerm: searchTerm } as { results: Array<IPodcastResult>; searchTerm: string; }
    }
)

export interface PodcastEpisode {
    trackId: string;
    episodeUrl: string;
    trackName: string;
    releaseDate: string;
    description: string;
    trackTimeMillis: number;
    artworkUrl600: string;
}

export const executePodcastSearch = createAsyncThunk(
    'podcasts/details',
    async (trackId: string/*, {dispatch}*/): Promise<PodcastDetail> => {
        //dispatch(openDrawer()) // I don't delete that to have an example on how to dispatch actions from thunks
        //const results = await axios.get(podcast.feedUrl)
        const results = await axios.get(`https://itunes.apple.com/lookup?id=${trackId}&media=podcast&entity=podcastEpisode&limit=100`)
        const podcastInfo = results.data.results.slice(0, 1)[0] as IPodcastResult
        const parsedResults = results.data.results.slice(1) as Array<PodcastEpisode>
        return {
            info: { ...podcastInfo, trackId: trackId as string, platform: "itunes" },
            podcasts: parsedResults
        } //.slice(1) // We remove the first element because iTunes gives information about the podcast but is not an episode
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
                podcastDetailLoading: true
            }
        },
        closeDrawer: (state: ISearchState) => {
            return {
                ...state,
                drawerOpen: false,
                podcastDetailResults: {
                    info: EmptyIPodcastResult(),
                    podcasts: []
                }
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
                .map((podcast: IPodcastResult) => {
                    const feedUrl = podcast.feedUrl !== undefined ? podcast.feedUrl.replace('http://', 'https://') : podcast.feedUrl
                    return {
                        ...podcast,
                        feedUrl: feedUrl,
                        platform: "itunes"
                    }
                })
            state.searchResultsLoading = false
            state.searchTermLastSearch = action.payload.searchTerm
            //state.loading = false
        })
        builder.addCase(executePodcastSearch.fulfilled, (state, action) => {
            // Add user to the state array
            state.podcastDetailResults = action.payload
            state.podcastDetailLoading = false
        })
        builder.addCase(executePodcastSearch.pending, (state, action) => {
            state.podcastDetailLoading = true
        })
    },
})

export const { openDrawer, closeDrawer } = searchSlice.actions

export default searchSlice.reducer