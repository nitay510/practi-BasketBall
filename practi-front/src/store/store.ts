import { configureStore } from '@reduxjs/toolkit'
import videosReducer from './slicers/videos.slice'
import slectedVideoReducer, { setVideoPlayerRef } from './slicers/selectedVideo.slice'



export const store = configureStore({
    reducer: {
        videos: videosReducer,
        selectedVideo: slectedVideoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>


export const selectedVideosState = (state: RootState) => state.videos.videos

export const selectedVideoState = (state: RootState) => state.selectedVideo.video
export const videoElState = (state: RootState) => state.selectedVideo.videoPlayerRef


// export const selectesVideos = (state: RootState) => state.videos.videos
// export const selectedVideo = (state: RootState) => state.selectedVideo.video
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch