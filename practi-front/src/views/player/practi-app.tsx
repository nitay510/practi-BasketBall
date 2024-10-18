import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'firebase/messaging';
import { useLocation, useNavigate } from 'react-router-dom';
import { messaging } from '../../fireBase';
import { sendFcmToken } from '../../fetchFunctions/fetchFunctionsUser';
import VideoModel from '../../Models/VideoModel';
import { Header } from '../../cmps/headers/header';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { NavBar } from '../../cmps/nav-bar';
import { VideoList } from '../../cmps/video/video-list';
import { VideoPlayerLi } from '../../cmps/video-player-li';
import { startVideo, setSelectedVideo, setVideoState } from '../../store/slicers/selectedVideo.slice';
import { setVideos } from '../../store/slicers/videos.slice';
import { selectedVideoState, selectedVideosState } from '../../store/store';
import { getNextVideoInCategory, getVideos, getVideoByName } from '../../cmps/video/functions';
import { fetchLastDrill } from '../../fetchFunctions/fetchFunctionsPlayer';

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

export const PractiApp = ({
  token,
  setToken,
  firstname,
  setTopic,
  topic,
  loginStatus,
  setLoginStatus,
  lastLogin,
}: PractiViewProps): JSX.Element => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nextDrill, setNextDrill] = useState<VideoModel | null>(null);
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
    const fetchData = async () => {
      await loadVideos();
    };
    setToken(localStorage.getItem('authToken'));
    fetchData();
  }, [filterBy]);

  useEffect(() => {
    if (!drillToDo) {
      findLastDrill();
    }
  }, [token]);

  useEffect(() => {
    if (!loginStatus) {
      navigate('/');
    }
  }, [loginStatus]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permissionGranted = localStorage.getItem('notificationsGranted');

        if (!permissionGranted) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Get FCM token
            const vapidKey = 'BPVVffu9hkSGUvIQ2j12xoaVcAHc9C4da3ybDGpha0HPKMoT6q_tjITl-ekDBfL387vXZqxEzbbFuGi9MIZcAvg';
            const fcmToken = await getToken(messaging, { vapidKey });
            console.log('FCM Token:', fcmToken);

            // Send the token to the backend
            await sendFcmToken(localStorage.getItem('userName'), fcmToken);

            // Mark permission as granted in localStorage
            localStorage.setItem('notificationsGranted', 'true');
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    if (isFirstLoad && loginStatus && !localStorage.getItem('notificationsGranted')) {
      requestNotificationPermission();
    }
  }, [token]);

  const loadVideos = async () => {
    try {
      const fetchedVideos = await getVideos(filterBy, token);
      dispatch(setVideos(fetchedVideos));
      if (!isFirstLoad) {
        dispatch(setSelectedVideo(fetchedVideos[0]));
      } else {
        setIsFirstLoad(false);
        if (drillToDo) {
          const videoToDo = await getVideoByName(drillToDo);
          if (videoToDo) {
            dispatch(setSelectedVideo(videoToDo));
            setTimeout(() => {
              onSetVideoStatus(true);
              dispatch(startVideo());
            }, 1500);
          }
        } else if (nextDrill) {
          dispatch(setSelectedVideo(nextDrill));
        } else {
          dispatch(setSelectedVideo(fetchedVideos[0]));
        }
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const onSetVideoStatus = (isPlaying: boolean): void => {
    dispatch(setVideoState(isPlaying));
  };

  const findLastDrill = async () => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      const lastDrillData = await fetchLastDrill(storedToken);
      if (lastDrillData) {
        const { drillName, topic } = lastDrillData;
        const nextVideo = await getNextVideoInCategory(topic, drillName, token);
        if (nextVideo) {
          setNextDrill(nextVideo);
          setIsFirstLoad(true);
          setTopic(topic);
          setFilterBy(topic);
        } else {
          setNextDrill(null);
        }
      }
    } catch (error) {
      console.error('Error finding last drill:', error);
    }
  };

  if (!videos.length) return <></>;

  return (
    <div className="practi-app">
      <div className="content-container">
        <Header setLoginStatus={setLoginStatus} />
        <section ref={navBarRef}>
          <NavBar setTopic={setTopic} topic={topic} setFilterBy={setFilterBy} />
          <div className="video-container">
            <h2>About this class</h2>
            <VideoPlayerLi onSetVideoStatus={onSetVideoStatus} />
            <div ref={ctaBarContainerRef}>
              <VideoList
                onSetVideoStatus={onSetVideoStatus}
                onSetVideo={(video) => dispatch(setSelectedVideo(video))}
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
    </div>
  );
};
