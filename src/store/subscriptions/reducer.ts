import { showNotification } from "@mantine/notifications";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddSubscription, EmptySubscriptions, GetSubscriptions, RemoveSubscription } from "../../repository/SubscriptionsRepository";
import { IPodcastResult } from "../search/reducer";

export interface ISubscriptionsState {
  podcasts: IPodcastResult[];
  podcastsLoaded: boolean;
}

const initialState: ISubscriptionsState = {
  podcasts: [],
  podcastsLoaded: false
}

export const loadSubscriptions = createAsyncThunk(
  'subscriptions/load',
  async (_, { dispatch }) => {
    const subscriptions = await GetSubscriptions()
    dispatch(loadPodcastSubscriptions(subscriptions))
  }
)

export const addSubscription = createAsyncThunk(
  'subscriptions/add',
  async (podcast: IPodcastResult, { dispatch }) => {
    await AddSubscription(podcast)
    const subscriptions = await GetSubscriptions()
    dispatch(loadPodcastSubscriptions(subscriptions))
    showNotification({
      title: 'Finalitzat!',
      message: `T'has subscrit correctament a ${podcast.trackName}!`
    })
  }
)

export const removeSubscription = createAsyncThunk(
  'subscriptions/remove',
  async (podcast: IPodcastResult, { dispatch }) => {
    await RemoveSubscription(podcast)
    const subscriptions = await GetSubscriptions()
    dispatch(loadPodcastSubscriptions(subscriptions))
    showNotification({
      title: `Finalitzat!`,
      message: `Has deixat d'estar subscrit a ${podcast.trackName}!`
    })
  }
)

export const emptySubscriptions = createAsyncThunk(
  'subscriptions/empty',
  async (_, { dispatch }) => {
    await EmptySubscriptions()
    const subscriptions = await GetSubscriptions()
    dispatch(loadPodcastSubscriptions(subscriptions))
    showNotification({
      title: `Finalitzat!`,
      message: `Totes les susbcripcions han sigut borrades.`
    })
  }
)

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    loadPodcastSubscriptions: (state: ISubscriptionsState, action: PayloadAction<IPodcastResult[]>) => {
      return {
        ...state,
        podcasts: action.payload.sort((a: IPodcastResult, b: IPodcastResult) => (
          (new Date(b.releaseDate).getTime()) - (new Date(a.releaseDate).getTime())
      )),
        podcastsLoaded: true
      }
    },
  },
})

export const { loadPodcastSubscriptions } = subscriptionsSlice.actions

export default subscriptionsSlice.reducer