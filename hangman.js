import { hangman } from "./assets/data/data.js";

const player = {
    score: 0,
    lives: 0,
    isGameOver: true,
    wordsGuessed: 0,
    currentLetters: 0,
    chosenDifficultly: 1,
    highScore: 0,
    correctGuesses: [],
    incorrectGuesses: [],
    previousWords: []
};

const points = hangman.points; // Score from data file
const words = hangman.words; // words from data file
const alphabet = hangman.alphabet;

let word = [];
const vowels = ['a','e','i','o','u']; 


const wordContainer = document.getElementById('hm__boxes');
const highscoreHTML = document.getElementById('hm__highscore');

const initialise = () => {
    displayDifficultyButtons(0);
    player.currentLetters = 0;
    player.isGameOver = false;
    player.lives = 8;
    player.incorrectGuesses = [];
    player.correctGuesses = [];
    checkIfNewHighscore(player.score);
    resetInputColours();

    word = wordSelector(); // function used to select word to use based on difficulty.

    updateScreen(0,0); 
    let html = "";
    word.forEach(letter => {
        html += `<div class='hm__box-content'>
                    <div class='hm__box-char hidden'>${letter}</div>
                </div>`
    });
    wordContainer.style.gridTemplateColumns = `repeat(${word.length}, 1fr)`;
    wordContainer.innerHTML = html;
}

const randomNumberForWord = (wordArrLen) =>{
    const num = Math.floor((Math.random() * wordArrLen));
    return num;
}

const wordSelector = () => {
    let wordStr = '';
    switch(player.chosenDifficultly){
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
    const wordArr = wordStr.split('');
    return wordArr;
}

const isCorrect = (letter) => {
    if (word.includes(letter)){
        return true;
    }
    else {
        return false;
    }
}

const livesLabel = document.getElementById('hm__lives');
const pointsLabel = document.getElementById('hm__points');

const updateScreen = (score,message) => {
    switch (message){
        case 0:
            livesLabel.innerHTML = `Lives Remaining: ${player.lives}`;
            player.score+=score;
            pointsLabel.innerHTML = `Score: ${player.score}`; 
            break;
        case 1:
            livesLabel.innerHTML = `You Won!`;
            player.score+=score;
            pointsLabel.innerHTML = `Score: ${player.score}`;
            break;
        case 2:
            livesLabel.innerHTML = `You Lost!`;
            player.score = 0;
            pointsLabel.innerHTML = `Score: ${player.score}`;
            break;
    }

   
}

const correctLetter = (key) => {
    let tempPoints = 0;
    if (!player.correctGuesses.includes(key)){    
        player.correctGuesses.push(key);
        for (let i = 0; i < word.length; i++) {
            if(key == word[i]){
                const points = pointSelector();
                letterBoxes[i].classList.add('correct');
                player.currentLetters += 1;
                if (vowels.includes(key)){
                    console.log(points[1]);
                    tempPoints+=points[1];
                } else {
                    tempPoints+=points[0];
                }
                hiddenLetters[i].classList.remove('hidden');
            }
        }
        if (player.currentLetters == word.length) {
            removeWords(word.join(''));
            updateScreen(tempPoints,1);
            player.isGameOver = true;
            checkIfNewHighscore(player.score);
            displayDifficultyButtons(1);
        } else {
            updateScreen(tempPoints,0);
        }
    }
}

const incorrectLetter = (key) => {
    if (!player.incorrectGuesses.includes(key)){
        player.incorrectGuesses.push(key)
        player.lives--;
        if (player.lives == 0) {
            player.score = 0;        
            player.isGameOver = true;
            displayDifficultyButtons(1);
            updateScreen(0,2);
        } else {
            updateScreen(0,0);
        }    
    } 
}

const buttons = document.getElementsByClassName('key');
const hiddenLetters = document.getElementsByClassName('hm__box-char');
const letterBoxes = document.getElementsByClassName('hm__box-content');

const handleClick = (e) => {
    if (!player.isGameOver) {
        const key = e.target.dataset.key;
        if (isCorrect(key)){
            e.target.classList.add('correct');
            correctLetter(key);
        }
        else {
            e.target.classList.add('incorrect');
            incorrectLetter(key);
        }
    }
}
for (let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',handleClick);
}

const difficultyButtons = document.getElementsByClassName('difficulty-btn');
for (let i = 0; i<difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener('click', () => {
        player.chosenDifficultly = parseInt(difficultyButtons[i].dataset.difficulty);
        initialise();
    });
}

const resetInputColours = () => {
    for (let i = 0; i<buttons.length; i++){
        buttons[i].classList.remove('correct');
        buttons[i].classList.remove('incorrect');
    }
}

const displayDifficultyButtons = (option) => {
    switch (option) {
        case 0: 
            for (let i = 0; i< difficultyButtons.length; i++) {
                difficultyButtons[i].style.display = 'none';
            }
            break;
        case 1: 
            for (let i = 0; i< difficultyButtons.length; i++) {
                difficultyButtons[i].style.display = 'inline-block';
            }
            break;
        default: 
            console.log('ERROR: difficult display option invalid.')
            break;
    }
}

const pointSelector = () => {
    switch(player.chosenDifficultly) {
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
} 


document.addEventListener('keydown', function(event) {
    if (alphabet.includes(event.key)){
        document.getElementById(event.key).click();
    }
});

const checkIfNewHighscore = (score) => {
    let highScore = window.sessionStorage.getItem('highScore');
    if (!sessionStorage.getItem('highScore') || highScore < score) {
        sessionStorage.setItem('highScore',score);
        document.getElementById('hm__highscore').innerHTML = `Highscore: ${highScore}`
    }
    document.getElementById('hm__highscore').innerHTML = `Highscore: ${highScore}`
}

const removeWords = (word) => {
    let wordIndex = -1;
    switch (player.chosenDifficultly){
    case 0: 
        wordIndex = words.easy.indexOf(word);
        words.easy.splice(wordIndex, 1);
        break;
    case 1:
        wordIndex = words.medium.indexOf(word);
        words.medium.splice(wordIndex, 1);
        break;
    case 2: 
        wordIndex = words.hard.indexOf(word);
        words.hard.splice(wordIndex, 1);
        break;
    }
    console.log(words)
}

document.getElementById('hm__reset').addEventListener(('click'), () => {
    player.score = 0;        
    player.isGameOver = true;
    displayDifficultyButtons(1);
    updateScreen(0);
})