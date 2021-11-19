"use strict";

var _data = require("./assets/data/data.js");

var player = {
  score: 0,
  lives: 0,
  isGameOver: true,
  wordsGuessed: 0,
  currentLetters: 0,
  chosenDifficultly: 1,
  highScore: 0,
  correctGuesses: [],
  incorrectGuesses: []
};
var points = _data.hangman.points; // Score from data file

var words = _data.hangman.words; // words from data file

var word = [];
var vowels = ['a', 'e', 'i', 'o', 'u'];
var wordContainer = document.getElementById('hm__boxes');
var highscoreHTML = document.getElementById('hm__highscore');

var initialise = function initialise() {
  displayDifficultyButtons(0);
  player.currentLetters = 0;
  player.isGameOver = false;
  player.lives = 8;
  checkIfNewHighscore(0);
  resetInputColours();
  word = wordSelector(); // function used to select word to use based on difficulty.

  updateScreen(0, 0);
  var html = "";
  word.forEach(function (letter) {
    html += "<div class='hm__box-content'>\n                    <div class='hm__box-char hidden'>".concat(letter, "</div>\n                </div>");
  });
  wordContainer.style.gridTemplateColumns = "repeat(".concat(word.length, ", 1fr)");
  wordContainer.innerHTML = html;
};

var randomNumberForWord = function randomNumberForWord(wordArrLen) {
  var num = Math.floor(Math.random() * wordArrLen);
  return num;
};

var wordSelector = function wordSelector() {
  var wordStr = '';

  switch (player.chosenDifficultly) {
    case 0:
      wordStr = words.easy[randomNumberForWord(words.easy.length)];
      break;

    case 1:
      wordStr = words.medium[randomNumberForWord(words.medium.length)];
      break;

    case 2:
      wordStr = words.hard[randomNumberForWord(words.hard.length)];
      break;

    default:
      console.log("ERROR: You have inputted an invalid difficulty.");
      break;
  }

  var wordArr = wordStr.split('');
  return wordArr;
};

var isCorrect = function isCorrect(letter) {
  if (word.includes(letter)) {
    return true;
  } else {
    return false;
  }
};

var livesLabel = document.getElementById('hm__lives');
var pointsLabel = document.getElementById('hm__points');

var updateScreen = function updateScreen(score, message) {
  switch (message) {
    case 0:
      livesLabel.innerHTML = "Lives Remaining: ".concat(player.lives);
      player.score += score;
      pointsLabel.innerHTML = "Score: ".concat(player.score);
      break;

    case 1:
      livesLabel.innerHTML = "You Won!";
      player.score += score;
      pointsLabel.innerHTML = "Score: ".concat(player.score);
      break;

    case 2:
      livesLabel.innerHTML = "You Lost!";
      player.score = 0;
      pointsLabel.innerHTML = "Score: ".concat(player.score);
      break;
  }
};

var correctLetter = function correctLetter(key) {
  var tempPoints = 0;

  if (!player.correctGuesses.includes(key)) {
    player.correctGuesses.push(key);

    for (var i = 0; i < word.length; i++) {
      if (key == word[i]) {
        var _points = pointSelector();

        letterBoxes[i].classList.add('correct');
        player.currentLetters += 1;

        if (vowels.includes(key)) {
          console.log(_points[1]);
          tempPoints += _points[1];
        } else {
          tempPoints += _points[0];
        }

        hiddenLetters[i].classList.remove('hidden');
      }
    }

    if (player.currentLetters == word.length) {
      updateScreen(tempPoints, 1);
      player.isGameOver = true;
      checkIfNewHighscore(player.score);
      displayDifficultyButtons(1);
    } else {
      updateScreen(tempPoints, 0);
    }
  }
};

var incorrectLetter = function incorrectLetter(key) {
  if (!player.incorrectGuesses.includes(key)) {
    player.incorrectGuesses.push(key);
    player.lives--;

    if (player.lives == 0) {
      player.score = 0;
      player.isGameOver = true;
      displayDifficultyButtons(1);
      updateScreen(0, 2);
    } else {
      updateScreen(0, 0);
    }
  }
};

var buttons = document.getElementsByClassName('key');
var hiddenLetters = document.getElementsByClassName('hm__box-char');
var letterBoxes = document.getElementsByClassName('hm__box-content');

var handleClick = function handleClick(e) {
  if (!player.isGameOver) {
    var key = e.target.dataset.key;

    if (isCorrect(key)) {
      e.target.classList.add('correct');
      correctLetter(key);
    } else {
      e.target.classList.add('incorrect');
      incorrectLetter(key);
    }
  }
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleClick);
}

var difficultyButtons = document.getElementsByClassName('difficulty-btn');

var _loop = function _loop(_i) {
  difficultyButtons[_i].addEventListener('click', function () {
    player.chosenDifficultly = parseInt(difficultyButtons[_i].dataset.difficulty);
    initialise();
  });
};

for (var _i = 0; _i < difficultyButtons.length; _i++) {
  _loop(_i);
}

var resetInputColours = function resetInputColours() {
  for (var _i2 = 0; _i2 < buttons.length; _i2++) {
    buttons[_i2].classList.remove('correct');

    buttons[_i2].classList.remove('incorrect');
  }
};

var displayDifficultyButtons = function displayDifficultyButtons(option) {
  switch (option) {
    case 0:
      for (var _i3 = 0; _i3 < difficultyButtons.length; _i3++) {
        difficultyButtons[_i3].style.display = 'none';
      }

      break;

    case 1:
      for (var _i4 = 0; _i4 < difficultyButtons.length; _i4++) {
        difficultyButtons[_i4].style.display = 'inline-block';
      }

      break;

    default:
      console.log('ERROR: difficult display option invalid.');
      break;
  }
};

var pointSelector = function pointSelector() {
  switch (player.chosenDifficultly) {
    case 0:
      return [points[0].c, points[0].v];

    case 1:
      return [points[1].c, points[1].v];

    case 2:
      return [points[2].c, points[2].v];

    default:
      console.log('ERROR: invalid difficulty in point selector.');
      break;
  }
};

document.addEventListener('keydown', function (event) {
  if (event.key == 'a') {
    document.getElementById(event.key).click();
  } else if (event.key == 'b') {
    document.getElementById(event.key).click();
  } else if (event.key == 'c') {
    document.getElementById(event.key).click();
  } else if (event.key == 'd') {
    document.getElementById(event.key).click();
  } else if (event.key == 'e') {
    document.getElementById(event.key).click();
  } else if (event.key == 'f') {
    document.getElementById(event.key).click();
  } else if (event.key == 'g') {
    document.getElementById(event.key).click();
  } else if (event.key == 'h') {
    document.getElementById(event.key).click();
  } else if (event.key == 'i') {
    document.getElementById(event.key).click();
  } else if (event.key == 'j') {
    document.getElementById(event.key).click();
  } else if (event.key == 'k') {
    document.getElementById(event.key).click();
  } else if (event.key == 'l') {
    document.getElementById(event.key).click();
  } else if (event.key == 'm') {
    document.getElementById(event.key).click();
  } else if (event.key == 'n') {
    document.getElementById(event.key).click();
  } else if (event.key == 'o') {
    document.getElementById(event.key).click();
  } else if (event.key == 'p') {
    document.getElementById(event.key).click();
  } else if (event.key == 'q') {
    document.getElementById(event.key).click();
  } else if (event.key == 'r') {
    document.getElementById(event.key).click();
  } else if (event.key == 's') {
    document.getElementById(event.key).click();
  } else if (event.key == 't') {
    document.getElementById(event.key).click();
  } else if (event.key == 'u') {
    document.getElementById(event.key).click();
  } else if (event.key == 'v') {
    document.getElementById(event.key).click();
  } else if (event.key == 'w') {
    document.getElementById(event.key).click();
  } else if (event.key == 'x') {
    document.getElementById(event.key).click();
  } else if (event.key == 'y') {
    document.getElementById(event.key).click();
  } else if (event.key == 'z') {
    document.getElementById(event.key).click();
  }
});

var checkIfNewHighscore = function checkIfNewHighscore(score) {
  var highscore = window.sessionStorage.getItem('highScore');

  if (!highscore || highscore < score) {
    window.sessionStorage.setItem('highScore', score);
    document.getElementById('hm__highscore').innerHTML = "Highscore: ".concat(highscore);
  }

  document.getElementById('hm__highscore').innerHTML = "Highscore: ".concat(highscore);
};

toggleButtons = function toggleButtons(option) {};