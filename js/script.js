const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholders(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = inputBox.value;
    console.log(guess);
    inputBox.value = "";
});