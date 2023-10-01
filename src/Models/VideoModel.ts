import SubVideoModel from "../Models/subVideoModel";
class VideoModel {
    public _id: string;
    public title: string
    public url: string;
    public videoList: SubVideoModel[];
    public isPlaying?: boolean;
}

export default VideoModel;