import { createSlice } from '@reduxjs/toolkit';
import subVideoModel from '../../Models/subVideoModel';
import { getEmptyVideo } from '../../services/subVideo.service';

export interface SubVideosState {
  videos: subVideoModel[]; // Rename the property to 'videos'
}

const initialState: SubVideosState = {
  videos: [], // Initialize 'videos' as an empty array
};

export const subVideosSlice = createSlice({
  name: 'subVideos',
  initialState,
  reducers: {
    setSubVideos: (state, action) => {
      state.videos = action.payload; // Update 'videos' in the state
    },
  },
});

export const { setSubVideos } = subVideosSlice.actions;

export default subVideosSlice.reducer;
