import { configureStore } from '@reduxjs/toolkit'
import videosReducer from './slicers/videos.slice'
import slectedVideoReducer, { setVideoPlayerRef } from './slicers/selctedSubVideo.slice'

import subVideosReducer from './slicers/subVideos.slice'; // Import the new subVideos slice

export const store = configureStore({
  reducer: {
    videos: subVideosReducer,
    selectedVideo: slectedVideoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>


export const selectedVideosState = (state: RootState) => state.videos.videos

export const selectedVideoState = (state: RootState) => state.selectedVideo.video
export const videoElState = (state: RootState) => state.selectedVideo.videoPlayerRef


export type AppDispatch = typeof store.dispatch