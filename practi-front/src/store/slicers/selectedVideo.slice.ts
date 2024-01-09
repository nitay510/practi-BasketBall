import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import VideoModel from '../../Models/VideoModel'
import { getEmptyVideo } from '../../services/video.service'

export interface SelectedVideoState {
    video: VideoModel
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
        setSelectedVideo: (state, action: PayloadAction<VideoModel>) => {
           
            state.video = { ...action.payload }
        },
        setVideoState: (state, action: PayloadAction<boolean>) => {
            state.video = { ...state.video, isPlaying: action.payload }
        },
        setVideoPlayerRef: (state, action: PayloadAction<HTMLIFrameElement>) => {
            state.videoPlayerRef = action.payload
        }
    },
})

export const { setSelectedVideo, setVideoState, setVideoPlayerRef } = seletedVideoSlice.actions

export default seletedVideoSlice.reducer