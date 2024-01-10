const wordle = document.getElementById("wordle");
const activeWordIndex = 1;
const alphaRegex = /^[A-Za-z]+$/


function createWordElement() {
    const words = wordle.getElementsByClassName("words")[0];

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

createWordElement()

document.addEventListener("keydown", (e) => {
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
})