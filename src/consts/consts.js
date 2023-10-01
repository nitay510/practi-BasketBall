// app-header
const navLinks = [
    {
        path: '/',
        txt: 'ראשי'
    },
    {
        path: '/about',
        txt: 'אודות'
    },
    {
        path: '/story',
        txt: 'שמורים'
    },
    {
        path: '/quote',
        txt: 'פרוייקטים נוספים'
    },
    {
        path: '/collection',
        txt: 'פעילויות העמותה'
    },
    {
        path: '/ori',
        txt: 'לתרומות'
    },
    {
        path: '/login',
        txt: 'הירשם'
    },
]

const colors = [
    '#C2DDC8',
    '#99BFB3',
    '#E2C547',
    '#CDD1CC',
    '#ACACAC',
    '#D9C1B8',
    '#D97373',
    '#2E5559'
];


const fonts = [
    'Arial, Helvetica, sans-serif',
    'Courier New, Courier, monospace',
    'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    'Times New Roman, Times, serif',
    'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
];


const txtSizes = [
    10, 12, 14, 16, 18, 20
];



const defaultToolbarOptions = [
    {
        type: 'text',
        subTypes: [
            { type: 'font', name: 'פונט', isChosen: true },
            { type: 'color', name: 'צבע', isChosen: false },
            { type: 'size', name: 'גודל', isChosen: false },
        ]
    },
    {
        type: 'img',
        subTypes: [
            { type: 'nature', name: 'טבע', isChosen: true },
            { type: 'still', name: 'דומם', isChosen: false },
            { type: 'symbol', name: 'סמלים', isChosen: false },
        ]
    },

    {
        type: 'frame',
        subTypes: []
    },
    {
        type: 'background',
        subTypes: [
            { type: 'color', name: 'צבע', isChosen: true },
            { type: 'pattern', name: 'תבניות', isChosen: false },
            { type: 'drawing', name: 'איורים', isChosen: false },
            { type: 'photo', name: 'צילומים', isChosen: false }
        ]
    },
]

export {
    colors,
    fonts,
    txtSizes,
    defaultToolbarOptions ,
    navLinks
}