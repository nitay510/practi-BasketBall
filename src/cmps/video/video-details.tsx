import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// models
import VideoModel from "../../Models/VideoModel"
// cmps

import { SubVideoList } from './subVideo-list';
import { VideoPlayerLi } from '../video-player-li';
// services
import { getSubVideos } from '../../services/subVideo.service';
// store
import { setSelectedVideo, setVideoState } from '../../store/slicers/selectedVideo.slice';
import { selectedVideoState, selectedVideosState } from '../../store/store';
export const VideoDetails = (props: { filterBy: any; }) => {
    // Local state using useState for videos
    const [isVideoModal, setIsVideoModal] = useState(false);
    const [newList, setNewList] = useState(false)
    const [videos, setVideos] = useState<VideoModel[]>([]); // Initialize local videos state with an empty array

    // Refs using useRef
    const videoRef = useRef<null | HTMLVideoElement>();
    const navBarRef = useRef<null | HTMLDivElement>(null);

    // Redux state using useSelector for selectedVideo
    const selectedVideo = useSelector(selectedVideoState);

    // Redux dispatch function
    const dispatch = useDispatch();

    // Params using props.filterBy
    const filter = props.filterBy;
    console.log(filter);
    console.log(props.filterBy);

    // useEffect for side effects
    useEffect(() => {
        // Call your async function inside useEffect
        loadVideos();
    }, [filter]);

    // Async function to load videos
    const loadVideos = async () => {
        try {
            const fetchedVideos = await getSubVideos(filter);
            console.log("Fetched videos:", fetchedVideos);

            // Update the local videos state with the fetched data
            setVideos(fetchedVideos);

        
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    // Callback function example
    const onSetVideoStatus = (isPlaying: boolean): void => {
        dispatch(setVideoState(isPlaying));
    };

    // Another callback function example
    const onSetVideo = (video: VideoModel): void => {
        dispatch(setSelectedVideo(video));
    };

    // Toggle modal state
    const onToggleVidModal = () => {
        setIsVideoModal((prevState) => !prevState);
    };
    
    return (
        <div className='video-container'>
            <SubVideoList
                onSetVideoStatus={onSetVideoStatus}
                videoRef={videoRef.current}
                onSetVideo={onSetVideo}
                videos={videos} // Use the local videos state
                selectedVideo={selectedVideo} // Use the Redux selectedVideo state
            />
        </div>
    )
}