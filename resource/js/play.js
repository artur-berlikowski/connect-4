import Game from './Game.js';
import Player from './Player.js';

const game = new Game(7, 6);

newGame();

async function newGame() {
  await createBoard();
  await createPlayers();
  await updatePlayers();
  await startTimer();
}

async function createBoard() {
  let $board = await $('#board');

  $board.append(game.grid.render());

  await adjustBoard();
  await addListeners();
}

async function createPlayers() {
  let player1 = new Player('Artur', 'red');
  let player2 = new Player('Jack', 'yellow');

  game.addPlayer(player1);
  game.addPlayer(player2);
  game.setCurrentPlayer(player1);
}

async function updatePlayers() {
  let $message = await $('#message');

  game.players.forEach(async function (player, index) {
    let $playerName = await $(`#player${index + 1}_name`);
    if (game.currentPlayer === player) {
      $playerName.removeClass(player.color);
      $playerName.addClass('active');
    } else {
      $playerName.removeClass('active');
      $playerName.addClass(player.color);
    }
    if ($playerName.html() !== player.name) $playerName.html(player.name);
  });

  $message.html("It's your turn " + game.currentPlayer.name + ", do your worst!");
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
        'background': game.currentPlayer.color === 'red' ? 'url("/image/marker_red.png")' : 'url("/image/marker_yellow.png")',
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
    if (!game.grid.columnIsFull(colId)) {
      game.grid.placeMarker($(this).attr('id'), game.currentPlayer.color);
      updateBoard();
      game.nextPlayer();
      updatePlayers();
    }
    $(this).css({
      'background': game.currentPlayer.color === 'red' ? 'url("/image/marker_red.png")' : 'url("/image/marker_yellow.png")',
      'background-repeat': 'no-repeat',
      'background-size': '100% 100%'
    });
  });
}

async function updateBoard() {
  let gridData = game.grid.data;
  let gridWidth = game.grid.width;
  let gridHeight = game.grid.height;

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      let cell = gridData[y][x];
      console.log(cell);
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