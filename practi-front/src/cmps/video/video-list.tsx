
import VideoModel from "../../Models/VideoModel"
import { VideoPreview } from "./video-preview"


interface VideoListProps {
    videos: VideoModel[]
    selectedVideo: VideoModel
    onSetVideoStatus: (isPlaying: boolean) => void
    onSetVideo: (video: VideoModel) => void

}
/* 
  This component is the list of Videos that present in each drill use VideoPreview in order to present them
*/
export const VideoList = ({ videos, onSetVideo, selectedVideo, onSetVideoStatus }: VideoListProps): JSX.Element => {
    return (
        <div className="video-list">
            {videos.map((video) =>
                <VideoPreview
                    selectedVideo={selectedVideo}
                    onSetVideo={onSetVideo}
                    onSetVideoStatus={onSetVideoStatus}
                    video={video}
        
                />)}
        </div>
    )
}

