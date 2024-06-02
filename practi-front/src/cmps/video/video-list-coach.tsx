
import React from "react"
import VideoModel from "../../Models/VideoModel"
import { VideoPreviewCoach } from "./video-preview-coach"


interface VideoListCoachProps {
    videos: VideoModel[]
    selectedVideo: VideoModel
    onSetVideoStatus: (isPlaying: boolean) => void
    onSetVideo: (video: VideoModel) => void

}
/* 
  This component is the list of Videos that present in each drill use VideoPreview in order to present them
*/
export const VideoListCoach = ({ videos, onSetVideo, selectedVideo, onSetVideoStatus }: VideoListCoachProps): JSX.Element => {
    return (
        <div className="video-list">
            {videos.map((video) =>
                <VideoPreviewCoach
                    selectedVideo={selectedVideo}
                    onSetVideo={onSetVideo}
                    onSetVideoStatus={onSetVideoStatus}
                    video={video}
        
                />)}
        </div>
    )
}

