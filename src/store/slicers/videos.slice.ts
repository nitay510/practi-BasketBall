import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import VideoModel from '../../Models/VideoModel'

export interface VideosState {
    videos: VideoModel[]
}

const initialState: VideosState = {
    videos: [],
}

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideos: (state, action: PayloadAction<VideoModel[]>) => {
            state.videos = [...action.payload]
        },
    },
})

export const { setVideos } = videosSlice.actions

export default videosSlice.reducer