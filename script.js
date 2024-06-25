const wordList = [
    'פמיניזם', 'שוויון', 'מנהיגות', 'זכויות', 'מהפכה',
    'העצמה', 'נשים', 'לוחמת', 'חלוצה', 'מובילה',
    'שוברת', 'מחאה', 'קידום', 'מורדת', 'מנהיגה', 'פורצת'
];

let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
const maxAttempts = 6;
let attempts = 0;

const gameBoard = document.getElementById('game-board');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');

function createBoard() {
    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < targetWord.length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', `cell-${i}-${j}`);
            gameBoard.appendChild(cell);
        }
    }
}

function updateBoard(guess) {
    for (let i = 0; i < targetWord.length; i++) {
        const cell = document.getElementById(`cell-${attempts}-${i}`);
        cell.textContent = guess[i];
        if (guess[i] === targetWord[i]) {
            cell.classList.add('correct');
        } else if (targetWord.includes(guess[i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }
}

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.trim();
    if (guess.length !== targetWord.length) {
        message.textContent = `אנא הכנס מילה באורך ${targetWord.length} אותיות.`;
        return;
    }

    updateBoard(guess);
    attempts++;

    if (guess === targetWord) {
        message.textContent = 'כל הכבוד! ניחשת את המילה.';
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (attempts === maxAttempts) {
        message.textContent = `מצטער, נגמרו הניסיונות. המילה הייתה: ${targetWord}.`;
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else {
        guessInput.value = '';
        guessInput.focus();
    }
});

createBoard();
