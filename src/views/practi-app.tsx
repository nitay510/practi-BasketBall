
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// models
import VideoModel from '../Models/VideoModel';
// cmps
import { Header } from '../cmps/header';
import { Cta } from '../cmps/cta/cta';
import { NavBar } from '../cmps/nav-bar';
import { VideoModal } from '../cmps/video-modal';
import { VideoList } from '../cmps/video/video-list';
import { VideoPlayerLi } from '../cmps/video-player-li';
// services
import { getVideos } from '../services/video.service';
// store

import { setVideos } from '../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../store/slicers/selectedVideo.slice';
import { selectedVideoState, selectedVideosState } from '../store/store';

// todo: change state. in sliceers


export function PractiApp(): JSX.Element {
    //state
    const [isVideoModal, setIsVideoModal] = useState(false)
    const videos = useSelector(selectedVideosState)
    const selectedVideo = useSelector(selectedVideoState)
    const [newList, setNewList] = useState(false)
    //refs
    const videoRef = useRef<null | HTMLVideoElement>()
    const navBarRef = useRef<null | HTMLDivElement>(null)

    const dispatch = useDispatch()
    const { filterBy } = useParams()

    useEffect(() => {
        loadVideos()
    }, [filterBy,])


    const loadVideos = async () => {
        const videos = await getVideos(filterBy)
        dispatch(setVideos(videos))
        dispatch(setSelectedVideo(null))
        setNewList(false)
    }

    const onSetVideoStatus = (isPlaying: boolean): void => {
        dispatch(setVideoState(isPlaying))
    }

    const onSetVideo = (video: VideoModel): void => {
        dispatch(setSelectedVideo(video))
    }

    const onToggleVidModal = () => {
        setIsVideoModal((prevState) => !prevState)
    }

    const handleClickScroll = () => {
        if (navBarRef.current) {
            navBarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };



    if (!videos.length) return <></>
    return (
        <div className='practi-app'>
            <Header />
            <Cta
                handleClickScroll={handleClickScroll}
                onToggleVidModal={onToggleVidModal} />

            <section ref={navBarRef} >
                <NavBar />
                <div className='video-container'>
                    <h2>About this class</h2>
                    <VideoPlayerLi onSetVideoStatus={onSetVideoStatus} />
                    <VideoList
                        onSetVideoStatus={onSetVideoStatus}
                        videoRef={videoRef.current}
                        onSetVideo={onSetVideo}
                        videos={videos}
                        selectedVideo={selectedVideo}
                        newList={newList}
                        setNewList={setNewList}
                    />
                </div>
            </section>


            {/* optional modal */}
            {
                isVideoModal && <VideoModal
                    onToggleVidModal={onToggleVidModal}
                    test={'test'}
                />
            }
        </div >

    )
}