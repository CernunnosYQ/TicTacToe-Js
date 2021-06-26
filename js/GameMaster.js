export default class GameMaster {
    constructor() {
        this.board_size = 3;
        this.board = this.createBoard(this.board_size);

        this.actual_player = 'nought';

        console.log('It is working!!!');
    }

    createBoard(board_size) {
        let board = [];

        for (let i = 0; i < board_size; i++) {
            board.push(Array(board_size));
        }

        console.log(board);

        return board;
    }

    createMark(tile_id) {
        this.updateState(tile_id);
        let mark = document.createElement('div');
        mark.classList.add(this.actual_player);

        this.switchPlayer();

        return mark;
    }

    updateState(tile_id) {
        let x = parseInt(tile_id.split('-')[1], 10);
        let y = parseInt(tile_id.split('-')[2], 10);

        this.board[x][y] = this.actual_player;

        if (this.checkWin(x, y)) {
            this.gameOver(this.actual_player);
        }
    }

    switchPlayer() {
        if (this.actual_player === 'nought') {
            this.actual_player = 'cross';
        } else {
            this.actual_player = 'nought';
        }
    }

    checkWin(x, y) {
        let actual_tile = this.board[x][y];

        let top = this.board[(x > 0) ? x - 1 : x + 2][y];
        let left = this.board[x][(y > 0) ? y - 1 : y + 2];
        let right = this.board[x][(y < this.board_size - 1) ? y + 1 : y - 2];
        let bottom = this.board[(x < this.board_size - 1) ? x + 1 : x - 2][y];

        let top_left = '';
        let top_right = '';
        let bottom_left = '';
        let bottom_right = '';

        if (x === y) {
            top_left = this.board[(x > 0) ? x - 1 : x + 2][(y > 0) ? y - 1 : y + 2];
            bottom_right = this.board[(x < this.board_size - 1) ? x + 1 : x - 2][(y < this.board_size - 1) ? y + 1 : y - 2];
        }

        if (x - 2 === y || x + 2 === y) {
            top_right = this.board[(x > 0) ? x - 1 : x + 2][(y < this.board_size - 1) ? y + 1 : y - 2];
            bottom_left = this.board[(x < this.board_size - 1) ? x + 1 : x - 2][(y > 0) ? y - 1 : y + 2];
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

    gameOver(winner) {
        let board = document.getElementById('board');

        board.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('full-board');
        tile.classList.add(winner);

        board.appendChild(tile);
    }
}