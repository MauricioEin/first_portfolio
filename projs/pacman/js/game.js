'use strict'

const WALL = '🎀'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🥦'
const CHERRY = '🍒'


var gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard
var gCherryInterval

function init() {
    document.querySelector('.modal').style.display = 'none'
    gGame.score = 0
    gGame.isOn = true
    gGame.foodCount = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    document.querySelector('h2 span').innerText = gGame.score
    gCherryInterval = setInterval(addCherry, 15000)
}

function buildBoard() {
    const SIZE = 10
    const board = []
    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gGame.foodCount++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    board[1][1] = board[1][SIZE - 2] = board[SIZE - 2][SIZE - 2] = board[SIZE - 2][1] = POWER_FOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score > gGame.foodCount) endGame()
}

function endGame() {
    const endMsg = (gGame.score > gGame.foodCount) ? '🥇 You Did It! 🥈' : '😓 Game Over 😓'
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    const elModal = document.querySelector('.modal')
    elModal.querySelector('span').innerText = endMsg
    elModal.style.display = 'block'
}

function addCherry() {
    const pos = getEmptyPos(gBoard)
    if (!pos) return
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
}

