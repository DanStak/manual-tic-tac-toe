const boxes = document.querySelectorAll('.box');
const h1 = document.querySelector('h1');
const button = document.querySelector('button.restart');

const winX = document.querySelector('.statsX span.wins');
const loseX = document.querySelector('.statsX span.loses');
const drawX = document.querySelector('.statsX span.draws');

const winY = document.querySelector('.statsY span.wins');
const loseY = document.querySelector('.statsY span.loses');
const drawY = document.querySelector('.statsY span.draws');


const playerXstats = {
  wins: 0,
  loses: 0,
  draws: 0
}

const playerYstats = {
  wins: 0,
  loses: 0,
  draws: 0
}


const cross = 'X';
const circle = 'O';
let turn = 1;
let winClass = [];

let table = ['', '', '', '', '', '', '', '', ''];
let winner = null;
let moves = {
  'X': [],
  'O': []
}

const winPlan = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const move = (e) => {

  if (e.target.innerHTML === '' && winner === null) {

    const index = e.target.dataset.index;
    const sign = turn % 2 ? circle : cross;
    const showSign = turn % 2 ? cross : circle;
    e.target.innerHTML = sign;
    table[index] = sign;
    turn++;

    h1.textContent = `Gracz ${showSign}`



    checkWin();

    if (winner !== null) {
      completeStats();
    }


  } else return;
}

const checkWin = () => {

  table.forEach((item, index) => moves[item] ? moves[item].push(index) : null);

  console.log(table);
  console.log(moves);

  winPlan.forEach(item => {
    if (item.every(current => moves[cross].indexOf(current) > -1)) {
      playerXstats.wins += 1;
      playerYstats.loses += 1;
      winner = 'X'
      winClass = moves[cross];
      console.log(winClass);
    }

    if (item.every(current => moves[circle].indexOf(current) > -1)) {
      playerYstats.wins += 1;
      playerXstats.loses += 1;
      winner = 'O';
    }

  })

  if (table.every(current => current !== '')) {
    playerYstats.draws += 1;
    playerXstats.draws += 1;
    winner = 'draw';
  }

  return winner

}

completeStats = () => {
  winX.textContent = playerXstats.wins;
  loseX.textContent = playerXstats.loses;
  drawX.textContent = playerXstats.draws;

  winY.textContent = playerYstats.wins;
  loseY.textContent = playerYstats.loses;
  drawY.textContent = playerYstats.draws;

  if (winner === 'X') {
    h1.textContent = `zwycięzca X!`
  }
  if (winner === 'O') {
    h1.textContent = `zwycięzca O!`
  }
  if (winner === 'draw') {
    h1.textContent = `remis!`
  }
}

restartClick = () => {
  if (winner !== null) {
    click();
  } else {
    if (confirm('Jesteś w trakcie gry, na pewno chcesz zrestartować?')) {
      click();
    } else return
  }
}

click = () => {
  winner = null;
  boxes.forEach(box => box.textContent = '');
  table = ['', '', '', '', '', '', '', '', ''];

  moves = {
    'X': [],
    'O': []
  };

  turn = 1;
}



boxes.forEach(box => box.addEventListener('click', move));
button.addEventListener('click', restartClick)