import VideoModel from "../Models/VideoModel";




const videos: any = {
    'הטעיות': [
        { _id: 'a123', title: 'אין אאוט', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693985430/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%90%D7%99%D7%9F_%D7%90%D7%90%D7%95%D7%98_b1lbri.mp4',txt:'lorem' },
        { _id: 'a124', title:'הטעיית השהייה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693649272/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_1_dxov3g.mp4', txt: 'lorem' },
        { _id: 'a125', title:'גב סטפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693649272/%D7%92_%D7%91_%D7%A1%D7%98%D7%A4_rn8vfq.mp4', txt: 'lorem' },
    ],
    'חדירות': [
        { _id: 'a126', title: 'הרחקת המגן בחדירה', url: 'https://res.cloudinary.com/dqvcz6hvd/video/upload/v1673211494/%D7%97%D7%93%D7%99%D7%A8%D7%95%D7%AA%20%D7%9C%D7%A1%D7%9C/%D7%94%D7%A8%D7%97%D7%A7%D7%AA_%D7%94%D7%9E%D7%92%D7%9F_%D7%91%D7%97%D7%93%D7%99%D7%A8%D7%94-_1_bbkugn.mp4', txt: 'lorem' },
        { _id: 'a127', title: 'חדירה מול מגן גבוה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648178/%D7%97%D7%93%D7%99%D7%A8%D7%94_%D7%9E%D7%95%D7%9C_%D7%9E%D7%92%D7%9F_%D7%92%D7%91%D7%95%D7%94_%D7%99%D7%95%D7%AA%D7%A8_tv8ozc.mp4', txt: 'lorem' },
        { _id: 'a128', title:"תרגול סיומות", url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693647778/%D7%AA%D7%A8%D7%92%D7%95%D7%9C_%D7%A1%D7%99%D7%95%D7%9E%D7%95%D7%AA_art36z.mp4', txt: 'lorem' },
        { _id: 'a192', title: 'באמפ יורו סטפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648181/%D7%91%D7%90%D7%9E%D7%A4_%D7%99%D7%95%D7%A8%D7%95_%D7%A1%D7%98%D7%A4_z0rgzi.mp4', txt: 'lorem' },
        { _id: 'a193', title: 'יורו סטפ מהמקום', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648182/%D7%99%D7%95%D7%A8%D7%95_%D7%A1%D7%98%D7%A4_%D7%9E%D7%94%D7%9E%D7%A7%D7%95%D7%9D_xcjr4g.mp4', txt: 'lorem' },
    ],
    'כדרור': [
        { _id: 'a129', title: 'שליטה בכדור', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648639/2_%D7%9B%D7%93%D7%95%D7%A8%D7%99%D7%9D_%D7%A2%D7%9D_%D7%9B%D7%93%D7%95%D7%A8_%D7%98%D7%A0%D7%99%D7%A1_1_ua7g1l.mp4', txt: 'lorem' },
        { _id: 'a130', title: 'יציבות', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648640/%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA_%D7%952_%D7%9B%D7%93%D7%95%D7%A8%D7%99%D7%9D_jk5evv.mp4', txt: 'lorem' },
        { _id: 'a131', title: 'הטעיית קרוס-אובר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648651/%D7%A7%D7%A8%D7%95%D7%A1%D7%90%D7%95%D7%91%D7%A8_flbetq.mp4', txt: 'lorem' },

    ],
    'הגנה': [
        { _id: 'a129', title: 'עמדת מוצא בהגנה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659431/%D7%A2%D7%9E%D7%93%D7%AA_%D7%9E%D7%95%D7%A6%D7%90_%D7%91%D7%94%D7%92%D7%A0%D7%94_p0dqmn.mp4', txt: 'lorem' },
        { _id: 'a130', title: 'הגנת פוסט אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659429/%D7%94%D7%92%D7%A0%D7%AA_%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_n3bv3d.mp4', txt: 'lorem' },
        { _id: 'a131', title: 'הגנה נגד חדירה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659437/%D7%94%D7%92%D7%A0%D7%94_%D7%A0%D7%92%D7%93_%D7%97%D7%93%D7%99%D7%A8%D7%94_hsxvvk.mp4', txt: 'lorem' },

    ],
    'קליעה': [
        { _id: 'a131', title: 'הכנה לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659514/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_gsqmzc.mp4', txt: 'lorem' },
        { _id: 'a129', title: 'סטפ-בק', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693985426/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_g2af2q.mp4', txt: 'lorem' },
        { _id: 'a130', title: 'סטפ-בק ארוך', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659518/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_xjdfpa.mp4', txt: 'lorem' },
        { _id: 'a131', title:'תיקון החטאות', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659514/%D7%AA%D7%99%D7%A7%D7%95%D7%9F_%D7%94%D7%97%D7%98%D7%90%D7%95%D7%AA_ea3a0v.mp4', txt: 'lorem' },
        { _id: 'a131', title:'זריקת עונשין', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693659523/%D7%96%D7%A8%D7%99%D7%A7%D7%AA_%D7%A2%D7%95%D7%A0%D7%A9%D7%99%D7%9F_qjwd7t.mp4', txt: 'lorem' },
    ],
    'פוסט': [
        { _id: 'a129', title:'באמפים בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693654068/%D7%91%D7%90%D7%9E%D7%A4%D7%99%D7%9D_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_gjzkeo.mp4', txt: 'lorem' },
        { _id: 'a130', title: 'סבסוב בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693650501/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%9E%D7%A2%D7%9E%D7%93%D7%AA_%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_oepwe6.mp4', txt: 'lorem' },
        { _id: 'a131', title: 'מעבר טבעת בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693650501/%D7%A6%D7%A2%D7%93_%D7%95%D7%97%D7%A6%D7%99_%D7%9E%D7%A2%D7%9E%D7%93%D7%AA_%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_cznkon.mp4', txt: 'lorem' },

    ]
}

export const getVideos = (filterBy: string) => {
    console.log(filterBy);
    if (!filterBy) filterBy = 'הטעיות'
    const videosa = videos[filterBy]
    return videosa
}

export const getEmptyVideo = (): VideoModel => {
    return {
        _id: '',
        title: '',
        url: '',
        videoList: []
    }
}