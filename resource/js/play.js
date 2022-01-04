import Grid from './Grid.js';
import Player from './Player.js';

const gridWidth = 7;
const gridHeight = 6;

let players;
let currentPlayer;

let grid = new Grid(gridWidth, gridHeight);

init();

async function init() {
  let $board = await $('#board');

  $board.append(grid.render());

  adjustBoard();
  addListeners();
  start();
}

async function start() {
  let $message = await $('#message');

  players = [];

  players.push(new Player('Artur', 'red'));
  players.push(new Player('Jack', 'yellow'));
  currentPlayer = players[0];

  players.forEach(async function (player, index) {
    let $playerName = await $(`#player${index + 1}_name`);
    $playerName.html(player.name);
    $playerName.addClass(currentPlayer === player ? 'active' : player.color);
  });

  $message.html("It's your turn " + currentPlayer.name + ", do your worst!");

  await startTimer();
}

async function adjustBoard() {
  let $container = await $('#container');
  let $board = await $('#board');

  let windowWidth = await $(window).width();

  if (windowWidth >= 768) {
    $container.css('height', '100%');
    $board.css('height', '100%');
    $board.css('width', $board.height() + 'px');
  } else {
    $container.css('height', $container.width() + 'px');
    $board.css('width', '100%');
    $board.css('height', $board.width() + 'px')
  }
}

async function addListeners() {
  await $('#board tr th').hover(
    function () {
      $(this).css({
        'background': currentPlayer.color === 'red' ? 'url("/image/marker_red.png")' : 'url("/image/marker_yellow.png")',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%'
      });
    },
    function () {
      $(this).css('background', 'none');
    }
  );

  await $('#board tr th').on('click', function () {
    grid.placeMarker($(this).attr('id'), currentPlayer.color);
    updateBoard();
  });
}

async function updateBoard() {
  let gridData = grid.grid;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      let cell = gridData[y][x];
      let $cell = await $(`tr[id="${y}"] td[id="${(y * gridWidth) + x}"]`);
      if (cell.color !== 'none') $cell.addClass(cell.color + '-marker');
    }
  }
}

//$(window).resize(function () { adjustBoard(); });
//Optimized resize function
$(function () {
  let timer;
  $(window).resize(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      adjustBoard();
    }, 300);
  });
});