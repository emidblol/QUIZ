// Source - https://stackoverflow.com/a/5448595
// Posted by Bakudan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-23, License - CC BY-SA 4.0

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}


const scoreBoard = {
  _home: 0,
  _away: 0,
  range: [0, 99],
  boldwinner() {
    if (this._home > this._away) {
      document.getElementById('1').classList.add('bold');
    } else {
      document.getElementById('1').classList.remove('bold');
    }
    if (this._away > this._home) {
      document.getElementById('2').classList.add('bold');
    } else {
      document.getElementById('2').classList.remove('bold');
    }
  },
  set home(val) {
    let previous = this._home;

    if (previous < val) {
      document.querySelector('#team1').classList.add('good');
      setTimeout(() => {
        this._home = val;
        document.querySelector('#team1').textContent = this._home;
        document.querySelector('#team1').classList.remove('good');
        this.boldwinner();
      }, 500);
    } else {
      document.querySelector('#team1').classList.add('bad');
      setTimeout(() => {
        this._home = val;
        document.querySelector('#team1').textContent = this._home;
        document.querySelector('#team1').classList.remove('bad');
        this.boldwinner();
      }, 500);
    }
  },
  set away(val) {
    let previous = this._away;
    if (previous < val) {
      document.querySelector('#team2').classList.add('good');
      setTimeout(() => {
        this._away = val;
        document.querySelector('#team2').textContent = this._away;
        document.querySelector('#team2').classList.remove('good');
        this.boldwinner();
      }, 500);
    } else {
      document.querySelector('#team2').classList.add('bad');
      setTimeout(() => {
        this._away = val;
        document.querySelector('#team2').textContent = this._away;
        document.querySelector('#team2').classList.remove('bad');
        this.boldwinner();
      }, 500);
    }
  },
  checkRangeAndUpdate(value, operator, step) {
    // destructure max and min
    const [min, max] = this.range;
    // set getter to underscore value for accessing object
    const getter = `_${value}`;
    if (operator === '+' && (this[getter] + step) - 1 < max) {
      // if operator is add and the incrementation wont exceede max increment by step
      this[value] = this[getter] + step;
    }
    if (operator === '-' && (this[getter] - step) + 1 > min) {
      // if operator is sub and the decrementation wont go below min deincrement by step
      this[value] = this[getter] - step;
    }
  },
  homeplus: ['home', '+', 1],
  homeminus: ['home', '-', 1],
  awayplus: ['away', '+', 1],
  awayminus: ['away', '-', 1],
  roundplus: ['round', '+', 1],
  roundminus: ['round', '-', 1]
}

function init() {
  const container = document.querySelector('.scorecontainer');
  container.addEventListener('click', function (e) {
    // run function with params that match the buttons id
    scoreBoard.checkRangeAndUpdate.apply(scoreBoard, scoreBoard[e.target.id]);
  });
  findGetParameter('team1') && (document.getElementById('1').textContent = findGetParameter('team1'));
  findGetParameter('team2') && (document.getElementById('2').textContent = findGetParameter('team2'));
}
document.addEventListener("DOMContentLoaded", () => {
  init();
})
// OLD CODE

// var round = 0, homeScore = 0, awayScore = 0;

// $('document').ready(function() {
//   $('#homeplus').click(function() { 
//     if (homeScore < 100) {
//       homeScore += 1;
//       $('#team1').text(homeScore);
//     }
//   });
//   $('#homeminus').click(function() {
//     if (homeScore > 0) {
//       homeScore -= 1;
//       $('#team1').text(homeScore);
//     }
//   });
//   $('#roundminus').click(function() {
//     if (round > 0) {
//       round -= 1;
//       $('#roundnum').text(round);
//     }
//   });
//   $('#roundplus').click(function() { 
//     if (round < 1000) {
//       round += 5;
//       $('#roundnum').text(round);
//     }
//   });
//   $('#awayplus').click(function() { 
//     if (awayScore < 100) {
//       awayScore += 1;
//       $('#team2').text(awayScore);
//     }
//   });
//   $('#awayminus').click(function() {
//     if (awayScore > 0) {
//       awayScore -= 1;
//       $('#team2').text(awayScore);
//     }
//   });
// });
