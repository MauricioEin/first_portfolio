'use strict'

var gRightSound = new Audio('sound/right.mp3')
var gWrongSound = new Audio('sound/wrong.mp3')
var gVictorySound = new Audio('sound/victory.mp3')
var gBtnDeg = 0

var gHearts = 5
var gMaxHearts = 5
var gQuests = [

]

// gOpts is the options bank, each option[0] is the correct answer. 
var gOpts = [
    ["I ❤ Dalet2", "I ❤ YodAlef7"], ["Oooh nice office man", "Oooh nice sandwich man"],
    ["Let's have a picnic!", "Let's have children!"], ["Mixer -> Micro -> Sink -> Oven -> Fridge", "Mixer -> Sink -> Oven -> Micro -> Fridge"],
    ["Great sense of denyal", "Great sense of reality"], ["Beach Donut", "Pool Pizza"],
    ["Pomelo Trees Forever", "Strawberry Fields Forever"], ["Adam & Steve", "Adam & Eve"],
    ["So dark", "So crowded"], ["Looks familiar", "Never seen this"]
]
var gCurrQuestIdx = 0
var gQuestNum = gOpts.length


function initGame() {
    createQuests()
    turnAround()
    setInterval(turnAround, 1700)
}

function startPlaying() {
    renderHearts()
    renderQuest(gCurrQuestIdx)
    toggleHidden()
}
function renderHearts() {
    var elHearts = document.querySelector('.hearts')
    var heartsStr = ''
    while (heartsStr.length < gHearts * 2) {
        heartsStr += '💖'
    }
    while (heartsStr.length < gMaxHearts * 2) {
        heartsStr += '😰'
    }
    elHearts.innerText = heartsStr

}

function toggleHidden() {
    var elQuest = document.querySelector('.question')
    elQuest.classList.toggle('hidden')
    var elBtn = document.querySelector('button')
    elBtn.classList.toggle('hidden')
}

function createQuests() {
    for (var i = 0; i < gQuestNum; i++) {
        gQuests[i] = { id: i + 1, opts: gOpts[i] }
    }
}

function renderQuest() {
    if (gCurrQuestIdx === gQuestNum) {
        endGame()
    } else {
        var elImg = document.querySelector('img')
        elImg.src = `img/${gCurrQuestIdx + 1}.jpg`
        renderBtns()
    }
}

function renderBtns() {
    var strHtml = ''
    for (let i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        var optHTML = `<div class="option" data-ansnum="${i}" onclick="checkAnswer(this,${i})">${gQuests[gCurrQuestIdx].opts[i]}</div>`
        strHtml = (Math.random() > 0.5) ? strHtml + optHTML : optHTML + strHtml
    }
    var elOpts = document.querySelector('.options')
    elOpts.innerHTML = strHtml

}
function checkAnswer(elBtn, optIdx) {
    if (optIdx === 0) {
        gRightSound.play()
        elBtn.innerText += '\n👏👏👏👏👏'
        gCurrQuestIdx++
        setTimeout(renderQuest, 1500)

    } else {
        gWrongSound.play()
        elBtn.innerText += '\n😕'
        loseHeart()
    }
}
function loseHeart() {
    gHearts --
    renderHearts()
    if (gHearts === 0) endGame()
}

function endGame() {
    var isWin = (gHearts > 0)
    isWin? gVictorySound.play(): gWrongSound.play()
    var elBtn = document.querySelector('button')
    elBtn.innerHTML = isWin? "Way2go!<br/> Play Again 😀 " : "Try again 🌹"
    // elBtn.style.fontSize = "xx-large"
    gCurrQuestIdx = 0
    gHearts = 5
    toggleHidden()
}

function turnAround() {
    var elBtn = document.querySelector('button')
    gBtnDeg += 360
    elBtn.style.transform = `rotate(${gBtnDeg}deg)`
}