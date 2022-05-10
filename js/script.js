const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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

const inputValidator = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.legnth === 0) {
        message.innerText = "Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Make sure you're entering one letter, silly goose!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }else {
            return input;
        }
    };

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try another one.";
    } else {
        guessedLetters.push(guess)}
        console.log(guessedLetters);
};