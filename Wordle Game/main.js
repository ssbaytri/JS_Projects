const wordle = document.getElementById("wordle");
let activeWordIndex = 1;
const alphaRegex = /^[A-Za-z]+$/
let targetWord = "";
const words = [
    'Apple', 'Beach', 'Chair', 'Dance', 'Eagle', 'Flood', 'Grape', 'Hotel', 'Juice', 'Knife','Lemon',
    'Music','Ocean','Pizza','Queen','Radio','Smile','Tiger','Umbra','Virus','Wrist','Xerox','Young',
    'Zebra','Amber', 'Blend','Cloud','Dream','Fable','Glide','Inlet','Jolly','Knack','Latch','Mirth',
    'Nexus','Oasis','Peach','Quilt','Raven','Space','Toast','Unity','Vowel','Watch','Yacht','Zoned',
    'Alive','Blink',
]

function newTargetWord() {
    targetWord = words[
        Math.floor(Math.random() * words.length)].toLowerCase();
}

function createWordElement() {
    const words = wordle.getElementsByClassName("words")[0];
    words.innerHTML = "";
    for (let wordIndex = 0; wordIndex < 6; wordIndex++) {
        const word = document.createElement("div");
        word.classList.add("word");

        for (let charIndex = 0; charIndex < 5; charIndex++) {
            const char = document.createElement("div");
            char.classList.add("char");
            word.appendChild(char);
        }
        words.appendChild(word);
    }
}

function setActiveWord () {
    const allWords = wordle.querySelectorAll(".word");
    allWords.forEach((word)=>{
        word.classList.remove("active");
    })

    const activeWord = wordle.querySelector(`.word:nth-child(${activeWordIndex})`);
    if (activeWord) {
        activeWord.classList.add("active");
    }
}

createWordElement()
setActiveWord();
newTargetWord();

function checkWord () {
    const chars = wordle.querySelectorAll(`.word:nth-child(${activeWordIndex}) .char.filled`);
    let matchCount = 0;
    chars.forEach((char, index)=>{
        char.classList.add("default");
        const content = char.textContent.toLowerCase();
        for (let i = 0; i < targetWord.length; i++) {
            if (content === targetWord[i]) {
                char.classList.add("contains");
            }
        }
        if (content === targetWord[index]) {
            char.classList.add("match");
            matchCount++;
        }
    })
    if (matchCount === targetWord.length) {
        // reset
        activeWordIndex = 1;
        newTargetWord();
        createWordElement();
    }else{
        activeWordIndex++;
        setActiveWord();
    }
}

document.addEventListener("keydown", (e) => {
    if (e.repeat) return
    const isAlphaChar = alphaRegex.test(String.fromCharCode(e.keyCode));
    if (isAlphaChar) {
        const char = wordle.querySelector(`.word:nth-child(${activeWordIndex}) .char:not(.filled)`);
        if (char) {
            char.textContent = e.key;
            char.classList.add("filled");
        }
    }
    const filledChars = wordle.querySelectorAll(`.word:nth-child(${activeWordIndex}) .char.filled`);

    if (e.key === "Backspace") {
        const lastFilledChar = filledChars[filledChars.length - 1];
        if (lastFilledChar) {
            lastFilledChar.textContent = "";
            lastFilledChar.classList.remove("filled");
        }
    }
    if (e.key === "Enter" && filledChars.length === 5) {
        checkWord();
    }
})