import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VideoModel from '../../Models/VideoModel';
import { useDispatch } from 'react-redux';

import { stopVideo,startVideo } from '../../store/slicers/selectedVideo.slice';

import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { videoElState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface VideoPreviewProps {
  video: VideoModel;
  selectedVideo: VideoModel;
  onSetVideo: (video: VideoModel) => void;
  onSetVideoStatus: (isPlaying: boolean) => void;
}

/* 
  This component is the Video preview used to present the video line of each Video
*/
export const VideoPreview = ({
    video,
    selectedVideo,
    onSetVideo,
    onSetVideoStatus,
  }: VideoPreviewProps) => {
    const videoPlayerRef = useSelector(videoElState);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Add this line to get the dispatch function
  
  
    const onPauseVideo = (): void => {
      onSetVideoStatus(false);
 
      dispatch(stopVideo()); // Dispatch the stopVideo action
    };
  
    const onPlayVideo = async (videoId: string) => {
      if (selectedVideo._id !== videoId) {
        onSetVideo(video);
        setTimeout(() => {
          onSetVideoStatus(true);
          dispatch(startVideo()); // Dispatch the startVideo action
        }, 1000);
      } else {
        onSetVideoStatus(true);
        dispatch(startVideo()); // Dispatch the startVideo action
      }
    };
  
    // Navigate to the practice view when the "התחל אימון" button is clicked
    const onStartDrill = () => {
      navigate(`/PracticeView/${video.title}`);
    };
  
    // Handle the click event on the video preview, just choose this video.
    const handleClick = (videoId: string) => {
      if (selectedVideo._id !== videoId) {
        onSetVideo(video);
      }
    };
  
    return (
      <article
        className={`video-preview ${
          selectedVideo._id === video._id ? '' : ''
        }`}
        onClick={() => handleClick(video._id)}
      >
        <div className="preview-wrap">
        <div className="details-container">
        {/* Show "התחל אימון" button only if the selected video equals the current video */}
        {video.haveSub && selectedVideo._id === video._id && (
          <button className={`start-drill-btn ${selectedVideo.isPlaying ?  'playing' : ''}`} onClick={onStartDrill}>
            התחל תרגול
          </button>
        )}
      </div>
          <div className="action-heading-container">
            <span>{video.title}</span>
            <button className="play-pause-btn">
              {selectedVideo._id === video._id && selectedVideo.isPlaying ? (
                <BsPauseFill onClick={onPauseVideo} />
              ) : (
                <BsPlayFill onClick={() => onPlayVideo(video._id)} />
              )}
            </button>
          </div>
        </div>
      </article>
    );
  };