import Grid from './Grid.js';
import Player from './Player.js';

export default class Game {
  constructor(gridWidth, gridHeight) {
    this.grid = new Grid(gridWidth, gridHeight);
    this.players = [];
    this.currentPlayer = null;
  }

  addPlayer(player) { this.players.push(player); }

  setCurrentPlayer(currentPlayer) { this.currentPlayer = currentPlayer; }

  nextPlayer() { this.currentPlayer = this.players.indexOf(this.currentPlayer) === 0 ? this.players[1] : this.players[0]; }
}