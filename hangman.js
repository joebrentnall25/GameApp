const player = {
    score: 0,
    lives: 8
};

const word = ['m','a','s','t','e','r'];



const wordContainer = document.getElementById('hm__boxes');

const initialise = () => {
    let html = ""
    word.forEach(letter => {
        html += `<div class='hm__box-content'>
                    <div class='hm__box-char hidden'>${letter}</div>
                </div>`
    });
    wordContainer.style.gridTemplateColumns = `repeat(${word.length}, 50px)`;
    wordContainer.innerHTML = html;
}

const isCorrect = (letter) => {
    if (word.includes(letter)){
        return true;
    }
    else {
        return false;
    }
}

updateScore = () => {
    
}



const buttons = document.getElementsByClassName('key');
const hiddenLetters = document.getElementsByClassName('hm__box-char');
const letterBoxes = document.getElementsByClassName('hm__box-content');

const handleClick = (e) => {
    const key = e.target.dataset.key;
    if (isCorrect(key)){
        e.target.classList.add('correct');
        for (let i = 0; i < word.length; i++) {
            if(key == word[i]){
                letterBoxes[i].classList.add('correct');
                hiddenLetters[i].classList.remove('hidden');
            }
        }
        player.score += 10;
        updateScore();
    }
    else {
        e.target.classList.add('incorrect');
        player.lives--;
    }
}
for (let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click',handleClick);
}




initialise();