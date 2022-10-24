'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'
const BALL = 'BALL'
const GAMER = 'GAMER'
const MAGNET = 'MAGNET'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'
const MAGNET_IMG = '<img src="img/magnet.png">'
const STUCK_IMG = '<img src="img/gamer-purple.png">'

var SUCCESS_SOUND = new Audio('sound/success.wav')


var gBoard
var gGamerPos
var gCollectCount
var gBallsOnBoard
var gBallsInterval
var gMagnetInterval
var gFloorColorInterval
var gIsStuck = false

function onInitGame() {
	document.querySelector('button').style.display = 'none'
	document.querySelector('.score').innerText = ''
	resetIntervals()
	gGamerPos = { i: 2, j: 9 }
	gBoard = buildBoard()
	renderBoard(gBoard)
	gCollectCount = 0
}

function buildBoard() {
	var board = createMat(10, 12)
	var halfI = parseInt(board.length / 2)
	var halfJ = parseInt(board[0].length / 2)

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			board[i][j] = { type: FLOOR, gameElement: null }
			if ((i === 0 || i === board.length - 1 ||
				j === 0 || j === board[0].length - 1)
				&& (i !== halfI && j !== halfJ)) {
				board[i][j].type = WALL
			}

		}
	}

	// Place the gamer and two balls
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
	board[3][5].gameElement = BALL
	board[7][3].gameElement = BALL
	gBallsOnBoard = 2
	return board
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = ''
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j]
			var cellClass = getClassName({ i: i, j: j }) // cell-0-0

			if (currCell.type === FLOOR) cellClass += ' floor'
			else if (currCell.type === WALL) cellClass += ' wall'

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n'

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG
			}

			strHTML += '\t</td>\n'
		}
		strHTML += '</tr>\n'
	}
	var elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHTML
}

function resetIntervals() {
	clearInterval(gFloorColorInterval)
	gBallsInterval = setInterval(addBall, 2000)
	gMagnetInterval = setInterval(addMagnet, 5000)
}

// Move the player to a specific location
function moveTo(i, j) {
	var targetCell = gBoard[i][j]
	if (gIsStuck || targetCell.type === WALL) return

	var iAbsDiff = Math.abs(i - gGamerPos.i)
	var jAbsDiff = Math.abs(j - gGamerPos.j)
	if (!((iAbsDiff === 1 || iAbsDiff === gBoard.length - 1) && jAbsDiff === 0) &&
		!((jAbsDiff === 1 || jAbsDiff === gBoard[0].length - 1) && iAbsDiff === 0)) {
		return
	}
	var targetOrgnlElement = targetCell.gameElement

	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
	renderCell(gGamerPos, '')

	gGamerPos.i = i
	gGamerPos.j = j
	targetCell.gameElement = GAMER
	renderCell(gGamerPos, GAMER_IMG)

	if (targetOrgnlElement === BALL) {
		SUCCESS_SOUND.play()
		gCollectCount++
		renderBallCount()
		gBallsOnBoard--
		if (gBallsOnBoard === 0) endGame()
	}

	else if (targetOrgnlElement === MAGNET) {
		getStuck()
	}

}

function getStuck() {
	gIsStuck = true
	renderCell(gGamerPos, STUCK_IMG)
	setTimeout(() => {
		gIsStuck = false
		renderCell(gGamerPos, GAMER_IMG)
	}, 3000)
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location) // .cell-0-0
	var elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}

function renderBallCount() {
	var elScore = document.querySelector('.score')
	elScore.innerText = 'Balls collected: ' + gCollectCount
	elScore.style.color = getRandomColor()
}

// Move the player by keyboard arrows
function onHandleKey(event) {
	// console.log('event.key', event.key)
	var i = gGamerPos.i
	var j = gGamerPos.j

	switch (event.key) {
		case 'ArrowLeft':
			(j === 0) ? moveTo(i, gBoard[0].length - 1) : moveTo(i, j - 1)
			break
		case 'ArrowRight':
			(j === gBoard[0].length - 1) ? moveTo(i, 0) : moveTo(i, j + 1)
			break
		case 'ArrowUp':
			(i === 0) ? moveTo(gBoard.length - 1, j) : moveTo(i - 1, j)
			break
		case 'ArrowDown':
			(i === gBoard.length - 1) ? moveTo(0, j) : moveTo(i + 1, j)
			break
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j
	return cellClass
}


function addBall() {
	var targetPos = getEmptyPos()
	gBoard[targetPos.i][targetPos.j].gameElement = BALL
	renderCell(targetPos, BALL_IMG)
	gBallsOnBoard++
}

function addMagnet() {
	var targetPos = getEmptyPos()
	gBoard[targetPos.i][targetPos.j].gameElement = MAGNET
	renderCell(targetPos, MAGNET_IMG)
	setTimeout(removeMagnet, 3000, targetPos)
}

function getEmptyPos() {
	var iIdx = getRandomInt(1, gBoard.length - 1)
	var jIdx = getRandomInt(1, gBoard[0].length - 1) 
	if (gBoard[iIdx][jIdx].gameElement) return getEmptyPos()
	return { i: iIdx, j: jIdx }
}

function removeMagnet(pos) {
	if (gBoard[pos.i][pos.j].gameElement === MAGNET) {
		gBoard[pos.i][pos.j].gameElement = null
		renderCell(pos, '')
	}
}

function endGame() {
	clearInterval(gBallsInterval)
	clearInterval(gMagnetInterval)
	var elBtn = document.querySelector('button')
	elBtn.style.display = 'block'
	randomFloorColor()
	gFloorColorInterval = setInterval(randomFloorColor, 2000)
}

function randomFloorColor() {
	var elFloor = document.querySelectorAll('.floor')
	for (var cell of elFloor) {
		cell.style.backgroundColor = getRandomColor()
	}
}