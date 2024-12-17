
const colors = ['green', 'red', 'yellow', 'blue'];

let gameSequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

const startButton = document.getElementById('startButton');
const gameStatus = document.getElementById('gameStatus');
const buttons = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue')
};

const nextLevelSound = document.getElementById('nextLevelSound');
const gameOverSound = document.getElementById('gameOverSound');
const buttonClickSound = document.getElementById('buttonClickSound');

startButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startGame();
    }
});

for (let color of colors) {
    buttons[color].addEventListener('click', () => {
        if (gameStarted) {
            playSound(buttonClickSound); 
            userSequence.push(color);
            animateButton(color);
            checkUserInput();
        }
    });
}

function startGame() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    gameStatus.innerText = 'Level 0';
    startButton.innerText = 'Game in Progress';
    nextRound();
}

function nextRound() {
    userSequence = [];
    level++;
    gameStatus.innerText = `Level ${level}`;
    playSound(nextLevelSound); 
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let delay = 500;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            playSound(buttonClickSound); 
            animateButton(color);
        }, delay * (index + 1));
    });
}

function animateButton(color) {
    buttons[color].classList.add('active');
    setTimeout(() => {
        buttons[color].classList.remove('active');
    }, 300);
}

function checkUserInput() {
    const currentIndex = userSequence.length - 1;

    if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
        gameStatus.innerText = 'Game Over! Click Start to try again.';
        playSound(gameOverSound); 
        gameStarted = false;
        startButton.innerText = 'Restart Game';
        return;
    }

    if (userSequence.length === gameSequence.length) {
        setTimeout(() => {
            nextRound();
        }, 1000);
    }
}

function playSound(audioElement) {
    audioElement.currentTime = 0; 
    audioElement.play();
}


