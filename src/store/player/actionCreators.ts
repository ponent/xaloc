import * as actionTypes from "./actionTypes"
import {
    ChangeLoadingAudioAction,
    PlayAudioAction,
    ResumeAudioAction,
    StopAudioAction,
    UpdateAudioDurationAction,
    UpdateAudioProgressAction
} from "./reducer";
import {Dispatch} from "redux";

let audio = new Audio();

export function playAudio(url: string, title: string, icon: string) {
    const action: PlayAudioAction = {
        type: actionTypes.PLAY_AUDIO,
        title,
        url,
        duration: 0,
        icon
    }
    return doPlayAudio(action)
}

export function stopAudio() : StopAudioAction {
    return {
        type: actionTypes.STOP_AUDIO,
    }
}

export function startLoading() : ChangeLoadingAudioAction {
    return {
        type: actionTypes.UPDATE_LOADING,
        loading: true
    }
}

export function stopLoading() : ChangeLoadingAudioAction {
    return {
        type: actionTypes.UPDATE_LOADING,
        loading: false
    }
}

export function resumeAudio() : ResumeAudioAction{
    return {
        type: actionTypes.RESUME_AUDIO,
    }
}

export function updateDuration(duration: number|string) : UpdateAudioDurationAction{
    return {
        type: actionTypes.UPDATE_AUDIO_DURATION,
        duration: (duration === "Infinity" ? -1 : Number(duration))
    }
}

export function updateProgressAudio(progress: number) : UpdateAudioProgressAction {
    return {
        type: actionTypes.UPDATE_PROGRESS,
        progress,
    }
}

export const setProgressAudio = (seconds: number) => audio.currentTime = seconds

const LoggingEnabled = false

const doPlayAudio = (action: PlayAudioAction) => {
    return async (dispatch: Dispatch<any>) => {
        audio.pause()
        audio = new Audio(action.url)
        audio.ontimeupdate = (ev:Event) => {
            const audio : HTMLAudioElement | any = ev.target
            dispatch(updateProgressAudio(audio.currentTime))
        }
        dispatch(action)
        audio.onpause = (ev => dispatch(stopAudio()))
        audio.onplay = (ev => dispatch(resumeAudio()))
        audio.onerror = (ev => {
            if ( LoggingEnabled ) console.log("ERROR! " + ev)
            dispatch(stopAudio())
        })
        audio.oncanplay = (ev => {
            if ( LoggingEnabled ) console.log("CAN BE PLAYED!")
            dispatch(stopLoading())
        })
        audio.onstalled = ( async ev => {
            if ( LoggingEnabled ) console.log("onstalled!")
        })
        audio.ondurationchange = ( async ev => {
            if ( LoggingEnabled ) console.log("ondurationchange!")
            const targetAudio : HTMLAudioElement | any = ev.target
            dispatch(updateDuration(targetAudio.duration))
        })
        audio.onloadstart = (ev => {
            if ( LoggingEnabled ) console.log("onloadstart!")
            dispatch(startLoading())
        })
        audio.onloadeddata = (ev => {
            if ( LoggingEnabled ) console.log("onloadeddata!")
        })
        audio.onloadedmetadata = (ev => {
            if ( LoggingEnabled ) console.log("onloadedmetadata!")
        })
        await audio.play()
    }
}

export const doResumeAudio = async () => {
    await audio.play()
}

/*const doSetAudioProgress = (action: SetAudioProgressAction) => {
    return async (dispatch: DispatchType) => {
        audio.currentTime = action.progress
        dispatch(action)
    }
}*/

export const doStopAudio = () => {
    audio.pause()
}
