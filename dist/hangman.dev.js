"use strict";

var _data = require("./assets/data/data.js");

var player = {
  score: 0,
  lives: 0,
  isGameOver: true,
  wordsGuessed: 0,
  currentLetters: 0,
  chosenDifficultly: 1,
  highScore: 0
};
var word = [];
var vowels = ['a', 'e', 'i', 'o', 'u'];
var words = _data.hangmanWords.words;
console.log(words);
var wordContainer = document.getElementById('hm__boxes');

var initialise = function initialise() {
  player.currentLetters = 0;
  player.isGameOver = false;
  player.lives = 8;
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
      break;

    case 2:
      livesLabel.innerHTML = "You Lost!";
      break;
  }
};

var correctLetter = function correctLetter(key) {
  var tempPoints = 0;

  for (var i = 0; i < word.length; i++) {
    if (key == word[i]) {
      letterBoxes[i].classList.add('correct');
      player.currentLetters += 1;

      if (vowels.includes(key)) {
        tempPoints += 10;
      } else {
        tempPoints += 15;
      }

      console.log(tempPoints);
      hiddenLetters[i].classList.remove('hidden');
    }
  }

  console.log(player.currentLetters);

  if (player.currentLetters == word.length) {
    updateScreen(0, 1);
    player.isGameOver = true;
  } else {
    console.log('points');
    updateScreen(tempPoints, 0);
  }
};

var incorrectLetter = function incorrectLetter() {
  player.lives--;

  if (player.lives == 0) {
    updateScreen(0, 2);
    player.isGameOver = true;
  } else {
    updateScreen(0, 0);
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
      incorrectLetter();
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