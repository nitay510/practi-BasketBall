const videos = {
    
    'באמפ יורו סטפ': [
        { _id: 'a150', title: 'תרגיל מול מגן דמיוני', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686167/pract-subVideos/%D7%91%D7%90%D7%9E%D7%A4_%D7%99%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_1_w1lcdu.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'c150', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686128/pract-subVideos/%D7%91%D7%90%D7%9E%D7%A4_%D7%99%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4_-_%D7%96%D7%95%D7%92%D7%99_r7plma.mp4', mission1:'אחד על אחד- סל בבאמפ יורו-סטפ שווה 4 נק',single:false,haveForm:true},
    ],
    'אין אאוט': [
        { _id: 'a151', title: 'אין אאוט לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547651/pract-subVideos/%D7%90%D7%99%D7%A0%D7%90%D7%90%D7%95%D7%98_%D7%99%D7%97%D7%99%D7%93_1_snwaqp.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b151', title: 'אין אאוט במעבר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686105/pract-subVideos/%D7%90%D7%99%D7%A0%D7%90%D7%90%D7%95%D7%98_-_%D7%99%D7%97%D7%99%D7%93_akxgjk.mp4',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:true,haveForm:true,target:70},
        { _id: 'c151', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694703882/practi/%D7%90%D7%99%D7%A0-%D7%90%D7%90%D7%95%D7%98_%D7%96%D7%95%D7%92%D7%99_semwo8.mp4',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true},

    ],
    'הטעיית השהייה': [
        { _id: 'a152', title: 'הטעיית השהייה לליאפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686140/pract-subVideos/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_-_%D7%99%D7%97%D7%99%D7%93_1_pzqrq0.mp4', mission1:'10 זריקות מכל צד',tries:10,single:true,haveForm:true,target:100},
        { _id: 'b152', title: 'הטעיית השהייה לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686147/pract-subVideos/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_-_%D7%99%D7%97%D7%99%D7%93_t1ivfo.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'd152', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694706700/practi/%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_%D7%96%D7%95%D7%92%D7%99_ohnp1q.mp4', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:10,single:false,haveForm:true },

    ],
    'באמפים בפוסט-אפ': [
        { _id: 'a153', title: 'באמפים מול הקיר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547667/pract-subVideos/%D7%91%D7%90%D7%9E%D7%A4%D7%99%D7%9D_%D7%91%D7%A4%D7%95%D7%A1%D7%98%D7%90%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_cdohl0.mp4',mission1:'20 זריקות מחוץ לקשת לאחר גב-סטפ',tries:10,single:true,haveForm:true,target:80},
        { _id: 'b153', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547619/pract-subVideos/%D7%91%D7%90%D7%9E%D7%A4%D7%99%D7%9D_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%96%D7%95%D7%92%D7%99_l1hegv.mp4',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:false },

    ],
    'גב סטפ': [
        { _id: 'a154', title: 'גב סטפ לחדירה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686140/pract-subVideos/%D7%94%D7%98%D7%A2%D7%99%D7%99%D7%AA_%D7%94%D7%A9%D7%94%D7%99%D7%99%D7%94_-_%D7%99%D7%97%D7%99%D7%93_1_pzqrq0.mp4', mission1:'10 זריקות מכל צד',tries:40,single:true,haveForm:true,target:80},
        { _id: 'b154', title: 'גב סטפ לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686165/pract-subVideos/%D7%92_%D7%91_%D7%A1%D7%98%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_2_rdnhpy.mp4', mission1:'10 זריקות מכל צד',tries:40,single:true,haveForm:true,target:60},
        { _id: 'c154', title: 'תרגיל מסכם', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686167/pract-subVideos/%D7%92_%D7%91_%D7%A1%D7%98%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_%D7%9E%D7%A1%D7%9B%D7%9D_tnyad5.mp4',mission1:'20 זריקות מחוץ לקשת לאחר גב-סטפ',tries:20,single:true,haveForm:true,target:50},
        { _id: 'd154', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694706271/practi/%D7%92%D7%91_%D7%A1%D7%98%D7%A4_%D7%96%D7%95%D7%92%D7%99_zulzq3.mp4', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'חדירה מול מגן גבוה': [
        { _id: 'a155', title: 'חדירה מהמקום', url: 'https://www.youtube.com/watch?v=CbJ91TrOFKI', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b155', title: 'חדירה למעבר טבעת', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686393/pract-subVideos/%D7%97%D7%93%D7%99%D7%A8%D7%94_%D7%9E%D7%95%D7%9C_%D7%9E%D7%92%D7%9F_%D7%92%D7%91%D7%95%D7%94_-_%D7%99%D7%97%D7%99%D7%93_2_zn6goh.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'd155', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686272/pract-subVideos/%D7%97%D7%93%D7%99%D7%A8%D7%94_%D7%9E%D7%95%D7%9C_%D7%9E%D7%92%D7%9F_%D7%92%D7%91%D7%95%D7%94_-_%D7%96%D7%95%D7%92%D7%99_rx8kha.mp4',mission1:'אחד על אחד-סל מתוך הסמיילי שווה 3 נק',single:false,haveForm:true },

    ],
    'יורו סטפ מהמקום': [
        { _id: 'a156', title: 'יורו סטפ מהצד', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686392/pract-subVideos/%D7%99%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4_%D7%9E%D7%94%D7%9E%D7%A7%D7%95%D7%9D_-_%D7%99%D7%97%D7%99%D7%93_mhijqu.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70 },
        { _id: 'b156', title: 'יורו סטפ מהאמצע', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686392/pract-subVideos/%D7%99%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4_%D7%9E%D7%94%D7%9E%D7%A7%D7%95%D7%9D_-_%D7%99%D7%97%D7%99%D7%93_mhijqu.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90 },
        { _id: 'c156', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686410/pract-subVideos/%D7%99%D7%95%D7%A8%D7%95%D7%A1%D7%98%D7%A4_%D7%9E%D7%94%D7%9E%D7%A7%D7%95%D7%9D_-_%D7%96%D7%95%D7%92%D7%99_1_xypdbj.mp4',  mission1:'אחד על אחד- סל ביורו-סטפ שווה 4 נק',single:false,haveForm:true},

    ],
    'הטעיית קרוס-אובר': [
        { _id: 'a157', title: 'קרוסאובר לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686440/pract-subVideos/%D7%A7%D7%A8%D7%95%D7%A1%D7%90%D7%95%D7%91%D7%A8_-_%D7%99%D7%97%D7%99%D7%93_axwvch.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b157', title: 'קרוסאובר בתנועה לפלאוטר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686447/pract-subVideos/%D7%A7%D7%A8%D7%95%D7%A1%D7%90%D7%95%D7%91%D7%A8_-_%D7%99%D7%97%D7%99%D7%93_1_lrcurn.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70},
        { _id: 'd157', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694708109/practi/%D7%A7%D7%A8%D7%95%D7%A1%D7%90%D7%95%D7%91%D7%A8_%D7%96%D7%95%D7%92%D7%99_t3vt2o.mp4', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'הכנה לקליעה': [
        { _id: 'a158', title: 'הכנה לקליעה בעזרת קיר', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686170/pract-subVideos/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_-_%D7%99%D7%97%D7%99%D7%93_1_elqe8q.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'b158', title: 'הכנה לקליעה בעזרת הלוח', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686174/pract-subVideos/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_-_%D7%99%D7%97%D7%99%D7%93_1_1_izkwiz.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:70},
        { _id: 'c158', title: 'תרגיל מסכם ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686179/pract-subVideos/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_-_%D7%99%D7%97%D7%99%D7%93_%D7%9E%D7%A1%D7%9B%D7%9D_ccyrbm.mp4',mission1:'20 זריקות מחוץ לקשת לאחר הכנה עצמית',tries:20,single:true,haveForm:true,target:50 },
        { _id: 'd158', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694706256/practi/%D7%94%D7%9B%D7%A0%D7%94_%D7%9C%D7%A7%D7%9C%D7%99%D7%A2%D7%94_%D7%96%D7%95%D7%92%D7%99_pquupd.mp4', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'סטפ-בק': [
        { _id: 'a159', title: 'סטפ בק מהמקום', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686443/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_-_%D7%99%D7%97%D7%99%D7%93_1_pap4ln.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:50},
        { _id: 'b159', title: 'סטפ בק בתנועה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686481/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_-_%D7%99%D7%97%D7%99%D7%93_vbzd71.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'c159', title: 'תרגיל  מסכם', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686465/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_-_%D7%99%D7%97%D7%99%D7%93_%D7%9E%D7%A1%D7%9B%D7%9D_maosl5.mp4', mission1:'20 זריקות מחוץ לקשת',tries:20,single:true,haveForm:true,target:50},
        { _id: 'd159', title: 'תרגיל  זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1694707757/practi/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%96%D7%95%D7%92%D7%99_fgv3cf.mp4', mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:false,haveForm:true },

    ],
    'כדרור תחת לחץ': [
        { _id: 'a160', title: 'לחץ מגן דמיוני', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686425/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%AA%D7%97%D7%AA_%D7%9C%D7%97%D7%A5_-_%D7%99%D7%97%D7%99%D7%93_sk3ask.mp4', mission1:'10 זריקות לאחר כדרור נגד לחץ מהחצי',tries:10,single:true,haveForm:true,target:60},
        { _id: 'b160', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686433/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%AA%D7%97%D7%AA_%D7%9C%D7%97%D7%A5_-_%D7%AA%D7%A8%D7%92%D7%95%D7%9C_%D7%96%D7%95%D7%92%D7%99_z6fxri.mp4', mission1:'אחד על אחד תחת לחץ מתחילים מהחצי',single:false,haveForm:true },

    ],
    'כדרור מול לחץ מגרש שלם': [

        { _id: 'a161', title: 'שחרור מלחץ לליאפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547684/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%A0%D7%92%D7%93_%D7%9C%D7%97%D7%A5_%D7%9E%D7%92%D7%A8%D7%A9_%D7%A9%D7%9C%D7%9D_-_%D7%99%D7%97%D7%99%D7%93_1_embqrr.mp4', mission1:'5 מגרשים עם הטעייה כל כמה שניות',tries:10,single:true,haveForm:true,target:100},
        { _id: 'b161', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686419/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%A0%D7%92%D7%93_%D7%9C%D7%97%D7%A5_%D7%9E%D7%92%D7%A8%D7%A9_%D7%A9%D7%9C%D7%9D_-_%D7%96%D7%95%D7%92%D7%99_kxiwjt.mp4', mission1:'אחד על אחד תחת לחץ מגרש שלם',single:false,haveForm:true },

    ],
    'כדרור מסל לסל': [
        { _id: 'a162', title: 'כדרור אחרי ריבאונד', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547684/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%A0%D7%92%D7%93_%D7%9C%D7%97%D7%A5_%D7%9E%D7%92%D7%A8%D7%A9_%D7%A9%D7%9C%D7%9D_-_%D7%99%D7%97%D7%99%D7%93_1_embqrr.mp4', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:70},
        { _id: 'b162', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686420/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%9E%D7%A1%D7%9C_%D7%9C%D7%A1%D7%9C_-_%D7%AA%D7%A8%D7%92%D7%95%D7%9C_%D7%96%D7%95%D7%92%D7%99_xk9jrd.mp4', mission1:'אחד על אחד בקצב גבוה על מגרש שלם',single:false,haveForm:true },

    ],
    'כדרור בפיק אנד רול': [
        { _id: 'a163', title: 'פיק-אנד-רול לקליעה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547665/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%91%D7%A4%D7%99%D7%A7%D7%A0%D7%A8%D7%95%D7%9C_%D7%99%D7%97%D7%99%D7%93_1_voa0cu.mp4', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:60},
        { _id: 'b163', title: 'סבסוב בפיק-אנד-רול ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547671/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%91%D7%A4%D7%99%D7%A7%D7%A0%D7%A8%D7%95%D7%9C_%D7%99%D7%97%D7%99%D7%93_2_vclgqd.mp4', mission1:'10 מעברי מגרש מהירים עם סיומת של פלאוטר',tries:10,single:true,haveForm:true,target:60},
        { _id: 'c163', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686420/pract-subVideos/%D7%9B%D7%93%D7%A8%D7%95%D7%A8_%D7%91%D7%A4%D7%99%D7%A7%D7%A0%D7%A8%D7%95%D7%9C_-_%D7%96%D7%95%D7%92%D7%99_mwa24k.mp4', mission1:'אחד על אחד עם חוסם דמיוני',single:false,haveForm:true },

    ],
    'הרחקת המגן בחדירה': [
        { _id: 'a164', title: 'חדירה מול מגן דמיוני', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686391/pract-subVideos/%D7%94%D7%A8%D7%97%D7%A7%D7%AA_%D7%94%D7%9E%D7%92%D7%9F_%D7%91%D7%97%D7%93%D7%99%D7%A8%D7%94_-_%D7%99%D7%97%D7%99%D7%93_1_cbqpzs.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b164', title: 'חדירה מול מגן דמיוני לרוורס לייאפ', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686393/pract-subVideos/%D7%97%D7%93%D7%99%D7%A8%D7%94_%D7%9E%D7%95%D7%9C_%D7%9E%D7%92%D7%9F_%D7%92%D7%91%D7%95%D7%94_-_%D7%99%D7%97%D7%99%D7%93_2_zn6goh.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:80},
        { _id: 'c164', title: 'תרגיל מסכם', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686384/pract-subVideos/%D7%94%D7%A8%D7%97%D7%A7%D7%AA_%D7%94%D7%9E%D7%92%D7%9F_%D7%91%D7%97%D7%93%D7%99%D7%A8%D7%94_-_%D7%99%D7%97%D7%99%D7%93_%D7%9E%D7%A1%D7%9B%D7%9D_r05gor.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:60},
        { _id: 'd164', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686283/pract-subVideos/%D7%94%D7%A8%D7%97%D7%A7%D7%AA_%D7%94%D7%9E%D7%92%D7%9F_%D7%91%D7%97%D7%93%D7%99%D7%A8%D7%94_-_%D7%96%D7%95%D7%92%D7%99_ua7iny.mp4', mission1:'אחד על אחד רגיל בהתאם לדגשים',single:false,haveForm:true },

    ],
    'סטפ-בק ארוך': [
        { _id: 'a165', title: 'סטפ בק ארוך לחצי מרחק', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686461/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_-_%D7%99%D7%97%D7%99%D7%93_1_umuiov.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:50},
        { _id: 'b165', title: 'תרגיל  מסכם', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686465/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_-_%D7%99%D7%97%D7%99%D7%93_%D7%9E%D7%A1%D7%9B%D7%9D_maosl5.mp4', mission1:'20 זריקות מחוץ לקשת',tries:20,single:true,haveForm:true,target:40},
        { _id: 'c165', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686446/pract-subVideos/%D7%A1%D7%98%D7%A4_%D7%91%D7%A7_%D7%90%D7%A8%D7%95%D7%9A_-_%D7%96%D7%95%D7%92%D7%99_a5ydoe.mp4', mission1:'אחד על אחד- סל בסטפ בק ארוך שווה 4 נק',single:false,haveForm:true},
    ],
    'זריקת עונשין': [
        { _id: 'b166', title: 'עונשין בדופק גבוה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686415/pract-subVideos/%D7%98%D7%A7%D7%A1_%D7%A2%D7%95%D7%A0%D7%A9%D7%99%D7%9F_-_%D7%99%D7%97%D7%99%D7%93_znnjgk.mp4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'a166', title: 'אתגר עונשין', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686454/pract-subVideos/%D7%98%D7%A7%D7%A1_%D7%A2%D7%95%D7%A0%D7%A9%D7%99%D7%9F_-_%D7%99%D7%97%D7%99%D7%93_1_dukvgc.mp4',mission1:' 20 זריקות בשמאל + 20 זריקות בימין',tries:20,single:true,haveForm:false },
        { _id: 'c166', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686396/pract-subVideos/%D7%98%D7%A7%D7%A1_%D7%A2%D7%95%D7%A0%D7%A9%D7%99%D7%9F_-_%D7%96%D7%95%D7%92%D7%99_gvvvjy.mp4',mission1:'50 זריקות כל אחד- החלפת סלים אחרי כל זריקה',single:false,haveForm:true },
    ],
    'סבסוב בפוסט-אפ': [
        { _id: 'a167', title: 'סבסוב מול מגן דמיוני', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547667/pract-subVideos/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_1_ybnxbw.mp4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:90 },
        { _id: 'b167', title: 'סבסוב והטעיית זריקה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547673/pract-subVideos/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_2_egyljj.mp4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'c167', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686439/pract-subVideos/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%96%D7%95%D7%92%D7%99_bipizt.mp4',mission1:' אחד על אחד אמריקאי-סל מסבסוב בפוסט שווה 2 נק',single:false,haveForm:true },

    ],
    'מעבר טבעת בפוסט-אפ': [
        { _id: 'a168', title: 'סיומת אחרי באמפים', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547652/pract-subVideos/%D7%A6%D7%A2%D7%93_%D7%95%D7%97%D7%A6%D7%99_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%99%D7%97%D7%99%D7%93_1_lhfktf.mp4', mission1:'10 זריקות מכל צד',tries:20,single:true,haveForm:true,target:90},
        { _id: 'b168', title: 'סיומת רחוקה', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1702547712/pract-subVideos/%D7%A6%D7%A2%D7%93_%D7%95%D7%97%D7%A6%D7%99_%D7%91%D7%A4%D7%95%D7%A1%D7%98_%D7%90%D7%A4_-_%D7%99%D7%97%D7%99%D7%932_tura7s.mp4',mission1:'20 זריקות בדופק גבוה',tries:20,single:true,haveForm:true,target:80 },
        { _id: 'c168', title: 'תרגיל זוגי', url: 'https://res.cloudinary.com/dkkwzdeua/video/upload/v1701686462/pract-subVideos/%D7%A6%D7%A2%D7%93_%D7%95%D7%97%D7%A6%D7%99_%D7%91%D7%A4%D7%95%D7%A1%D7%98%D7%90%D7%A4_-_%D7%96%D7%95%D7%92%D7%99_xhxinh.mp4', mission1:' אחד על אחד אמריקאי-סל במעבר טבעת בפוסט שווה 2 נק',single:false,haveForm:true },

    ]
}

exports.getSubVideos = (filterBy) => {
    const videosa = videos[filterBy]
    if(!videosa)
    return videos['אין אאוט'] //temporal
    return videosa
}