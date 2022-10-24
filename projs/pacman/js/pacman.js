'use strict'

const PACMAN = '<img class="pacman" src="img/pacman.png">'
const SUPER_PACMAN = '<img class="pacman" src="img/super-pacman.png">'
var gPacman


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        degrees: '0deg'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    switch (nextCell) {
        case WALL: return
        case FOOD:
            updateScore(1)
            break
        case POWER_FOOD:
            if (gPacman.isSuper) return
            updateScore(1)
            onEatPowerFood()
            break
        case CHERRY:
            updateScore(15)
            break
        case GHOST:
            if (gPacman.isSuper) {
                deleteGhost(nextLocation)
                updateScore(1)
            } else {
                endGame()
                renderCell(gPacman.location, EMPTY)
                return
            }

    }

    const pacImg = gPacman.isSuper ? SUPER_PACMAN : PACMAN
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = pacImg
    renderCell(gPacman.location, pacImg)
    document.querySelector('img').style.rotate = gPacman.degrees
}



function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.degrees = '270deg'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.degrees = '90deg'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.degrees = '180deg'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.degrees = '0deg'
            break;
        default:
            return null;
    }
    return nextLocation;
}



function onEatPowerFood() {
    gPacman.isSuper = true
    renderAllGhosts()
    setTimeout(endPower, 5000)
}

function endPower() {
    gPacman.isSuper = false
    renderCell(gPacman.location, PACMAN)
    ghostResurrection()
    renderAllGhosts()
}


