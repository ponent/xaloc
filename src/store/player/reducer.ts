import * as actionTypes from "./actionTypes"
import {ReduxAction} from "../../type";

export interface IPlayerState {
    url: string,
    playing: boolean,
    loading: boolean,
    title: string,
    progress: number,
    duration: number,
    icon: string
}

const initialState: IPlayerState = {
    url: "",
    playing: false,
    loading: false,
    title: "",
    progress: 0,
    duration: 0,
    icon: ""
}

export type PlayAudioAction = {
    type: string
    url: string
    title: string
    duration: number
    icon: string
}

export type StopAudioAction = {
    type: string
}

export type ResumeAudioAction = {
    type: string
}

export type ChangeLoadingAudioAction = {
    type: string,
    loading: boolean
}

export type SetAudioProgressAction = {
    type: string,
    progress: number
}

export type UpdateAudioDurationAction = {
    type: string,
    duration: number
}

export type UpdateAudioProgressAction = {
    type: string,
    progress: number
}

const reducer = (
    state: IPlayerState = initialState,
    action: ReduxAction
): IPlayerState => {
    switch (action.type) {
        case actionTypes.PLAY_AUDIO:
            const PlayAudio = action as PlayAudioAction;
            return {
                ...state,
                url: PlayAudio.url,
                playing: true,
                title: PlayAudio.title,
                duration: PlayAudio.duration,
                icon: PlayAudio.icon
            }
        case actionTypes.STOP_AUDIO:
            return {
                ...state,
                playing: false
            }
        case actionTypes.RESUME_AUDIO:
            return {
                ...state,
                playing: true
            }
        case actionTypes.UPDATE_AUDIO_DURATION:
            const UpdateAudioDuration = action as UpdateAudioDurationAction;
            return {
                ...state,
                duration: UpdateAudioDuration.duration
            }
        case actionTypes.UPDATE_LOADING:
            const ChangeLoadingAudio = action as ChangeLoadingAudioAction;
            return {
                ...state,
                loading: ChangeLoadingAudio.loading
            }
        case actionTypes.UPDATE_PROGRESS:
            const UpdateAudioProgress = action as UpdateAudioProgressAction;
            return {
                ...state,
                progress: UpdateAudioProgress.progress
            }
        case actionTypes.SET_PROGRESS:
            const SetAudioProgress = action as SetAudioProgressAction;
            return {
                ...state,
                progress: SetAudioProgress.progress
            }
    }
    return state
}

export default reducer