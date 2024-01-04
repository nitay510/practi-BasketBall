import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import VideoModel from '../../Models/VideoModel';
import { MdSportsBasketball } from 'react-icons/md';
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
    const [isPlaying,setIsPlaying] = useState(false);
  
    // Pause the video and update state when the pause button is clicked
    const onPauseVideo = (): void => {
      onSetVideoStatus(false);
      setIsPlaying(false);
      videoPlayerRef.pause();
    };
  
    // Play the video and update state when the play button is clicked
    const onPlayVideo = async (videoId: string) => {
        //if the video i try to play  isn't the current video
      if (selectedVideo._id !== videoId) {
        onSetVideo(video);
        //for synchorizition 
          onSetVideoStatus(true);
          videoPlayerRef.play();
          setIsPlaying(true);
      } else {
        onSetVideoStatus(true);
        videoPlayerRef.play();
        setIsPlaying(true);
      }

    };
  
    // Navigate to the practice view when the "התחל אימון" button is clicked
    const onStartDrill = () => {
      navigate(`/PracticeView/${video.title}`);
    };
  
    // Handle the click event on the video preview, just choose this video.
    const handleClick = (videoId: string) => {
      if (selectedVideo._id !== videoId) {
        setIsPlaying(false);
        onSetVideoStatus(false);
        onSetVideo(video);
        videoPlayerRef.play();
        const timer = setTimeout(() => {
          videoPlayerRef.pause();
        }, 100);

        
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
          <button className={`start-drill-btn ${isPlaying ? 'playing' : ''}`} onClick={onStartDrill}>
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