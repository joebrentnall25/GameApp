"use strict";

var player = {
  score: 0,
  lives: 8
};
var word = ['m', 'a', 's', 't', 'e', 'r'];
var wordContainer = document.getElementById('hm__boxes');

var initialise = function initialise() {
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

updateScore = function updateScore() {};

var buttons = document.getElementsByClassName('key');
var hiddenLetters = document.getElementsByClassName('hm__box-char');
var letterBoxes = document.getElementsByClassName('hm__box-content');

var handleClick = function handleClick(e) {
  var key = e.target.dataset.key;

  if (isCorrect(key)) {
    e.target.classList.add('correct');

    for (var i = 0; i < word.length; i++) {
      if (key == word[i]) {
        letterBoxes[i].classList.add('correct');
        hiddenLetters[i].classList.remove('hidden');
      }
    }

    player.score += 10;
    updateScore();
  } else {
    e.target.classList.add('incorrect');
    player.lives--;
  }
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleClick);
}

initialise();