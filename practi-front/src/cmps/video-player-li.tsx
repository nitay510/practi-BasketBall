import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPlayerRef, setVideoState } from "../store/slicers/selectedVideo.slice";
import { selectedVideoState } from "../store/store";

interface VideoPlayerProps {
    onSetVideoStatus: (isPlaying: boolean) => void

}
export const VideoPlayerLi = ({ onSetVideoStatus }: VideoPlayerProps) => {

    const selectedVideo = useSelector(selectedVideoState)

    const videoRef = useRef<HTMLIFrameElement>(); // Change the type to HTMLIFrameElement
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setVideoPlayerRef(videoRef.current))
    }, [])

    return (
        <div className='video-player'>
       <iframe
        title="YouTube Video"
        width="100%"
        height="100%"
        src={selectedVideo.url}
        frameBorder="0"
        allowFullScreen
        ref={(ref) => (videoRef.current = ref)}
      />
    </div>
    );
};