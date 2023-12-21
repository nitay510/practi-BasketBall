import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import subVideoModel from '../../Models/subVideoModel'
import { getEmptyVideo } from '../../services/subVideo.service'

export interface SelectedVideoState {
    video: subVideoModel
    videoPlayerRef: any
}

const initialState: SelectedVideoState = {
    video: getEmptyVideo(),
    videoPlayerRef: null
}

export const seletedVideoSlice = createSlice({
    name: 'SelectedVideoState',
    initialState,
    reducers: {
        setSelectedVideo: (state, action: PayloadAction<subVideoModel>) => {
           
            state.video = { ...action.payload }
        },
        setVideoState: (state, action: PayloadAction<boolean>) => {
            state.video = { ...state.video, isPlaying: action.payload }
        },
        setVideoPlayerRef: (state, action: PayloadAction<HTMLVideoElement>) => {
            state.videoPlayerRef = action.payload
        }
    },
})

export const { setSelectedVideo, setVideoState, setVideoPlayerRef } = seletedVideoSlice.actions

export default seletedVideoSlice.reducer