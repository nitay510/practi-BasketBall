
const videos= {
    'הטעיות': [
      { _id: 'a100', title: 'הטעיית קרוס-אובר', url: '9EIUjxP6bts',  haveSub: true },
        { _id: 'a101', title: 'אין אאוט', url: 'vDEKXlr6dNg', haveSub: true },
        { _id: 'a102', title:'הטעיית השהייה', url: 'sjdKWtGdFbM',  haveSub: true },
        { _id: 'a103', title:'גב סטפ', url: 'r4B3JTh_UAg',  haveSub: true },
        { _id: 'a104', title:"בונוס: תרגול סיומות", url: '-sCNW5zHsqs', haveSub: false },
    ],
    'חדירות': [
        { _id: 'a110', title: 'הרחקת המגן בחדירה', url: 'CbJ91TrOFKI',  haveSub: true },
        { _id: 'a111', title: 'חדירה מול מגן גבוה', url: 'OhASLnxV7vQ',  haveSub: true },
        { _id: 'a112', title: 'באמפ יורו סטפ', url: 'OUloe0wMaBM',  haveSub: true },
        { _id: 'a113', title: 'יורו סטפ מהמקום', url: 'iu42O15UoTs',  haveSub: true },
        { _id: 'a114', title: 'בונוס: הגנה נגד חדירה', url: 'TjZ5gd2Fx3c',  haveSub: false },
    ],
    'כדרור': [
      { _id: 'a124', title: 'כדרור מסל לסל', url: 'FUU7OLJxC9c',  haveSub: true},
      { _id: 'a120', title: 'כדרור תחת לחץ', url: 'bbKbXW2R6ZA',  haveSub: true},
      { _id: 'a121', title: 'כדרור מול לחץ מגרש שלם', url: '25rDExk-wQE',  haveSub: true},
      { _id: 'a122', title: 'כדרור בפיק אנד רול', url: '7VgM83jiPGw',  haveSub: true},
      { _id: 'a123', title: 'בונוס: שליטה בכדור', url: 'cUpEw5Dntkg',  haveSub: false },

    ],
    'קליעה': [
        { _id: 'a130', title: 'הכנה לקליעה', url: 'jsuWayVbu4U', haveSub: true },
        { _id: 'a131', title:'טקס זריקת עונשין', url: 'vHL79CtUoVE',  haveSub: true },
        { _id: 'a132', title: 'סטפ-בק', url: 'jG2GxZ7ZhD4', haveSub: true },
        { _id: 'a133', title: 'סטפ-בק ארוך', url: 'GdenlQzMjcE',  haveSub: true },
        { _id: 'a134', title:'בונוס: תיקון החטאות', url: 'qVWgPB2l3fo',  haveSub: false},
    ],
    'פוסט אפ': [
        { _id: 'a140', title:'באמפים בפוסט-אפ', url: 'Nxz17Uwp_v8',  haveSub: true },
        { _id: 'a141', title: 'סבסוב בפוסט-אפ', url: 'MjXcyPc1xIo',  haveSub: true },
        { _id: 'a142', title: 'צעד וחצי בפוסט-אפ', url: 'mgvrCZ5fWX8',  haveSub: true },
        { _id: 'a143', title: 'בונוס: הגנת פוסט אפ', url: 'AtxSnpcvMew', haveSub: false },
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
  exports.getVideoByName = async (videoName) => {
    for (const category in videos) {
        const videoList = videos[category];
        for (const video of videoList) {
            if (video.title === videoName) {
                return video;
            }
        }
    }
    return null;  // Return null if the video is not found
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