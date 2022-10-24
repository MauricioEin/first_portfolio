'use strict'

var gBoardSide = 4
var gNextNum
var gIsGameStarted
var gNums
var gTimeInterval
var gStartTime
var gTimePassed
var gHighscores = { 4: Infinity, 5: Infinity, 6: Infinity }

function initGame() {
    setVars()
    fillNumArr()
    renderBoard()
    renderNext()

}

function setVars() {
    gNextNum = 1
    gIsGameStarted = false
    gNums = []
    clearInterval(gTimeInterval)
}

function fillNumArr() {
    for (var i = 1; i <= gBoardSide ** 2; i++) {
        gNums.push(i)
    }
}


function renderBoard() {
    var elBrd = document.querySelector('.board')
    elBrd.innerHTML = createBrdHTML()
}

function createBrdHTML() {
    var strHTML = ''
    for (var i = 0; i < gBoardSide; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoardSide; j++) {
            var num = drawNum()
            strHTML += `<td data-num="${num}" onclick="cellClicked(${num})">${num}</td>`
        }
        strHTML += '</tr>'

    }
    return strHTML
}

function drawNum() {
    return gNums.splice(Math.floor(Math.random() * gNums.length), 1)[0]
}

function cellClicked(num) {
    if (num === gNextNum) {
        var elCell = document.querySelector(`[data-num="${num}"]`)
        elCell.style.backgroundColor = 'cornflowerblue'
        gNextNum++
        renderNext()
        if (num === gBoardSide ** 2) endGame()
    }
    if (!gIsGameStarted) {
        gIsGameStarted = true
        startTime()
    }
}

function startTime() {
    gStartTime = Date.now()
    gTimeInterval = setInterval(renderTime, 10)
}

function renderTime() {
    var elTimeSpan = document.querySelector('.time span')
    gTimePassed = ((Date.now() - gStartTime) / 1000).toFixed(3)
    elTimeSpan.innerText = gTimePassed
}

function renderNext() {
    if (gNextNum > gBoardSide ** 2) return
    var elNextSpan = document.querySelector('.next span')
    elNextSpan.innerText = gNextNum
}

function endGame() {
    clearInterval(gTimeInterval)
    gHighscores[gBoardSide] = Math.min(gHighscores[gBoardSide], gTimePassed)
    var elHiScore = document.querySelector(`.highscore${gBoardSide}`)
    elHiScore.innerText = `High Score in ${gBoardSide}x${gBoardSide}: ${gHighscores[gBoardSide]}`
    var elBtn = document.querySelector('.gameover button')
    elBtn.onclick = initGame
    elBtn.style.opacity = '100%'
    elBtn.style.cursor= 'pointer'
}

function changeSize(num) {
    if (num === gBoardSide) return
    const elNewLevel = document.querySelector(`[data-size="${num}"]`)
    const elCurrLevel = document.querySelector(`[data-size="${gBoardSide}"]`)
    elNewLevel.classList.add('chosen')
    elNewLevel.classList.remove('unchosen')
    elCurrLevel.classList.remove('chosen')
    elCurrLevel.classList.add('unchosen')
    gBoardSide = num
    initGame()
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}