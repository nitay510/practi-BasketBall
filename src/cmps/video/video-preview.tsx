import React, { useState } from "react"
import { useSelector } from "react-redux"
// models
import VideoModel from "../../Models/VideoModel"
// icons
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { MdOutlineExpandMore } from 'react-icons/md'
// cmps
import { VideoDetails } from "./video-details"
// state
import { videoElState } from "../../store/store"


interface VideoPreviewProps {
    video: VideoModel
    selectedVideo: VideoModel
    onSetVideo: (video: VideoModel) => void
    onSetVideoStatus: (isPlaying: boolean) => void
    videoRef: any
    newList:boolean
    setNewList:(newList: boolean) => void
}

export const VideoPreview = ({ video, onSetVideo, selectedVideo, onSetVideoStatus,newList,setNewList }: VideoPreviewProps) => {

    const [showDetails, setShowDetails] = useState(false)
    const videoPlayerRef = useSelector(videoElState)

    const onToggleDetails = () => {
        setShowDetails((prevState) => !prevState)
        setNewList(true);
    }
console.log(showDetails);
console.log(newList);
    const onPauseVideo = (): void => {
        onSetVideoStatus(false)
        videoPlayerRef.pause()
    }
    const onPlayVideo = async (videoId: string) => {
        if (selectedVideo._id !== videoId) {
            await videoPlayerRef.pause()
            onSetVideo(video)
        }
        onSetVideoStatus(true)
        videoPlayerRef.play()
    }

    return (
        <article className="video-preview">

            <div className="preview-wrap">
                <div className="details-container">
                    <button onClick={onToggleDetails}>
                        <MdOutlineExpandMore />
                    </button>
                </div>
                <div className="action-heading-container">
                    <span>{video.title}</span>
                    <button className="play-pause-btn">
                        {(selectedVideo._id === video._id && selectedVideo.isPlaying) ?
                            <BsPauseFill onClick={onPauseVideo} /> :
                            <BsPlayFill onClick={() => onPlayVideo(video._id)} />
                        }
                    </button>
                </div>
            </div>
            {showDetails && newList && <VideoDetails filterBy={video.title} />}
        </article>
    )
}