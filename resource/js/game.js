import Grid from './Grid.js';

const gridWidth = 7;
const gridHeight = 6;

let grid = new Grid(gridWidth, gridHeight);

init();

async function init() {
  let $board = await $('#board');

  $board.append(grid.render());

  adjustBoard();
}

async function adjustBoard() {
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();

  let $container = await $('#container');
  let $boardContainer = await $('#board_container');
  let $board = await $('#board');

  if (windowWidth > windowHeight) {
    $container.css('height', '100%');
    $board.css('height', '100%');
    $board.css('width', $board.height() + 'px');
  } else {
    $container.css('height', $container.width() + 'px');
    $board.css('width', '100%');
    $board.css('height', $board.width() + 'px')
  }
}

$(window).resize(function () { adjustBoard(); });