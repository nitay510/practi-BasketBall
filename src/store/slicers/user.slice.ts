import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import VideoModel from '../../Models/VideoModel'
import { getEmptyVideo } from '../../services/video.service'

export interface VideoState {
    video: VideoModel
}

const initialState: VideoState = {
    video: getEmptyVideo()
}

export const videosSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideos: (state, action: PayloadAction<VideoModel>) => {
            state.video = { ...action.payload }
        },
    },
})

export const { setVideos } = videosSlice.actions

export default videosSlice.reducer
