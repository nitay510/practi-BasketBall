import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPlayerRef, setVideoState } from "../store/slicers/selectedVideo.slice";
import { selectedVideoState } from "../store/store";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  onSetVideoStatus: (isPlaying: boolean) => void;
}

export const VideoPlayerLi = ({ onSetVideoStatus }: VideoPlayerProps) => {
  const selectedVideo = useSelector(selectedVideoState);
  const dispatch = useDispatch();

  const onPlayerStateChange = (event: any) => {
    // Handle player state changes
    const isPlaying = event.data === 1; // 1 corresponds to PLAYING state
    dispatch(setVideoState(isPlaying));
    onSetVideoStatus(isPlaying);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0, // Set to 1 for autoplay
    },
  };

  const onReady = (event: any) => {
    // Save the player reference in the Redux store
    dispatch(setVideoPlayerRef(event.target));
  };

  return (
    <div className="video-player">
      <YouTube
        videoId={selectedVideo.url} 
        opts={opts}
        onReady={onReady}
        onStateChange={onPlayerStateChange}
      />
    </div>
  );
};
