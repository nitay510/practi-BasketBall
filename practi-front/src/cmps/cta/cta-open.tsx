import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hero } from './hero';
import VideoModel from '../../Models/VideoModel';
import { useNavigate } from 'react-router-dom';
import { videoElState } from '../../store/store';
import { getVideos } from '../video/functions';
import { setVideos } from '../../store/slicers/videos.slice';
import { setSelectedVideo, setVideoState } from '../../store/slicers/selectedVideo.slice';

/* 
  This component is the first info about the user in the opening screen.
*/

interface CtaOpenProps {
  token: String;
  firstname: String;
  latestDrillName: string;
  nextDrillName: string;
  nextDrillTopic: string;
  setTopic: (username: string) => void;
  nextDrill: VideoModel | null;
  ctaBarContainerRef: React.RefObject<HTMLDivElement>;
}

export function CtaOpen({
  token,
  firstname,
  latestDrillName,
  nextDrillName,
  nextDrillTopic,
  setTopic,
  nextDrill,
  ctaBarContainerRef,
}: CtaOpenProps) {
  const videoPlayerRef = useSelector(videoElState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadVideosForLastDrill = async (filterBy: string) => {
    const videos = await getVideos(filterBy, token);
    dispatch(setVideos(videos));
  };

  const onStartDrill = () => {
    navigate(`/PracticeView/${latestDrillName}`);
  };
//next drill click will start the video of the next drill and toggle down
  const onNextDrillClick = async () => {
    setTopic(nextDrillTopic);
    await loadVideosForLastDrill(nextDrillTopic);
    dispatch(setSelectedVideo(nextDrill));
    setTimeout(() => {
      setVideoState(true);
      videoPlayerRef.play();
      ctaBarContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };
  return (
    <section className="cta-container">
      <Hero />
      <div className="cta-btns">
        <div className="start-cta-open">
          <div className='bigPracti'>
            Practi
          </div>
          <div className='PractiDisc'>
            {/* Apply styling to control spacing between the paragraphs */}
            <p style={{ marginBottom: '3px' }}>מאמן אישי דיגיטלי</p> 
            <p>איתך במגרש</p> 
          </div>
        </div>
        {latestDrillName !== '' ? (
          <button className="last-drill-btn" onClick={onStartDrill}>
            המשך אימון
          </button>
        ):
        <button className="last-drill-btn" onClick={onNextDrillClick}>
        המשך אימון
      </button>
        }
        <button className="next-drill-btn" onClick={onNextDrillClick}>
          לאימון הבא
        </button>
        <p></p>
      </div>
    </section>
  );
}
