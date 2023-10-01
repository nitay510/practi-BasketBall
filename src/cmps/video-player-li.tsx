import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoModel from "../Models/VideoModel";
import { setVideoPlayerRef, setVideoState } from "../store/slicers/selectedVideo.slice";
import { selectedVideoState } from "../store/store";

interface VideoPlayerProps {
    onSetVideoStatus: (isPlaying: boolean) => void

}
export const VideoPlayerLi = ({ onSetVideoStatus }: VideoPlayerProps) => {

    const selectedVideo = useSelector(selectedVideoState)

    const videoRef = useRef<HTMLVideoElement>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setVideoPlayerRef(videoRef.current))
    }, [])

    return (
        <div className='video-player'>
            <video
                src={selectedVideo.url}
                className="video-player"
                controls
                onPlay={() => onSetVideoStatus(true)}
                onPause={() => onSetVideoStatus(false)}
                ref={videoRef}
                autoPlay
            />
        </div>
    );
};