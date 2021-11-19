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
  displayDifficultyButtons(0);
  player.currentLetters = 0;
  player.isGameOver = false;
  player.lives = 8;
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
    displayDifficultyButtons(1);
  } else {
    console.log('points');
    updateScreen(tempPoints, 0);
  }
};

var incorrectLetter = function incorrectLetter() {
  player.lives--;

  if (player.lives == 0) {
    player.score = 0;
    player.isGameOver = true;
    displayDifficultyButtons(1);
    updateScreen(0, 2);
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