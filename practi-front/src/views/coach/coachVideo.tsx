import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoModel from '../../Models/VideoModel';
import { NavBar } from '../../cmps/nav-bar';
import { VideoListCoach } from '../../cmps/video/video-list-coach';
import { VideoPlayerLi } from '../../cmps/video-player-li';
import {  getVideos } from '../../cmps/video/functions';
import { setVideos } from '../../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../../store/slicers/selectedVideo.slice';
import { selectedVideoState, selectedVideosState } from '../../store/store';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';

interface CoachVideoProps {
  token: string;
  topic: string;
  setTopic: (topic: string) => void;
  setLoginStatus:(isLogin: boolean) => void;
}

export const CoachVideo = ({ token,  setTopic, topic,setLoginStatus }: CoachVideoProps): JSX.Element => {
  // State
  const videos = useSelector(selectedVideosState);
  const [filterBy, setFilterBy] = useState("כדרור");
  const selectedVideo = useSelector(selectedVideoState);
  const navBarRef = useRef<null | HTMLDivElement>(null);
  const ctaBarContainerRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data on component mount or when filterBy or token changes
    const fetchData = async () => {
      setFilterBy(topic);
      await loadVideos();
    };

    fetchData();
  }, [filterBy, token,]);




  const loadVideos = async () => {
    // Fetch videos based on filterBy and set them in the Redux store
    const fetchedVideos = await getVideos(filterBy, token);
    dispatch(setVideos(fetchedVideos));
    dispatch(setSelectedVideo(fetchedVideos[0]));
  };

  const onSetVideoStatus = (isPlaying: boolean): void => {
    // Set video playing status in Redux store
    dispatch(setVideoState(isPlaying));
  };

  const onSetVideo = (video: VideoModel): void => {
    // Set selected video in Redux store
    dispatch(setSelectedVideo(video));
  };


  if (!videos.length) return <></>;

  return (
    <div className='practi-app'>
      <div className='content-container'>
        <HeaderThree/>
        <section ref={navBarRef}>
          <NavBar setTopic={setTopic} topic={topic} setFilterBy={setFilterBy} />
          <div className='video-container'>
            <h2>About this class</h2>
            <VideoPlayerLi onSetVideoStatus={onSetVideoStatus} />
            <div ref={ctaBarContainerRef}>
              <VideoListCoach
                onSetVideoStatus={onSetVideoStatus}
                onSetVideo={onSetVideo}
                videos={videos}
                selectedVideo={selectedVideo}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager  />
      </div>
    </div>
  );
};
