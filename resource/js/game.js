import Grid from './Grid.js';

const gridWidth = 7;
const gridHeight = 6;

let player1 = {
  name: 'Player 1',
  color: 'red'
}
let player2 = {
  name: 'Player 2',
  color: 'yellow'
}
let currentPlayer = player1;

let grid = new Grid(gridWidth, gridHeight);

init();

async function init() {
  let $board = await $('#board');

  $board.append(grid.render());

  adjustBoard();
  addListeners();
  start();
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
    let $this = $(this);
    alert($this.attr('id'));
  });
}

async function start() {
  let $name1 = await $('#name1');
  let $name2 = await $('#name2');

  $name1.html(player1.name);
  $name1.addClass(player1.color);
  $name2.html(player2.name);
  $name2.addClass(player2.color);

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