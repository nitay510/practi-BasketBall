import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoModel from '../../Models/VideoModel';
import { Header } from '../../cmps/headers/header';
import { useLocation } from 'react-router-dom';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { NavBar } from '../../cmps/nav-bar';
import { VideoList } from '../../cmps/video/video-list';
import { VideoPlayerLi } from '../../cmps/video-player-li';
import {  startVideo } from '../../store/slicers/selectedVideo.slice';
import {  getNextVideoInCategory, getVideos, getVideoByName } from '../../cmps/video/functions';
import { setVideos } from '../../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../../store/slicers/selectedVideo.slice';
import { selectedVideoState, selectedVideosState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface PractiViewProps {
  token: string;
  setToken: (token: string) => void;
  firstname: string;
  topic: string;
  setTopic: (topic: string) => void;
  loginStatus: boolean;
  setLoginStatus: (isLogin: boolean) => void;
  lastLogin: Date;
}

export const PractiApp = ({ token, setToken, firstname, setTopic, topic, loginStatus, setLoginStatus, lastLogin }: PractiViewProps): JSX.Element => {
  // State
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nextDrill, setNextDrill] = useState<VideoModel | null>(null);
  const [nextDrillTopic, setNextDrillTopic] = useState("כדרור");
  const videos = useSelector(selectedVideosState);
  const [filterBy, setFilterBy] = useState(topic);
  const selectedVideo = useSelector(selectedVideoState);
  const navBarRef = useRef<null | HTMLDivElement>(null);
  const ctaBarContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { drillToDo } = location.state || {};

  useEffect(() => {
    // Fetch data on component mount or when filterBy or token changes
    const fetchData = async () => {
      await loadVideos();
    };
    fetchData();
  }, [filterBy]);

  useEffect(() => {
    if (!drillToDo) {
      findLastDrill();
    }
  }, [token]);

  useEffect(() => {
    // Redirect to login page when loginStatus is false
    if (loginStatus === false) {
      navigate('/');
    }
  }, [loginStatus]);

  const loadVideos = async () => {
    console.log('loadVideos')
    try {
      // Fetch videos based on filterBy and set them in the Redux store
      const fetchedVideos = await getVideos(filterBy, token);
      dispatch(setVideos(fetchedVideos));
      if (!isFirstLoad) {
        console.log('not first load');
        dispatch(setSelectedVideo(fetchedVideos[0]));
      } else {
        setIsFirstLoad(false);
        if (drillToDo) {
          // Fetch the video by name asynchronously
          const videoToDo = await getVideoByName(drillToDo);
          // Ensure the video is found before setting nextDrill
          if (videoToDo) {
            dispatch(setSelectedVideo(videoToDo));
            setTimeout(() => {
              onSetVideoStatus(true);
              dispatch(startVideo()); // Dispatch the startVideo action
            }, 1500);
          } else {
            console.log('Video not found');
          }
        } else {
          if (nextDrill) {
            dispatch(setSelectedVideo(nextDrill));
          } else {   
            console.log('NextDrill is null or undefined');
            dispatch(setSelectedVideo(fetchedVideos[0]));
          }
        }
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const onSetVideoStatus = (isPlaying: boolean): void => {
    // Set video playing status in Redux store
    dispatch(setVideoState(isPlaying));
  };

  const onSetVideo = (video: VideoModel): void => {
    // Set selected video in Redux store
    dispatch(setSelectedVideo(video));
  };

  const findLastDrill = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      // Fetch information about the last drill
      const getUserResponse = await fetch(`http://localhost:5000/api/LastDrill/`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      });
      if (getUserResponse.ok) {
        const userJson = await getUserResponse.json();
        const { drillName, topic } = userJson;
        const nextVideo = await getNextVideoInCategory(topic, drillName, token);
        if (nextVideo) {
          setNextDrill(nextVideo);
          setIsFirstLoad(true);
          setTopic(topic);
          setFilterBy(topic);
        } else {
          setNextDrill(null);
        }
      } else {
        setNextDrill(null);
      }
    } catch (error) {
      console.error('Error finding last drill:', error);
    }
  };

  if (!videos.length) return <></>;

  return (
    <div className='practi-app'>
      <div className='content-container'>
        <Header setLoginStatus={setLoginStatus} />
        <section ref={navBarRef}>
          <NavBar setTopic={setTopic} topic={topic} setFilterBy={setFilterBy} />
          <div className='video-container'>
            <h2>About this class</h2>
            <VideoPlayerLi onSetVideoStatus={onSetVideoStatus} />
            <div ref={ctaBarContainerRef}>
              <VideoList
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
        <CtaBar />
      </div>
      <div className="cta-bar-container">
        <CtaBar />
      </div>
    </div>
  );
};
