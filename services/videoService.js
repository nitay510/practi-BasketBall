
const videos= {
    'הטעיות': [
      { _id: 'a100', title: 'הטעיית קרוס-אובר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701684627/practi-videos/%D7%A7%D7%A8%D7%95%D7%A1%D7%90%D7%95%D7%91%D7%A8_qhiryf.mp4',  haveSub: true },
        { _id: 'a101', title: 'אין אאוט', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683260/practi-videos/%D7%90%D7%99%D7%9F-%D7%90%D7%90%D7%95%D7%98_zzdofo.mp4', haveSub: true },
        { _id: 'a102', title:'הטעיית השהייה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701685885/practi-videos/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_alud3g.mp4',  haveSub: true },
        { _id: 'a103', title:'גב סטפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683352/practi-videos/%D7%92_%D7%91_%D7%A1%D7%98%D7%A4_6_x5n09s.mp4',  haveSub: true },
        { _id: 'a104', title:"בונוס: תרגול סיומות", url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693647778/%D7%AA%D7%A8%D7%92%D7%95%D7%9C_%D7%A1%D7%99%D7%95%D7%9E%D7%95%D7%AA_art36z.mp4', haveSub: false },
    ],
    'חדירות': [
        { _id: 'a110', title: 'הרחקת המגן בחדירה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683407/practi-videos/%D7%94%D7%A8%D7%97%D7%A7%D7%AA_%D7%94%D7%9E%D7%92%D7%9F_%D7%91%D7%97%D7%93%D7%99%D7%A8%D7%94_sw0wdp.mp4',  haveSub: true },
        { _id: 'a111', title: 'חדירה מול מגן גבוה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683596/practi-videos/%D7%97%D7%93%D7%99%D7%A8%D7%94_%D7%9E%D7%95%D7%9C_%D7%9E%D7%92%D7%9F_%D7%92%D7%91%D7%95%D7%94_wvjxbv.mp4',  haveSub: true },
        { _id: 'a112', title: 'באמפ יורו סטפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683337/practi-videos/%D7%91%D7%90%D7%9E%D7%A4_%D7%99%D7%95%D7%A8%D7%95-%D7%A1%D7%98%D7%A4_1_cwvegh.mp4',  haveSub: true },
        { _id: 'a113', title: 'יורו סטפ מהמקום', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701685356/practi-videos/%D7%99%D7%95%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4%D7%A4_%D7%9E%D7%94%D7%9E%D7%A7%D7%95%D7%9D_ihqxcy.mp4',  haveSub: true },
        { _id: 'a114', title: 'בונוס: הגנה נגד חדירה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683425/practi-videos/%D7%94%D7%92%D7%A0%D7%94_%D7%A0%D7%92%D7%93_%D7%97%D7%93%D7%99%D7%A8%D7%94_1_opplok.mp4',  haveSub: false },
    ],
    'כדרור': [
      { _id: 'a124', title: 'כדרור מסל לסל', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547432/practi-videos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%9E%D7%A1%D7%9C_%D7%9C%D7%A1%D7%9C_-_%D7%94%D7%93%D7%A8%D7%9B%D7%94_yqtfdv.mp4',  haveSub: true},
      { _id: 'a120', title: 'כדרור תחת לחץ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683755/practi-videos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%AA%D7%97%D7%AA_%D7%9C%D7%97%D7%A5_ngmqjh.mp4',  haveSub: true},
      { _id: 'a121', title: 'כדרור מול לחץ מגרש שלם', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701685309/practi-videos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%9E%D7%95%D7%9C_%D7%9C%D7%97%D7%A5_%D7%9E%D7%92%D7%A8%D7%A9_%D7%A9%D7%9C%D7%9D_2_zljk9p.mp4',  haveSub: true},
      { _id: 'a122', title: 'כדרור בפיק אנד רול', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683628/practi-videos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%91%D7%A4%D7%99%D7%A7%D7%A0%D7%A8%D7%95%D7%9C_1_alsez7.mp4',  haveSub: true},
      { _id: 'a123', title: 'בונוס: שליטה בכדור', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1693648639/2_%D7%9B%D7%93%D7%95%D7%A8%D7%99%D7%9D_%D7%A2%D7%9D_%D7%9B%D7%93%D7%95%D7%A8_%D7%98%D7%A0%D7%99%D7%A1_1_ua7g1l.mp4',  haveSub: false },

    ],
    'קליעה': [
        { _id: 'a130', title: 'הכנה לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683424/practi-videos/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_1_zh5vpx.mp4', haveSub: true },
        { _id: 'a131', title:'זריקת עונשין', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683610/practi-videos/%D7%98%D7%A7%D7%A1_%D7%96%D7%A8%D7%99%D7%A7%D7%AA_%D7%A2%D7%95%D7%A0%D7%A9%D7%99%D7%9F_hhopf4.mp4',  haveSub: true },
        { _id: 'a132', title: 'סטפ-בק', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683758/practi-videos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_duhajs.mp4', haveSub: true },
        { _id: 'a133', title: 'סטפ-בק ארוך', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701685555/practi-videos/%D7%A1%D7%98%D7%A4-%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_egetfj.mp4',  haveSub: true },
        { _id: 'a134', title:'בונוס: תיקון החטאות', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701684604/practi-videos/%D7%AA%D7%99%D7%A7%D7%95%D7%9F_%D7%94%D7%97%D7%98%D7%90%D7%95%D7%AA_2_towzrp.mp4',  haveSub: false},
    ],
    'פוסט אפ': [
        { _id: 'a140', title:'באמפים בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683303/practi-videos/%D7%91%D7%90%D7%9E%D7%A4%D7%99%D7%9D_%D7%91%D7%A4%D7%95%D7%A1%D7%98-%D7%90%D7%A4_1_ueix7o.mp4',  haveSub: true },
        { _id: 'a141', title: 'סבסוב בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683743/practi-videos/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%9E%D7%A2%D7%9E%D7%93%D7%AA_%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_h0of6z.mp4',  haveSub: true },
        { _id: 'a142', title: 'מעבר טבעת בפוסט-אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701684596/practi-videos/%D7%A6%D7%A2%D7%93_%D7%95%D7%97%D7%A6%D7%99_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_byywbu.mp4',  haveSub: true },
        { _id: 'a143', title: 'בונוס: הגנת פוסט אפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701683394/practi-videos/%D7%94%D7%92%D7%A0%D7%AA_%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_1_qhhbnw.mp4', haveSub: false },
    ]
}

exports.getVideos = async (category) => {
    const videosa = videos[category]
    return videosa
  };
  exports.getNextVideoInCategory = async (category, videoName) => {
    let videoList = videos['קליעה'];
  
    // Check for undefined using correct spelling
    if (category !== undefined && category !== 'undefined' && category) {
      videoList = videos[category];
    }
  
    if (videoName === 'null' || videoName === undefined) {
      return videoList[0];
    }
  
    for (let i = 0; i < videoList.length - 1; i++) {
      if (videoList[i].title === videoName) {
        const nextIndex = i + 1;
        if (nextIndex < videoList.length) {
          return videoList[nextIndex];
        }
      }
    }
  };
  exports.getNextCategory = async (category) => {
    const categories = [
      'חדירות',
      'הטעיות',
      'כדרור',
      'קליעה',
      'פוסט אפ',
    ];
  
    const currentIndex = categories.indexOf(category);
  
    if (currentIndex === -1 || currentIndex === categories.length - 1) {
      // If the current category is not found or is the last category, return null
      return 'חדירות';
    }
  
    // Return the next category
    return categories[currentIndex + 1];
  };