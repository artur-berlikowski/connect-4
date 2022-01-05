import Game from './Game.js';
import Player from './Player.js';

const game = new Game(7, 6);

displaySelectionScreen();

async function displaySelectionScreen() {
  let $selectionScreen = await $('#selection_screen');
  let $game = await $('#game');
  let $playButton = await $('#play_button');

  $playButton.on('click', async function (event) {
    event.preventDefault();
    let namePlayerOne = await $('#input_player1').val();
    let namePlayerTwo = await $('#input_player2').val();
    if (await checkPlayerNameInput(namePlayerOne, namePlayerTwo)) {
      await $selectionScreen.fadeOut(500, async function () {
        await newGame(namePlayerOne, namePlayerTwo);
        $game.fadeIn(500);
        adjustBoard();
      });
    }
  });

  $game.hide();
}

async function checkPlayerNameInput(player1, player2) {
  let $inputErrors = await $('#input_errors');
  let unallowedCharacters = false;
  let valid = true;

  $inputErrors.html('');
  if (emtpyString(player1)) { $inputErrors.append('You need to enter a name for player one.<br>'); valid = false; }
  if (!testPlayerNameInput(player1)) { $inputErrors.append('The name of player one contains unallowed characters.<br>'); valid = false; unallowedCharacters = true; }
  if (emtpyString(player2)) { $inputErrors.append('You need to enter a name for player two.<br>'); valid = false; }
  if (!testPlayerNameInput(player2)) { $inputErrors.append('The name of player two contains unallowed characters.<br>'); valid = false; unallowedCharacters = true; }
  if (unallowedCharacters) $inputErrors.append('Characters allowed are A-Z a-z 0-9 - _');
  return valid;
}

function emtpyString(s) { return s === '' ? true : false; }

//Allow only A-Z a-z and 0-9
function testPlayerNameInput(s) {
  let format = /^[a-z0-9-_]*$/i;
  return format.test(s);
}

async function newGame(playerOneName, playerTwoName) {
  await createBoard();
  await createPlayers(playerOneName, playerTwoName);
  await updatePlayers();
  await startTimer();
}

async function createBoard() {
  let $board = await $('#board');

  $board.append(game.grid.render());

  await adjustBoard();
  await addListeners();
}

async function createPlayers(playerOneName, playerTwoName) {
  let player1 = new Player(playerOneName, 'red');
  let player2 = new Player(playerTwoName, 'yellow');

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
      let victor = game.checkWin();
      if (victor) {
        announceVictor(victor);
      } else {
        game.nextPlayer();
        updatePlayers();
      }
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
      let $cell = await $(`tr[id="${y}"] td[id="${(y * gridWidth) + x}"]`);
      if (cell.color !== 'none') $cell.addClass(cell.color + '-marker');
    }
  }
}

async function announceVictor(player) {
  stopTimer();

  let $message = await $('#message');
  let $timer = await $('#timer');
  let name = player.name;
  let color = player.color;
  let time = $timer.html();
  let looser = game.getOpponent(player);

  resetTimer();

  $message.html('Sorry ' + looser.name + ', looks like ' + name + ' beat you to it.<br> He won with ' + color + ' color and the time ' + time + '.<br>Congratulations!!!');
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