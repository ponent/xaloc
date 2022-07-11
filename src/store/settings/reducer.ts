import { showNotification } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetSubscriptions, RestoreBackup } from "../../repository/SubscriptionsRepository";
import { IPodcastResult } from "../search/reducer";
import { loadPodcastSubscriptions } from "../subscriptions/reducer";

export interface ISettingsBackups {
  uploadModalOpen: boolean;
}

export interface ISettingsState {
  backups: ISettingsBackups;
}

const initialState: ISettingsState = {
  backups: {
    uploadModalOpen: false
  }
}

export const restoreBackup = createAsyncThunk(
  'settings/restore',
  async (file: File, { dispatch }) => {
    const content = await file.text()
    const subscriptions : IPodcastResult[] = JSON.parse(content)
    await RestoreBackup(subscriptions)
    const loadedSubscriptions = await GetSubscriptions()
    dispatch(loadPodcastSubscriptions(loadedSubscriptions))
    dispatch(closeUploadDialog())
    showNotification({
      title: `Finalitzat!`,
      message: `La còpia de seguretat restaurat correctament ${subscriptions.length} podcasts`
    })
  }
)

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    openUploadDialog: (state: ISettingsState) => {
      return {
        ...state,
        backups: {
          ...state.backups,
          uploadModalOpen: true
        }
      }
    },
    closeUploadDialog: (state: ISettingsState) => {
      return {
        ...state,
        backups: {
          ...state.backups,
          uploadModalOpen: false
        }
      }
    },
  },
})

export const { openUploadDialog, closeUploadDialog } = settingsSlice.actions

export default settingsSlice.reducer