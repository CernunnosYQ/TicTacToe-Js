const board_size = 3;
const board_element = document.getElementById('board');

let board_state = [];
let actual_player = 'nought';

function startGame () {
    board_element.innerHTML = '';
    board_state = createBoardState(board_size);
    
    for (let x = 0; x < board_size; x++) {
        for (let y = 0; y < board_size; y++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = `tile-${x}-${y}`
            
            tile.addEventListener('click', function () {
                if (!this.hasChildNodes()) {
                    this.appendChild(createMark(this.id));
                }
            })
            
            board_element.appendChild(tile);
        }
    }
}

function createBoardState(size) {
    let new_board_state = [];
    
    for (let i = 0; i < size; i++) {
        new_board_state.push(Array(size));
    }
    
    return new_board_state;
}

function createMark (tile_id) {
    updateState(tile_id);
    
    let mark = document.createElement('div');
    mark.classList.add(actual_player);
    
    switchPlayer();
    
    return mark;
}

function updateState (tile_id) {
    let x = parseInt(tile_id.split('-')[1], 10);
    let y = parseInt(tile_id.split('-')[2], 10);
    
    board_state[x][y] = actual_player;
    
    if (checkWin(x, y)) {
        gameOver(actual_player);
    } else {
        if (checkDraw()) {
            gameOver('draw')
        }
    }
}

function switchPlayer () {
    if (actual_player === 'nought') {
        actual_player = 'cross';
    } else {
        actual_player = 'nought';
    }
}

function checkWin (x, y) {
    let actual_tile = board_state[x][y];
    
    let top = board_state[(x > 0) ? x - 1 : x + 2][y];
    let left = board_state[x][(y > 0) ? y - 1 : y + 2];
    let right = board_state[x][(y < board_size - 1) ? y + 1 : y - 2];
    let bottom = board_state[(x < board_size - 1) ? x + 1 : x - 2][y];
    
    let top_left = '';
    let top_right = '';
    let bottom_left = '';
    let bottom_right = '';
    
    if (x === y) {
        top_left = board_state[(x > 0) ? x - 1 : x + 2][(y > 0) ? y - 1 : y + 2];
        bottom_right = board_state[(x < board_size - 1) ? x + 1 : x - 2][(y < board_size - 1) ? y + 1 : y - 2];
    }
    
    if (x - 2 === y || x + 2 === y) {
        top_right = board_state[(x > 0) ? x - 1 : x + 2][(y < board_size - 1) ? y + 1 : y - 2];
        bottom_left = board_state[(x < board_size - 1) ? x + 1 : x - 2][(y > 0) ? y - 1 : y + 2];
    }
    
    if (actual_tile === top_left) {
        if (actual_tile == bottom_right) {
            return true;
        }
    }
    
    if (actual_tile === top) {
        if (actual_tile == bottom) {
            return true;
        }
    }
    
    if (actual_tile === top_right) {
        if (actual_tile == bottom_left) {
            return true;
        }
    }
    
    if (actual_tile === left) {
        if (actual_tile == right) {
            return true;
        }
    }
    
    return false;
}

function checkDraw() {
    let res = true;
    for (let x = 0; x < board_size; x++) {
        for (let y = 0; y < board_size; y++) {
            if (board_state[x][y] === undefined) {
                res = false;
            }
        }
    }

    return res;
}

function gameOver(winner) {
    board_element.innerHTML = '';
    board_state = [];

    let mark = document.createElement('div');
    mark.classList.add('full-board');
    mark.classList.add(winner);

    mark.addEventListener('click', () => { startGame() });

    board_element.appendChild(mark);
}

window.addEventListener('DOMContentLoaded', () => { startGame(); });
