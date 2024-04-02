const wordList = [
    {
        word: "guitar",
        hint: "A musical instrument with strings."
    },
    {
        word: "computer",
        hint: "An electronic device for processing and storing data."
    },
    {
        word: "elephant",
        hint: "A large mammal with a long trunk and tusks."
    },
    {
        word: "beach",
        hint: "A sandy shore by the ocean."
    },
    {
        word: "astronaut",
        hint: "A person who travels in space."
    },
    {
        word: "castle",
        hint: "A large fortified building with walls, towers, and moats."
    },
    {
        word: "telescope",
        hint: "An optical instrument for viewing distant objects."
    },
    {
        word: "pizza",
        hint: "A popular Italian dish with dough, sauce, cheese, and toppings."
    },
    {
        word: "butterfly",
        hint: "An insect with colorful wings that goes through metamorphosis."
    },
    {
        word: "bicycle",
        hint: "A two-wheeled vehicle that you pedal to move."
    },
    {
        word: "rainbow",
        hint: "A colorful arc that appears in the sky after rain."
    },
    {
        word: "orchestra",
        hint: "A group of musicians playing instruments together."
    },
    {
        word: "penguin",
        hint: "A flightless bird found in cold regions."
    },
    {
        word: "detective",
        hint: "A person who investigates and solves mysteries."
    },
    {
        word: "galaxy",
        hint: "A massive system of stars, planets, and other celestial bodies."
    },
    {
        word: "mountain",
        hint: "A large natural elevation of the Earth's surface."
    },
    {
        word: "microscope",
        hint: "An instrument used to magnify tiny objects for observation."
    },
    {
        word: "sunrise",
        hint: "The time when the sun appears over the horizon in the morning."
    },
    {
        word: "chameleon",
        hint: "A lizard known for changing color to match its surroundings."
    },
    

]

const hangmanImage = document.querySelector(".hangman-box img");
const keyBoardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const gueseseText = document.querySelector(".guesses-text");
const gameModal = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, wrongGuessCount = 0, correctLetters = [];
const maxGuesses = 6;

const resetGame = () => {
    // reseting all game variabels
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    gueseseText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyBoardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // selecting random word and hint from the world list
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text").innerHTML = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText}: <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // checking if the clickedLetter is existing in the currentWord;
    if (currentWord.includes(clickedLetter)) {
        // showing all correct letters of the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else {
        // if clicked letter doesn't exist update hangman image and the wrong guesses counter;
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; 
    gueseseText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // calling gameOver if one of these conditons meets;
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// creating keybroad buttons and adding event listenners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyBoardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);