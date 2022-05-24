import { Action, AnyAction } from "redux";
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as actionTypes from "./actionTypes"
import {
    CloseSearchDrawerAction,
    IPodcastResult,
    OpenDrawerWithPodcastAction,
    UpdateSearchResultsAction,
    UpdateSearchTermAction
} from "./reducer";
import { store } from "../../store";

export function updateSearchResults(results: Array<IPodcastResult>): UpdateSearchResultsAction {
    return {
        type: actionTypes.SEARCH__UPDATE_RESULTS,
        searchResults: results
    }
}

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
    alert("BBB!")
    return {
        type: actionTypes.SEARCH__CLOSE_DRAWER,
        loading: loading
    }
}

type StoreType = typeof store;
type AppDispatch = StoreType['dispatch'];

type Config = {
    dispatch: AppDispatch;
};

const thunkSetLoadingAction = createAsyncThunk<any, void, Config>(
    'prefix',
    () => {
        return Promise.resolve([]);
    }
);

//export const thunkSetLoadingAction = (loading: boolean): ThunkAction<void, RootState, unknown, SetLoadingDrawerAction> =>
/*export const thunkSetLoadingAction = (loading: boolean): createAsyncThunk =>
  async dispatch => {
      alert("AAA!")
    //const asyncResp = await exampleAPI()
    dispatch(
      setLoadingAction(loading)
    )
  }*/
