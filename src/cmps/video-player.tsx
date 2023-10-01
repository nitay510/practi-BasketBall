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
            {/* <video>
                <source src="../videos/1.mp4" type="video/webm" />
                <source src="../videos/1.mp4" type="video/mp4" />
                Sorry, your browser doesn't support videos.
            </video> */}
        </div>
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/RDzNjktFZPM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    );
};