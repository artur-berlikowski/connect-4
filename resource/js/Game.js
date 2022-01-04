import Grid from './Grid.js';

export default class Game {
  constructor(gridWidth, gridHeight) {
    this.grid = new Grid(gridWidth, gridHeight);
    this.players = [];
    this.currentPlayer = null;
    this.winner = null;
  }

  addPlayer(player) { this.players.push(player); }

  setCurrentPlayer(currentPlayer) { this.currentPlayer = currentPlayer; }

  nextPlayer() { this.currentPlayer = this.players.indexOf(this.currentPlayer) === 0 ? this.players[1] : this.players[0]; }

  getOpponent(player) { return this.players.indexOf(player) === 0 ? this.players[1] : this.players[0]; }

  checkWin() {
    for (let player of this.players) {
      if (this.checkHorizontalWin(player)) return player;
      if (this.checkVerticalWin(player)) return player;
      if (this.checkDiagonalWin(player)) return player;
    }
    return false;
  }

  checkHorizontalWin(player) {
    for (let row of this.grid.data) {
      let count = 0;
      for (let cell of row) {
        if (cell.color === player.color && cell.occupied === true) {
          count++;
          if (count == 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkVerticalWin(player) {
    let data = this.grid.data;

    for (let x = 0; x < this.grid.width; x++) {
      let count = 0;
      for (let y = 0; y < this.grid.height; y++) {
        let currentCell = data[y][x];
        if (currentCell.color === player.color && currentCell.occupied === true) {
          count++;
          if (count == 4) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkDiagonalWin(player) {
    let data = this.grid.data;
    let yMax = this.grid.height;
    let xMax = this.grid.width;

    //Check diagonally from top left to bottom right
    for (let row = 0; row < yMax - 4; row++) {
      let count = 0;
      let y, x;
      for (y = row, x = 0; y < yMax && x < xMax; y++, x++) {
        let cell = data[y][x];
        if (cell.color === player.color) {
          count++;
          if (count >= 4) return true;
        } else {
          count = 0;
        }
      }
    }
    for (let col = 1; col < xMax - 4; col++) {
      let count = 0;
      let y, x;
      for (y = 0, x = col; y < yMax && x < xMax; y++, x++) {
        let cell = data[y][x];
        if (cell.color === player.color) {
          count++;
          if (count >= 4) return true;
        } else {
          count = 0;
        }
      }
    }
    //Check diagonally from top right to bottom left
    for (let row = 0; row < yMax - 4; row++) {
      let count = 0;
      let y, x;
      for (y = row, x = xMax - 1; y < yMax && x >= 0; y++, x--) {
        let cell = data[y][x];
        if (cell.color === player.color) {
          count++
          if (count >= 4) return true;
        } else {
          count = 0;
        }
      }
    }
    for (let col = xMax - 2; col >= 3; col--) {
      let count = 0;
      let y, x;
      for (y = 0, x = col; y < yMax && x >= 0; y++, x--) {
        let cell = data[y][x];
        if (cell.color === player.color) {
          count++;
          if (count >= 4) return true;
        }
      }
    }
    return false;
  }
}