const TEMPLATE_STORAGE_KEY = 'template'
const LINES_STORAGE_KEY = 'lines'

export const storageService = {
    saveQuoteToStorage,
    saveLinesToStorage,
    getLinesFromStorage,
    getQuoteFromStorage
}

function saveQuoteToStorage(template) {
    localStorage[TEMPLATE_STORAGE_KEY] = JSON.stringify(template)
}

function saveLinesToStorage(lines) {
    localStorage[LINES_STORAGE_KEY] = JSON.stringify(lines)
}

function getLinesFromStorage() {
    return JSON.parse(localStorage.getItem(LINES_STORAGE_KEY)) || []
}

function getQuoteFromStorage() {
    return JSON.parse(localStorage.getItem(TEMPLATE_STORAGE_KEY))
}