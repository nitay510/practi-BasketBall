import React, { useState } from "react"
import VideoModel from "../../Models/VideoModel"
import { SubVideoPreview } from "./subVideo-preview"


interface SubVideoListProps {
    videos: VideoModel[]
    selectedVideo: VideoModel
    onSetVideoStatus: (isPlaying: boolean) => void
    onSetVideo: (video: VideoModel) => void
    videoRef: any
}

export const SubVideoList = ({ videos, onSetVideo, selectedVideo, videoRef, onSetVideoStatus }: SubVideoListProps): JSX.Element => {
    return (
        <div className="video-list">
            {videos.map((video) =>
                <SubVideoPreview
                    selectedVideo={selectedVideo}
                    videoRef={videoRef}
                    onSetVideo={onSetVideo}
                    onSetVideoStatus={onSetVideoStatus}
                    video={video}    
                />)}
        </div>
    )
}

