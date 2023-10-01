import React, { useState } from "react"
import { useSelector } from "react-redux"
// models
import VideoModel from "../../Models/VideoModel"
// icons
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
// cmps
import { VideoDetails } from "./video-details"
// state
import { videoElState } from "../../store/store"

interface SubVideoPreviewProps {
    video: VideoModel
    selectedVideo: VideoModel
    onSetVideo: (video: VideoModel) => void
    onSetVideoStatus: (isPlaying: boolean) => void
    videoRef: any
}

export const SubVideoPreview = ({ video, onSetVideo, selectedVideo, onSetVideoStatus }: SubVideoPreviewProps) => {

    const videoPlayerRef = useSelector(videoElState)


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
                </div>
                <div className="action-heading-container">
                    <span>{video.title}</span>    
                     <button className="play-pause-btn blue-bg-btn">
                        {(selectedVideo._id === video._id && selectedVideo.isPlaying) ?
                            <BsPauseFill onClick={onPauseVideo} /> :
                            <BsPlayFill onClick={() => onPlayVideo(video._id)} />
                        }
                    </button>
                </div>
            </div>
           
        </article>
    )
}