import { hangmanWords } from "./assets/data/data.js";

const player = {
    score: 0,
    lives: 8,
    isGameOver: false,
    wordsGuessed: 0,
    currentLetters: 0,
    chosenDifficultly: 1,
    highScore: 0
};



let word = [];
const vowels = ['a','e','i','o','u']; 

const words = hangmanWords.words;
console.log(words);

const wordContainer = document.getElementById('hm__boxes');

const initialise = () => {
    player.currentLetters = 0;
    player.isGameOver = false;

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
            console.log("ERROR: You have inputted an invalid difficulty.")
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
            break;
        case 2:
            livesLabel.innerHTML = `You Lost!`;
            break;
    }

   
}

const correctLetter = (key) => {
    let tempPoints = 0;
    for (let i = 0; i < word.length; i++) {
        if(key == word[i]){
            letterBoxes[i].classList.add('correct');
            player.currentLetters += 1;
            if (vowels.includes(key)){
                tempPoints+=10;
            } else {
                tempPoints+=15;
            }
            console.log(tempPoints)
            hiddenLetters[i].classList.remove('hidden');
        }
    }
    console.log(player.currentLetters)
    if (player.currentLetters == word.length) {
        updateScreen(0,1);
        player.isGameOver = true;
    } else {
        console.log('points')
        updateScreen(tempPoints,0);
    }
}

const incorrectLetter = () => {
    player.lives--;
    if (player.lives == 0) {
        updateScreen(0,2);
        player.isGameOver = true;
    } else {
        updateScreen(0,0);
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
            incorrectLetter();
        }
    }
}
for (let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',handleClick);
}




initialise();