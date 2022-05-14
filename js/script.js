const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

getWord();

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
    message.innerText = "";
    const guess = inputBox.value;
    //console.log(guess);
    const goodGuess = inputValidator(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
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
        guessedLetters.push(guess)
        console.log(guessedLetters);
        guessCounter(guess);
        displayGuesses();
        updateWord(guessedLetters);
    }
};

const displayGuesses = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerHTML = revealWord.join("");
    successfulGuess();
};

const guessCounter = function (guess) {
    const upperWord = word.toUpperCase();
     if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not include the letter ${guess}!`;
        remainingGuesses -= 1;
     } else {
        message.innerText = `Good guess! The word has the letter ${guess}!`;
     }
     if (remainingGuesses === 0) {
         message.innerHTML = `Game over! The word is <span class="highlight">${word}</span>.`;
         startOver();
     } else if (remainingGuesses === 1) {
             remainingNumber.innerText = `${remainingGuesses} guess`;
         } else {
             remainingNumber.innerText = `${remainingGuesses} guesses`;
         }
};


const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener ("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingNumber.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    
    getWord();

    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    
});

