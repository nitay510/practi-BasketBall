import React, { useState, useEffect } from "react";
import Confetti from 'react-dom-confetti';
import { useSelector } from "react-redux";
// models
import subVideoModel from "../../Models/subVideoModel";
// icons
import { MdOutlineExpandMore } from 'react-icons/md';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
// cmps
import { VideoDetails } from "./video-details";
import { VideoDetailsDouble } from "./video-detailsDouble";
// state
import { videoElState } from "../../store/store";

interface SubVideoPreviewProps {
  video: subVideoModel;
  selectedVideo: subVideoModel;
  onSetVideo: (video: subVideoModel) => void;
  onSetVideoStatus: (isPlaying: boolean) => void;
  videoRef: any;
  token: string;
  drillName: string;
  topic: string;
  title: string;
}

/* 
  This component is the subVideo preview used to present the subvideoline of each subVideo
*/
export const SubVideoPreview = ({
  video,
  onSetVideo,
  selectedVideo,
  onSetVideoStatus,
  token,
  drillName,
  topic,
  title
}: SubVideoPreviewProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const videoPlayerRef = useSelector(videoElState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [brokenRecord, setBrokenRecord] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageNoHighScore, setSubmitMessageNoHighScore] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Handle the submit message and display popup
  useEffect(() => {
    if(isSubmit){
    if ( brokenRecord) {
      // Show the popup
      setShowPopup(true);
      // Close the popup after 5 seconds
      const timer = setTimeout(() => {
        setShowDetails(false);
        setShowPopup(false);
        setBrokenRecord(false);
        setIsSubmit(false);
        setSubmitMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setSubmitMessageNoHighScore("אימון נוסף בהצלחה")
      const timer = setTimeout(() => {
        setShowDetails(false);
        setIsSubmit(false);
        setShowPopup(false);
        setSubmitMessage("");
    }, 2000);
    }
  }
  }, [isSubmit]);

  // Pause the video when clicked
  const onPauseVideo = (): void => {
    onSetVideoStatus(false);
    videoPlayerRef.pause();
  };

  // Toggle the display of details
  const onToggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  // Play the video and set submit state
  const onPlayVideo = async (videoId: string) => {
    if (selectedVideo._id !== videoId) {
      onSetVideo(video);
      setTimeout(() => {
        onSetVideoStatus(true);
        videoPlayerRef.play();
      }, 2000);
    } else {
      onSetVideoStatus(true);
      videoPlayerRef.play();
    }
  };

  
  let detailsComponent = null;
//decide if its single or double form and choose acording weich component to  load
  if (!isSubmit && showDetails) {
    if (video.single === true) {
      detailsComponent = (
        <VideoDetails
          drillId={video._id}
          title={video.title}
          target={video.target}
          tries={video.tries}
          token={token}
          drillName={drillName}
          topic={topic}
          setIsSubmit={setIsSubmit}
          setBrokenRecord={setBrokenRecord}
          setSubmitMessage={setSubmitMessage}
        />
      );
    } else if (video.single === false) {
      detailsComponent = (
        <VideoDetailsDouble
          drillId={video._id}
          title={video.title}
          mission1={video.mission1}
          token={token}
          drillName={drillName}
          topic={topic}
          setIsSubmit={setIsSubmit}
        />
      );
    }
  }

  // Handle the click event on the video line
  const handleClick = (videoId: string) => {
    if (selectedVideo._id !== videoId) {
      onSetVideo(video);
    }
  };

  return (
    <article
      className={`video-preview ${selectedVideo._id === video._id ? 'playing' : ''}`}
      onClick={() => handleClick(video._id)}
    >
        {isSubmit && (
          <div className="submit-message">
            {submitMessageNoHighScore}
          </div>
        )}
      <Confetti active={showPopup} />
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <img
              src={`${process.env.PUBLIC_URL}/pop-up-photo.png`} 
              alt="Celebrity"
              style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }}
            />
            {submitMessage}
          </div>
        </div>
      )}

      <div className="preview-wrap">
        <div className="details-container">
          {video.haveForm && (
            <button className="expendMore" onClick={onToggleDetails}>
              <MdOutlineExpandMore />
            </button>
          )}
        </div>
        <div className="action-heading-container">
          <span className="video-title">{video.title}</span>
          <button className="play-pause-btn blue-bg-btn">
            {selectedVideo._id === video._id && selectedVideo.isPlaying ? (
              <BsPauseFill onClick={onPauseVideo} />
            ) : (
              <BsPlayFill onClick={() => onPlayVideo(video._id)} />
            )}
          </button>
        </div>
      </div>
                    
      {detailsComponent}
    </article>
  );
};
