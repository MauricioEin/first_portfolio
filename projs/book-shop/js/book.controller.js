'use strict'


function onInit() {
    doTrans()
    _applyUrlFilters()
    _renderBooks()
    _setEventHandlers()

}

function _setEventHandlers() {
    $('.add-book-btn').click(toggleAddBookModal)
    $('.close-add-book').click(toggleAddBookModal)
    $('.save-book-btn').click(onAddBook)
    // $('.update-btn').click(toggleUpdatePriceModal)
    $('.close-update-price').click(toggleUpdatePriceModal)
    $('.save-update-btn').click(onSaveUpdate)



}

function _renderBooks() {
    const viewMode = getViewMode()
    viewMode === 'cards' ? _renderCards() : _renderTable()
    _disableModeBtn(viewMode)
    doTrans()

}

function _renderHeader(dataFields) {
    document.querySelector('.cards-container').innerHTML = ''
    dataFields.push('actions')
    const headerHTMLS = dataFields.map(field => field === 'imgUrl' ?
        '' : `<th class="${field}-header" onclick="onSortBy('${field}')">
        <span data-trans="datafield-${field}">${capitalize(field)}</span> <span class="${field}-asc-arrow"></span></th>`)
    document.querySelector('thead').innerHTML = headerHTMLS.join('')
}

function _renderTable() {
    document.querySelector('.cards-container').innerHTML = ''
    const books = getBooksforDisplay()
    const dataFields = getTableHeads()
    _renderHeader(dataFields)
    const bookHtmls = books.map(book => '<tr>' +
        dataFields.map(field => {
            if (field !== 'imgUrl' && book[field] !== undefined)
                return `<td>${book[field]}</td>`
        }).join('') + _renderBookActions(book.id, true) + '</tr>'
    )
    document.querySelector('tbody').innerHTML = bookHtmls.join('')
    _setPageBtnsDisable()
}

function _renderCards() {
    document.querySelector('thead').innerHTML = ''
    document.querySelector('tbody').innerHTML = ''
    const books = getBooksforDisplay()
    const dataFields = getTableHeads()
    dataFields.unshift(dataFields.splice(dataFields.indexOf('imgUrl'), 1)[0])
    const bookHtmls = books.map(book => '<div class="book-box">' +
        dataFields.map(field => field === 'imgUrl' ?
            `<div><img src="${book[field]}"/> </div> <div class="book-data">` :
            `<span class="${field}-asc-arrow"></span>
            <span class="field-name" data-trans="datafield-${field}" onclick="onSortBy('${field}')" >
            ${capitalize(field)}</span>:  ${book[field]}<br/>`
        ).join('') + `</div>${_renderBookActions(book.id, false)}</div>`
    )
    document.querySelector('.cards-container').innerHTML = bookHtmls.join('')
    _setPageBtnsDisable()
}

function _renderBookActions(bookId, isTable) {
    const actions = getActions()
    var btnTdHTML = isTable ? '<td>' : '<div class="action-btns">'
    actions.forEach(action => btnTdHTML +=
        `<button class="${action}-btn" data-trans="action-btn-${action}"
       onclick="on${capitalize(action)}('${bookId}')" >${action}</button>`)
    btnTdHTML += isTable ? '</td>' : '</div > '
    return btnTdHTML
}

function onRead(bookId) {
    $('.modal-background').show()
    const book = getBookById(bookId)
    const elModal = document.querySelector('.modal1')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('.id .to-render').innerText = book.id
    elModal.querySelector('.price .to-render').innerText = book.price
    elModal.querySelector('img').src = book.imgUrl
    elModal.querySelector('.rate').innerHTML = `<button class="minus" onclick="onRateChange('${book.id}',-1)">-</button>
    <span>${book.rate}</span>
    <button class="plus" onclick="onRateChange('${book.id}',1)">+</button>`
    _setRateBtnsDisable(book.rate)
    elModal.classList.add('open')
    _updateBookUrl(book.id)
}

function onCloseModal() {
    $('.modal-background').hide()
    document.querySelector('.modal1').classList.remove('open')

    _updateBookUrl()
}



function onRateChange(bookId, dif) {
    rateChange(bookId, dif)
    _setRateBtnsDisable(getBookById(bookId).rate)
    document.querySelector('.rate span').innerText = getBookById(bookId).rate
    _renderBooks()
}

function _setRateBtnsDisable(rate) {
    document.querySelector('.plus').disabled = rate >= 10
    document.querySelector('.minus').disabled = rate <= 0
}


function onUpdate(bookId) {
    toggleUpdatePriceModal()
    $('#new-price').data('bookId', bookId)
}

function onSaveUpdate(ev) {
    ev.preventDefault()
    const newPrice = +$('#new-price').val()
    if (!newPrice || isNaN(newPrice)) return
    updateBook($('#new-price').data('bookId'), newPrice)
    toggleUpdatePriceModal()
    _renderBooks()
}

function onDelete(bookId) {
    deleteBook(bookId)
    _renderBooks()
}
function onAddBook(ev) {
    ev.preventDefault()
    const name = $('#book-name').val()
    const price = +$('#book-price').val()
    if (!name || !price || isNaN(price)) return
    addBook(name, price)
    toggleAddBookModal()
    _renderBooks()
}


function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
    _renderBooks()
    const newUrl = _createFilteredUrl()
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function _createFilteredUrl() {
    const queryStringParams = _createQueryStringParams()
    const newUrl = window.location.protocol + "//" + window.location.host
        + window.location.pathname + queryStringParams
    return newUrl

}

function _createQueryStringParams() {
    const filters = getFilters()
    var queryStringParams = '?'
    for (var filter in filters) queryStringParams += `${filter}=${filters[filter]}&`
    return queryStringParams.slice(0, -1)
}

function _applyUrlFilters() {
    const filters = _getUrlFilters()
    filters.forEach(filter => {
        if (filter.type === 'bookId') {
            if (filter.value) onRead(filter.value)
        } else if (filter.type === 'lang') {
            if (filter.value) onSetLang(filter.value)
        } else {
            setFilterBy(filter)
            document.querySelector(`.${filter.type}-filter`).value = filter.value
        }
    })
}

function _getUrlFilters() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filters = [
        { type: 'txt', value: queryStringParams.get('txt') || '' },
        { type: 'maxPrice', value: +queryStringParams.get('maxPrice') || 250 },
        { type: 'minRate', value: +queryStringParams.get('minRate') || 0 },
        { type: 'bookId', value: queryStringParams.get('bookId') || '' },
        { type: 'lang', value: queryStringParams.get('lang') || 'he' }
    ]
    return filters
}

function _updateBookUrl(id = null) {
    var newUrl = _createFilteredUrl()
    if (id) newUrl += `&bookId=${id}`
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onChangePage(dif) {
    changePage(dif)
    _renderBooks()
}

function _setPageBtnsDisable() {
    const pageIdx = getPageIdx()
    const pageSize = getPageSize()
    const numOfBooks = getFilteredNum()
    document.querySelector('.prev-page').disabled = pageIdx === 0
    document.querySelector('.next-page').disabled = (pageIdx + 1) * pageSize >= numOfBooks
}

function onSortBy(criterion) {
    if (criterion === 'actions') return
    const isAscendig = sortBy(criterion)
    _renderBooks()
    // _clearSortingArrows()
    $(`.${criterion}-asc-arrow`).text(isAscendig ? '▲' : '▼')
}

// function _clearSortingArrows() {
//     console.log('exception:', exception)
//     const elHeaders = document.querySelectorAll('th')
//     elHeaders.forEach(elHeader => {
//         elHeader.querySelector('.asc-arrow').innerText = ''
//     })
// }

function onChangeMode(mode) {
    changeMode(mode)
    _renderBooks()
    _disableModeBtn(mode)
}

function _disableModeBtn(mode) {
    const elBtns = document.querySelectorAll('.view button')
    elBtns.forEach(elBtn => {
        elBtn.disabled = elBtn.classList.contains(`to-${mode}-btn`) ? true : false
    })

}

function onSetLang(lang) {
    setLang(lang)
    _setDirection(lang)
    doTrans()
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function _setDirection(lang) {
    if (lang === 'he') {
        document.body.classList.add('rtl')
        // document.documentElement.dir = 'rtl'
        // document.documentElement.lang = 'he'
    }
    else document.body.classList.remove('rtl')
}


function toggleAddBookModal() {
    $('.add-book-modal').toggle()
    $('.modal-background').toggle()

}

function toggleUpdatePriceModal() {
    $('.update-price-modal').toggle()
    $('.modal-background').toggle()

}