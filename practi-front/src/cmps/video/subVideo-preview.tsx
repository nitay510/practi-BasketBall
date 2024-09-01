import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Confetti from 'react-dom-confetti';
import { MdClose, MdPeople, MdOutlineExpandMore } from 'react-icons/md'; // Import the MdPeople icon
import { useSelector } from "react-redux";
// models
import subVideoModel from "../../Models/subVideoModel";
// icons
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
// cmps
import { VideoDetails } from "./video-details";
import { VideoDetailsDouble } from "./video-detailsDouble";
// state
import { stopVideo, startVideo } from '../../store/slicers/selctedSubVideo.slice';
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
  currentlyOpenDetails: string | null;
  setCurrentlyOpenDetails: (detailsId: string | null) => void;
}

export const SubVideoPreview = ({
  video,
  onSetVideo,
  selectedVideo,
  onSetVideoStatus,
  token,
  drillName,
  topic,
  title,
  currentlyOpenDetails,
  setCurrentlyOpenDetails,
}: SubVideoPreviewProps) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [brokenRecord, setBrokenRecord] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [color, setColor] = useState('');
  const [rate, setRate] = useState(0);
  const [submitMessageNoHighScore, setSubmitMessageNoHighScore] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const videoPlayerRef = useSelector(videoElState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmit) {
      if (brokenRecord) {
        setShowPopup(true);
        const timer = setTimeout(() => {
          setCurrentlyOpenDetails(null);
          setShowPopup(false);
          setBrokenRecord(false);
          setIsSubmit(false);
          setSubmitMessage("");
        }, 6000);

        return () => clearTimeout(timer);
      } else {
        setSubmitMessageNoHighScore("אימון נוסף בהצלחה");
        const timer = setTimeout(() => {
          setCurrentlyOpenDetails(null);
          setIsSubmit(false);
          setShowPopup(false);
          setSubmitMessage("");
        }, 2000);
      }
    }
  }, [isSubmit]);

  const handleClosePopup = () => {
    setCurrentlyOpenDetails(null);
    setShowPopup(false);
    setBrokenRecord(false);
    setIsSubmit(false);
    setSubmitMessage("");
  };

  const onPauseVideo = (): void => {
    onSetVideoStatus(false);
    dispatch(stopVideo());
  };
  const onToggleDetails = () => {
    if (currentlyOpenDetails === video._id) {
      setCurrentlyOpenDetails(null);
    } else {
      setCurrentlyOpenDetails(video._id);
    }
  };

  const onPlayVideo = async (videoId: string) => {
    if (selectedVideo._id !== videoId) {
      onSetVideo(video);
      setTimeout(() => {
        onSetVideoStatus(true);
        dispatch(startVideo());
        if (currentlyOpenDetails != video._id) {
          setCurrentlyOpenDetails(video._id);
        }
      }, 1000);
    } else {
      onSetVideoStatus(true);
      dispatch(startVideo());
      if (currentlyOpenDetails != video._id) {
        setCurrentlyOpenDetails(video._id);
      }
    }
  };

  let detailsComponent = null;

  if (!isSubmit && currentlyOpenDetails === video._id && video.haveForm) {
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
          setColor={setColor}
          setRate={setRate}
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

  const handleClick = (videoId: string) => {
    if (selectedVideo._id !== videoId) {
      onSetVideo(video);
    }
  };

  const rateStyle = `popup-rate ${color}`;
  return (
    <article
      className={`subvideo-preview ${selectedVideo._id === video._id ? 'playing' : ''}`}
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
              src={`${process.env.PUBLIC_URL}/Trophy.png`}
              alt="Celebrity"
              style={{ width: '138.33px', height: '139.18px', marginBottom: '10px' }}
            />
            <div className="popup-message">
              שיא חדש:
              <div className={rateStyle}>
                {rate}%
              </div>
            </div>
            <div className="popup-message">
              {submitMessage}!
            </div>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              <MdClose size={23} />
            </button>
          </div>
        </div>
      )}
      <div className="preview-wrap-details">
        <div className="preview-wrap">
          <div className="details-container">
            {video.haveForm && (
              <button className="expendMore" onClick={onToggleDetails}>
                <MdOutlineExpandMore />
              </button>
            )}
          </div>
          <div className="action-heading-container">
            <span style={{ textAlign: 'right' }} className="video-title">
              {video.title}
            </span>
            {!video.single && <MdPeople className="people-icon" />} {/* Add MdPeople icon if single is false */}
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
      </div>
    </article>
  );
};
