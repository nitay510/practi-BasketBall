import VideoModel from "../Models/VideoModel";

export const getEmptyVideo = (): VideoModel => {
    return {
        _id: '',
        title: '',
        url: '',
        haveSub:false
    }
}
