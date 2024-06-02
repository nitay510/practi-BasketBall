import React, { useState } from "react";
import subVideoModel from "../../Models/subVideoModel"
import { SubVideoPreview } from "./subVideo-preview"


interface SubVideoListProps {
    videos: subVideoModel[]
    selectedVideo: subVideoModel
    onSetVideoStatus: (isPlaying: boolean) => void
    onSetVideo: (video: subVideoModel) => void
    videoRef: any
    token:string
    topic:string
    drillName:string|undefined
}

/* 
  This component is the list of subVideos that present in each drill use subVideoPreview in order to present them
*/
export const SubVideoList = ({ videos, onSetVideo, selectedVideo, videoRef, onSetVideoStatus,token,topic,drillName }: SubVideoListProps): JSX.Element => {
    const [currentlyOpenDetails, setCurrentlyOpenDetails] = useState<string | null>(null);
    return (
        <div className="video-list">
            {videos.map((video) =>
                <SubVideoPreview
                    selectedVideo={selectedVideo}
                    videoRef={videoRef}
                    onSetVideo={onSetVideo}
                    onSetVideoStatus={onSetVideoStatus}
                    video={video}   
                    token={token} 
                    drillName={drillName}
                    topic={topic}
                    title={video.title}
                    currentlyOpenDetails={currentlyOpenDetails}
                    setCurrentlyOpenDetails={setCurrentlyOpenDetails}
                />)}
        </div>
    )
}

