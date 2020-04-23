
// assigns var to html element
var currentBand = document.getElementById("screen_word");

var screenGuesses = document.getElementById("guesses_left");

var screenGuessLetters = document.getElementById("guess_letters");

var winsBrow = document.getElementById("wins_span");

var lossesBrow = document.getElementById("losses_span");

var hangmanImg = document.getElementById("hangman-img");

var pressPlay = document.getElementById("press_play");

var headline = document.getElementById("header");

var playAgain = document.getElementById("play_again");

var answer = document.getElementById("answer");

// array of hangman words aka bands
var bands = ["the clash","crass","minutemen","the slits","patti smith","black flag","big boys"];

// var to hold characters in browser
var browChar = "";

// var to hold guessesLeft, initiates to this value
var guessesLeft = 6;

// counts guesses up for change img function
var guessesInc = 0;

// var to hold band name as character array
var wordArr=[];

// var to hold letters and underscores as played
var browArr=[];

// var to hold letters already played
var guessArr=[];

// var to hold guesses as a string
var guessChar = "";

// var to hold number of wins
var wins=0;

// var to hole number of losses
var losses=0;

// var of the maximum index number of bands array
var maxBandsLength = bands.length-1;

// var of a random integer between 0 (inclusive) and max (inclusive) index of bands
var random = getRandomInt(maxBandsLength);

imgArr = ["assets/images/hangman2.png","assets/images/hangman3.png","assets/images/hangman4.png","assets/images/hangman5.png","assets/images/hangman6.png","assets/images/hangman7.png"];

// function to generate random integer between 0 and a max value (both inclusive) 
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

function imgChange(i) {
    hangmanImg.src = imgArr[i];
}

// resets most var so game can restart
function resetGame() {
    browArr=[];
    wordArr=[];
    browChar = "";
    random = getRandomInt(maxBandsLength);
    guessesLeft = 6;
    guessArr=[];
    guessChar = "";
    hangmanImg.src = "assets/images/hangman1.png";
    guessesInc = 0;
    headline.textContent = "Punk Hangman";
    playAgain.textContent = "";
    answer.textContent = "";
}

// randomly chooses band name, assigns values to browArr and browChar
function getWord() {

    pressPlay.textContent = "";
    
    // creates underscores in browser according to index of bands array 
    // bands[random] is the current band name
    for (i=0;i<bands[random].length;i++) {
        if (bands[random][i]===" ") {
            browArr.push("\xa0");
        } else {
            browArr.push("_");
        }

        // takes browArr and converts to a string
        browChar = browArr.join("");

        // assigns value of browChar to the textContent of currentBand 
        // aka gets value of browChar into html and on the browser
        currentBand.textContent = browChar;

        // splits the current band name into an array
        wordArr=bands[random].split("");
    }

}

function playGame () {
     // assigns value of browChar to the textContent of currentBand 
        // aka gets value of browChar into html and on the browser
        currentBand.textContent = browChar;

        // assigns value of guessesLeft to textContent of screenGuesses
        screenGuesses.textContent = guessesLeft;

        // assigns value of guessChar to textContent of screenGuessLetters
        screenGuessLetters.textContent = guessChar;

        // assigns value of wins to textContent of winsBrow
        winsBrow.textContent = wins;

    
    // checks if key pressed is in current band
    document.onkeyup = function(event) {
    
        
        // decides what to do with key pushed
            // so it doesn't count the spacebar in the game
        if (event.key===" ") {
            alert("Oi! That's not a letter!");
            // checks if the current band name included the letter pushed
            } else if (bands[random].includes(event.key)) {
                // for loop that runs as many times as the wordArr is long
                for (i=0;i<wordArr.length;i++) {
                    // compares letter pushed to the letter at the current index of wordArr
                    if (event.key===wordArr[i]) {
                        // replaces underscore in browArr at current index with letter from wordArr at current index
                        // aka makes browArr match wordArr where a correct letter was choosen
                        browArr[i]=wordArr[i];
                    }
                }
            } else if (guessArr.includes(event.key)) {
                alert("You already tried that one!");
            } else {
                // reduces guessesLeft for incorrect choice
                guessesLeft--;
                // changes hangman img and increases guess count
                imgChange(guessesInc);
                guessesInc++;
                // adds incorrect guesses to guess array
                guessArr.push(event.key);
            }

        // checks for underscores aka is game still going
        if (browArr.includes("_")) {

            // checks win, adds win counter, runs game functions
        } else {
            wins++;
            playAgain.textContent = "Press any key to play again";
            headline.textContent = "You Win!";
            document.onkeyup = function() {
                resetGame();
                getWord();
                playGame();
            };
        }

        // checks if the player has lost, runs game
        if (guessesLeft===0) {
            losses++;
            playAgain.textContent = "Press any key to play again";
            headline.textContent = "You Lose!";
            browArr = [];
            answer.textContent = " The answer was " + bands[random];
            document.onkeyup = function() {
                resetGame();
                getWord();
                playGame();
            };
        }

        // takes browArr and converts to a string
        browChar = browArr.join("");

        // takes guessArr and converts to a string
        guessChar = guessArr.join(",");

        // assigns value of browChar to the textContent of currentBand 
        // aka gets value of browChar into html and on the browser
        currentBand.textContent = browChar;

        // assigns value of guessesLeft to textContent of screenGuesses
        screenGuesses.textContent = guessesLeft;

        // assigns value of guessChar to textContent of screenGuessLetters
        screenGuessLetters.textContent = guessChar;

        // assigns value of wins to textContent of winsBrow
        winsBrow.textContent = wins;

        // assigns value of losses to textContent of lossesBrow
        lossesBrow.textContent = losses;

       
    
    }
    
    
}

// starts game functions
document.onkeyup = function() {
    getWord();
    playGame();
    };
