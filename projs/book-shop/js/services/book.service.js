'use strict'

const BOOKS_STORAGE_KEY = 'bookDB'
const MODE_STORAGE_KEY = 'viewMode'
const GENERAL_IMG_URL = 'img/general-book.jpg'
const MAX_RATE = 10
const MIN_RATE = 0
const gActions = ['read', 'update', 'delete']
const gFilterBy = {
    txt: '',
    minRate: 0,
    maxPrice: 250
}
const PAGE_SIZE = 10

var gPageIdx = 0
var gBooks
var gFilteredNum
var gLastSort
var gViewMode


_createBooks()
_setViewMode()

function getBooksforDisplay() {
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate &&
        book.name.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    gFilteredNum = books.length
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function getTableHeads() {
    return Object.keys(gBooks[0])
}

function getActions() {
    return gActions
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function deleteBook(bookId) {
    const idxToDel = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idxToDel, 1)
    _saveBooksToStorage()
}
function updateBook(bookId, price) {
    getBookById(bookId).price = price
    _saveBooksToStorage()
}

function addBook(name, price) {
    const newBook = _createBook(name, price)
    gBooks.unshift(newBook)
    _saveBooksToStorage()
}

function rateChange(bookId, dif) {
    const book = getBookById(bookId)
    book.rate += dif
    _saveBooksToStorage()
}

function setFilterBy(filterBy) {
    gFilterBy[filterBy.type] = filterBy.value
    gPageIdx = 0
}

function getFilters() {
    return gFilterBy
}

function changePage(dif) {
    gPageIdx += dif
}

function getPageIdx() {
    return gPageIdx
}

function getPageSize() {
    return PAGE_SIZE
}

function getFilteredNum() {
    return gFilteredNum
}

function sortBy(criterion) {
    const factor = (gLastSort === criterion) ? -1 : 1
    if (criterion === 'price' || criterion === 'rate')
        gBooks.sort((book1, book2) => factor * (book1[criterion] - book2[criterion]))
    else gBooks.sort((book1, book2) => factor * (book1[criterion].localeCompare(book2[criterion])))
    gLastSort = (gLastSort === criterion) ? null : criterion
    return factor > 0
}


function getViewMode() {
    return gViewMode
}

function changeMode(mode) {
    gViewMode = mode
    _saveModeToStorage()
}

function _createBooks() {
    var books = loadFromStorage(BOOKS_STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 21; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name = makeName(), price = getRandomIntInclusive(10, 250), rate = 0, imgUrl = GENERAL_IMG_URL) {
    return {
        id: makeId(),
        name,
        price,
        rate,
        imgUrl
    }
}

function _saveBooksToStorage() {
    saveToStorage(BOOKS_STORAGE_KEY, gBooks)
}

function _setViewMode(){
    var mode = loadFromStorage(MODE_STORAGE_KEY)
    gViewMode = mode? mode: 'table'
    _saveModeToStorage()
}

function _saveModeToStorage() {
    saveToStorage(MODE_STORAGE_KEY, gViewMode)
}
