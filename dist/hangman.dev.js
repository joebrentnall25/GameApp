"use strict";

var player = {
  score: 0,
  lives: 8,
  isGameOver: false
};
var word = ['m', 'a', 's', 't', 'e', 'r'];
var wordContainer = document.getElementById('hm__boxes');

var initialise = function initialise() {
  livesLabel.innerHTML = player.lives;
  var html = "";
  word.forEach(function (letter) {
    html += "<div class='hm__box-content'>\n                    <div class='hm__box-char hidden'>".concat(letter, "</div>\n                </div>");
  });
  wordContainer.style.gridTemplateColumns = "repeat(".concat(word.length, ", 50px)");
  wordContainer.innerHTML = html;
};

var isCorrect = function isCorrect(letter) {
  if (word.includes(letter)) {
    return true;
  } else {
    return false;
  }
};

updateScreen = function updateScreen(message) {
  if (message) {
    livesLabel.innerHTML = message;
  } else {
    livesLabel.innerHTML = player.lives;
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

      for (var i = 0; i < word.length; i++) {
        if (key == word[i]) {
          letterBoxes[i].classList.add('correct');
          hiddenLetters[i].classList.remove('hidden');
        }
      }

      updateScreen();
    } else {
      e.target.classList.add('incorrect');
      player.lives--;

      if (player.lives == 0) {
        updateScreen("Game Over");
        player.isGameOver = true;
      } else {
        updateScreen();
      }
    }
  }
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleClick);
}

var livesLabel = document.getElementById('hm__lives');
initialise();