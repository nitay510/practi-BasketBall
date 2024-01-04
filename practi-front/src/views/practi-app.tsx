import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoModel from '../Models/VideoModel';
import { Header } from '../cmps/header';
import { CtaOpen } from '../cmps/cta/cta-open';
import { CtaBar } from '../cmps/cta/cta-bar';
import { NavBar } from '../cmps/nav-bar';
import { VideoList } from '../cmps/video/video-list';
import { VideoPlayerLi } from '../cmps/video-player-li';
import { getNextCategory, getNextVideoInCategory, getVideos } from '../cmps/video/functions';
import { setVideos } from '../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../store/slicers/selectedVideo.slice';
import { selectedVideoState, selectedVideosState } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface PractiViewProps {
  token: string;
  firstname: string;
  topic: string;
  setTopic: (topic: string) => void;
  loginStatus: boolean;
  setLoginStatus:(isLogin: boolean) => void;
}

export const PractiApp = ({ token, firstname, setTopic, topic, loginStatus,setLoginStatus }: PractiViewProps): JSX.Element => {
  // State
  const [latestDrillName, setLatestDrillName] = useState('');
  const [nextDrill, setNextDrill] = useState<VideoModel | null>(null);
  const [nextDrillTopic, setNextDrillTopic] = useState("כדרור");
  const videos = useSelector(selectedVideosState);
  const [filterBy, setFilterBy] = useState("כדרור");
  const selectedVideo = useSelector(selectedVideoState);
  const navBarRef = useRef<null | HTMLDivElement>(null);
  const ctaBarContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data on component mount or when filterBy or token changes
    const fetchData = async () => {
      setFilterBy(topic);
      await findLastDrill();
      await loadVideos();
    };

    fetchData();
  }, [filterBy, token,]);


  useEffect(() => {
    // Redirect to login page when loginStatus is false
    if (loginStatus === false) {
      navigate('/');
    }
  }, [loginStatus]);

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

  const findLastDrill = async () => {
    // Fetch information about the last drill
    const getUserResponse = await fetch(`https://practi-web.onrender.com/api/LastDrill/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (getUserResponse.ok&&getUserResponse.json!=null) {
      const userJson = await getUserResponse.json();
      const { drillName, topic } = userJson;
      setLatestDrillName(drillName);
      const nextVideo = getNextVideoInCategory(topic, drillName, token);
      if (await nextVideo) {
        setNextDrill(await nextVideo);
        setNextDrillTopic(topic);
      } else {
        const newCategory = getNextCategory(topic, token);
        setNextDrillTopic(await newCategory);
        setNextDrill(await getNextVideoInCategory(await newCategory, null, token));
      }
    } else {
      setNextDrill(await getNextVideoInCategory(nextDrillTopic, null, token));
    }
  };

  if (!videos.length) return <></>;

  return (
    <div className='practi-app'>
      <div className='content-container'>
        <Header 
        setLoginStatus={setLoginStatus}/>
        <CtaOpen
          token={token}
          firstname={firstname}
          latestDrillName={latestDrillName}
          nextDrillName={nextDrill ? nextDrill.title : ''}
          nextDrillTopic={nextDrillTopic}
          setTopic={setTopic}
          nextDrill={nextDrill}
          ctaBarContainerRef={ctaBarContainerRef}
        />
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
        <CtaBar  />
      </div>
    </div>
  );
};
