import React, { useState } from "react"
import VideoModel from "../../Models/VideoModel"
import { VideoPreview } from "./video-preview"


interface VideoListProps {
    videos: VideoModel[]
    selectedVideo: VideoModel
    onSetVideoStatus: (isPlaying: boolean) => void
    onSetVideo: (video: VideoModel) => void
    videoRef: any
    newList:boolean
    setNewList:(newList: boolean) => void
}

export const VideoList = ({ videos, onSetVideo, selectedVideo, videoRef, onSetVideoStatus,newList,setNewList }: VideoListProps): JSX.Element => {
    return (
        <div className="video-list">
            {videos.map((video) =>
                <VideoPreview
                    selectedVideo={selectedVideo}
                    videoRef={videoRef}
                    onSetVideo={onSetVideo}
                    onSetVideoStatus={onSetVideoStatus}
                    video={video}
                    newList={newList}
                    setNewList={setNewList}
                />)}
        </div>
    )
}

