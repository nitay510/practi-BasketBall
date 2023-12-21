
import subVideoModel from "../Models/subVideoModel";


export const getEmptyVideo = (): subVideoModel => {
    return {
        _id: '',
        title: '',
        url: '',
       mission1:'',
       tries:0,
      single:true,
      haveForm:false,
      target:0,
    }
}