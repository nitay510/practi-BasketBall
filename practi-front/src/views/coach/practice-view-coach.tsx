import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import subVideoModel from '../../Models/subVideoModel';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { SubVideoList } from '../../cmps/video/subVideo-list';
import { VideoPlayerLi } from '../../cmps/video-player-li';
import { getSubVideos } from '../../cmps/video/functions';
import { setVideos } from '../../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../../store/slicers/selctedSubVideo.slice';
import { selectedVideoState, selectedVideosState } from '../../store/storeSub';

interface practiceViewCoachProps {
  token: string;
  topic: string;
}

export const PracticeViewCoach = ({ token, topic }: practiceViewCoachProps): JSX.Element => {
  // State
  const videos = useSelector(selectedVideosState);
  const selectedVideo = useSelector(selectedVideoState);

  // Refs
  const videoRef = useRef<null | HTMLVideoElement>();
  const dispatch = useDispatch();
  const { Drill } = useParams();

  // Load videos when the component mounts
  useEffect(() => {
    const loadVideos = async () => {
      const fetchedVideos = await getSubVideos(Drill, token);
      dispatch(setVideos(fetchedVideos));
      dispatch(setSelectedVideo(fetchedVideos[0]));
    };
    loadVideos();
  }, [Drill, dispatch]);

  const onSetVideoStatus = (isPlaying: boolean): void => {
    dispatch(setVideoState(isPlaying));
  };

  const onSetVideo = (video: subVideoModel): void => {
    dispatch(setSelectedVideo(video));
  };

  if (!videos.length) return <></>;

  return (
    <div className='practi-app'>
      <div className='content-container-practice'>
        <HeaderThree />
        {Drill ? (
          <div className='video-container'>
            <h1 className="big-title">{Drill}</h1>
            <VideoPlayerLi onSetVideoStatus={onSetVideoStatus} />
            <SubVideoList
              onSetVideoStatus={onSetVideoStatus}
              videoRef={videoRef.current}
              onSetVideo={onSetVideo}
              videos={videos}
              selectedVideo={selectedVideo}
              token={token}
              drillName={Drill}
              topic={topic}
            />
          </div>
        ) : null}
      </div>
      <CtaBarManager />
    </div>
  )};