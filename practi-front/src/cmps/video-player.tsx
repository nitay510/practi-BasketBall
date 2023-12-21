import React from "react";

interface VideoPlayerProps {
    videoUrl: string
}


export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
    return (
        <div className='video-player-container'>
            <video
                src={videoUrl}
                className="video-player"
                controls

            />
           
        </div>
       
    );
};