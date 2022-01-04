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
  players = [];

  players.push(new Player('Artur', 'red'));
  players.push(new Player('Jack', 'yellow'));
  currentPlayer = players[0];

  players.forEach(async function (player, index) {
    let $playerName = await $(`#player${index + 1}_name`);
    $playerName.html(player.name);
  });

  updatePlayers();

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
    let colId = $(this).attr('id');
    if (!grid.columnIsFull(colId)) {
      grid.placeMarker($(this).attr('id'), currentPlayer.color);
      updateBoard();
      nextPlayer();
    }
    $(this).css({
      'background': currentPlayer.color === 'red' ? 'url("/image/marker_red.png")' : 'url("/image/marker_yellow.png")',
      'background-repeat': 'no-repeat',
      'background-size': '100% 100%'
    });
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

async function nextPlayer() {
  let indexOfCurrentPlayer = players.indexOf(currentPlayer);
  if (indexOfCurrentPlayer === players.length - 1) {
    currentPlayer = players[0];
  } else {
    currentPlayer = players[indexOfCurrentPlayer + 1];
  }
  updatePlayers();
}

async function updatePlayers() {
  let $message = await $('#message');

  players.forEach(async function (player, index) {
    let $playerName = await $(`#player${index + 1}_name`);
    if (currentPlayer === player) {
      $playerName.removeClass(player.color);
      $playerName.addClass('active');
    } else {
      $playerName.removeClass('active');
      $playerName.addClass(player.color);
    }
  });

  await $('#board th').each(async function (index, element) {
    let $this = await $(this);
    let colorToCheck = currentPlayer.color === 'red' ? 'yellow' : 'red';
  });

  $message.html("It's your turn " + currentPlayer.name + ", do your worst!");
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