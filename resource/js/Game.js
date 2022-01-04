import Grid from './Grid.js';
import Player from './Player.js';

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
      let lastCountedCell = null;
      let count = 0;
      for (let cell of row) {
        if (cell.color === player.color && cell.occupied === true) {
          if (lastCountedCell === null) {
            lastCountedCell = cell;
            count++;
          } else if (row.indexOf(lastCountedCell) === row.indexOf(cell) - 1) {
            lastCountedCell = cell;
            count++;
          } else {
            lastCountedCell = cell;
            count = 1;
          }
        }
      }
      if (count > 4) return true;
      else count = 0;
    }
    return false;
  }

  checkVerticalWin(player) {
    let data = this.grid.data;

    for (let x = 0; x < this.grid.width; x++) {
      let lastRow = null;
      let lastCell = null;
      let count = 0;
      for (let y = 0; y < this.grid.height; y++) {
        let currentCell = data[y][x];
        if (currentCell.color === player.color && currentCell.occupied === true) {
          if (lastRow === null && lastCell === null) {
            lastRow = y;
            lastCell = x;
            count++;
          } else if (lastRow = y - 1 && lastCell == x) {
            lastRow = y;
            lastCell = x;
            count++;
          } else {
            lastRow = y;
            lastCell = x;
            count = 1
          }
        }
      }
      if (count == 4) return true;
      else count = 0;
    }
    return false;
  }

  checkDiagonalWin() {

  }
}