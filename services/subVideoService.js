const videos = {
    
    'באמפ יורו סטפ': [
        { _id: 'a150', title: 'תרגיל מול מגן דמיוני', url: 'D4klweO4JQ8', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'c150', title: 'תרגיל זוגי', url: 'na5p-Fa71LQ', mission1:'אחד על אחד- סל בבאמפ יורו-סטפ שווה 4 נק',single:false,haveForm:true},
    ],
    'אין אאוט': [
        { _id: 'a151', title: 'אין אאוט לקליעה', url: 'hFC5fA2bItk', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b151', title: 'אין אאוט במעבר', url: '8x5gy97taNY',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:true,haveForm:true,target:70},
        { _id: 'c151', title: 'תרגיל  זוגי', url: 'y6ldRfWtl64',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true},

    ],
    'הטעיית השהייה': [
        { _id: 'a152', title: 'הטעיית השהייה לליאפ', url: 'Pa4BZ8tL4rc', mission1:'10 זריקות מכל צד',tries:10,single:true,haveForm:true,target:100},
        { _id: 'b152', title: 'הטעיית השהייה לקליעה', url: '6gooIatsLYg', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'd152', title: 'תרגיל  זוגי', url: 'Dkg4lowiOEA', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:10,single:false,haveForm:true },

    ],
    'באמפים בפוסט-אפ': [
        { _id: 'a153', title: 'באמפים מול הקיר', url: 'OIYySMQz4Ao',mission1:'20 זריקות מחוץ לקשת לאחר גב-סטפ',tries:10,single:true,haveForm:true,target:80},
        { _id: 'b153', title: 'תרגיל  זוגי', url: 'PJdfZwOJD1c',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:false },

    ],
    'גב סטפ': [
        { _id: 'a154', title: 'גב סטפ לחדירה', url: 'FeUIw7RL0sw', mission1:'10 זריקות מכל צד',tries:40,single:true,haveForm:true,target:80},
        { _id: 'b154', title: 'גב סטפ לקליעה', url: 'KLNkjnYSsAo', mission1:'10 זריקות מכל צד',tries:40,single:true,haveForm:true,target:60},
        { _id: 'c154', title: 'תרגיל מסכם', url: '_zyu559_Hgc',mission1:'20 זריקות מחוץ לקשת לאחר גב-סטפ',tries:20,single:true,haveForm:true,target:50},
        { _id: 'd154', title: 'תרגיל  זוגי', url: 'cnNZEU3gijg', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'חדירה מול מגן גבוה': [
        { _id: 'a155', title: 'חדירה מהמקום', url: 'C5LQoofxV88', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b155', title: 'חדירה למעבר טבעת', url: 'w8Ad46Pd-Zs', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'd155', title: 'תרגיל זוגי', url: 'dwvevRRf7EI',mission1:'אחד על אחד-סל מתוך הסמיילי שווה 3 נק',single:false,haveForm:true },

    ],
    'יורו סטפ מהמקום': [
        { _id: 'a156', title: 'יורו סטפ מהצד', url: 'hqZ6mxqA2-w', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70 },
        { _id: 'b156', title: 'יורו סטפ מהאמצע', url: '78q65ZrWYAA', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90 },
        { _id: 'c156', title: 'תרגיל זוגי', url: 'KhcVUqvXU1s',  mission1:'אחד על אחד- סל ביורו-סטפ שווה 4 נק',single:false,haveForm:true},

    ],
    'הטעיית קרוס-אובר': [
        { _id: 'a157', title: 'קרוסאובר לקליעה', url: 'edUjpzEvAGw', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b157', title: 'קרוסאובר בתנועה לפלאוטר', url: 'bdCIrmYny6A', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70},
        { _id: 'd157', title: 'תרגיל  זוגי', url: '2FhzZ429910', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'הכנה לקליעה': [
        { _id: 'a158', title: 'הכנה לקליעה בעזרת קיר', url: 'nKy2gHaC-go', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b158', title: 'הכנה לקליעה בעזרת הלוח', url: 'GwSsZw7yW24', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70},
        { _id: 'c158', title: 'תרגיל מסכם ', url: 'JiCQfQjUU7c',mission1:'20 זריקות מחוץ לקשת לאחר הכנה עצמית',tries:20,single:true,haveForm:true,target:50 },
        { _id: 'd158', title: 'תרגיל  זוגי', url: 'TLtLCb-Ae6A', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'סטפ-בק': [
        { _id: 'a159', title: 'סטפ בק מהמקום', url: 'ldHkDT90XLc', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:50},
        { _id: 'b159', title: 'סטפ בק בתנועה', url: 'c1pC2gLCRUk', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'c159', title: 'תרגיל  מסכם', url: 'HY-xE9WpdXA', mission1:'20 זריקות מחוץ לקשת',tries:20,single:true,haveForm:true,target:50},
        { _id: 'd159', title: 'תרגיל  זוגי', url: 'EeSVhoix12Q', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'כדרור תחת לחץ': [
        { _id: 'a160', title: 'לחץ מגן דמיוני', url: '2ks3oEHf3sc', mission1:'10 זריקות לאחר כדרור נגד לחץ מהחצי',tries:10,single:true,haveForm:true,target:60},
        { _id: 'b160', title: 'תרגיל זוגי', url: 'K8XjL9-vJhQ', mission1:'אחד על אחד תחת לחץ מתחילים מהחצי',single:false,haveForm:true },

    ],
    'כדרור מול לחץ מגרש שלם': [

        { _id: 'a161', title: 'שחרור מלחץ לליאפ', url: '46c-USSWpsA', mission1:'5 מגרשים עם הטעייה כל כמה שניות',tries:10,single:true,haveForm:true,target:100},
        { _id: 'b161', title: 'תרגיל זוגי', url: 'MwSrFj9aQWg', mission1:'אחד על אחד תחת לחץ מגרש שלם',single:false,haveForm:true },

    ],
    'כדרור מסל לסל': [
        { _id: 'a162', title: 'כדרור אחרי ריבאונד', url: 'bPR3NCL3WIA', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:70},
        { _id: 'b162', title: 'תרגיל זוגי', url: 'bTfOg6qh-30', mission1:'אחד על אחד בקצב גבוה על מגרש שלם',single:false,haveForm:true },

    ],
    'כדרור בפיק אנד רול': [
        { _id: 'a163', title: 'פיק-אנד-רול לקליעה', url: 'IjcFpzL4D-w', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:60},
        { _id: 'b163', title: 'סבסוב בפיק-אנד-רול ', url: 'uuI22H-VOgc', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:60},
        { _id: 'c163', title: 'תרגיל זוגי', url: '5GWJoeEUTm4', mission1:'אחד על אחד עם חוסם דמיוני',single:false,haveForm:true },

    ],
    'הרחקת המגן בחדירה': [
        { _id: 'a164', title: 'חדירה מול מגן דמיוני', url: 'FIdSCjcJ76o', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b164', title: 'חדירה מול מגן דמיוני לרוורס לייאפ', url: 'eEdH7iMuRsQ', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:80},
        { _id: 'c164', title: 'תרגיל מסכם', url: 'FPjBWZlE28M', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'd164', title: 'תרגיל זוגי', url: '669ixjjuTZo', mission1:'אחד על אחד רגיל בהתאם לדגשים',single:false,haveForm:true },

    ],
    'סטפ-בק ארוך': [
        { _id: 'a165', title: 'סטפ בק ארוך לחצי מרחק', url: '9-fM7Cyf-bg', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:50},
        { _id: 'b165', title: 'תרגיל  מסכם', url: 'iYktyE8TEnU', mission1:'20 זריקות מחוץ לקשת',tries:20,single:true,haveForm:true,target:40},
        { _id: 'c165', title: 'תרגיל זוגי', url: 'rNO1pykrofw', mission1:'אחד על אחד- סל בסטפ בק ארוך שווה 4 נק',single:false,haveForm:true},
    ],
    'טקס זריקת עונשין': [
        { _id: 'b166', title: 'עונשין בדופק גבוה', url: 'Z7KAZR1_WCE',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'a166', title: 'אתגר עונשין', url: '35rEDunfbUo',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:true,haveForm:false },
        { _id: 'c166', title: 'תרגיל זוגי', url: 'krH6wYaHb7M',mission1:'50 זריקות כל אחד- החלפת סלים אחרי כל זריקה',single:false,haveForm:true },
    ],
    'סבסוב בפוסט-אפ': [
        { _id: 'a167', title: 'סבסוב מול מגן דמיוני', url: '6XvfbzDTos0',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:90 },
        { _id: 'b167', title: 'סבסוב והטעיית זריקה', url: 'cvP_t_3EjA4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'c167', title: 'תרגיל זוגי', url: 'ra0dOGWTDvo',mission1:' אחד על אחד אמריקאי-סל מסבסוב בפוסט שווה 2 נק',single:false,haveForm:true },

    ],
    'צעד וחצי בפוסט-אפ': [
        { _id: 'a168', title: 'סיומת אחרי באמפים', url: 'LAnG5nWOHyU', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b168', title: 'סיומת רחוקה', url: 'qkCVZaoSbr4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'c168', title: 'תרגיל זוגי', url: 'DHoXs3OJo4Y', mission1:' אחד על אחד אמריקאי-סל במעבר טבעת בפוסט שווה 2 נק',single:false,haveForm:true },

    ]
}

exports.getSubVideos = (filterBy) => {
    const videosa = videos[filterBy]
    if(!videosa)
    return videos['אין אאוט'] //temporal
    return videosa
}