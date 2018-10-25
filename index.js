var inquirer = require("inquirer");
var Word = require("./word.js");
var chalk = require("chalk")

const MAX_GUESSES = 5;

////////////////////////////////
// play game
////////////////////////////////
var playGame = function() {

    var gameWord = new Word();
    var incorrectGuessCount = 0;
    var guessedLetters = [];

    //////////////////////////
    // game functions
    //////////////////////////
    function displayWord (ele) {
        // console.log(g.letters);

        //using prototype with toString()
        console.log(ele + '');
    }

    // get the random word
    gameWord.selectRandomWord();
    console.log(chalk.keyword('pink')("\n<<<<< NEW GAME >>>>>"));
    // console.log("\n" + gameWord.guessWord);
    displayWord(gameWord);

    var askForLetter = function() {
        if (incorrectGuessCount < MAX_GUESSES) {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Guess a letter!",
                    name: "letter"
                }
            ])
            .then(function(answers){
                if (answers.letter.length === 1) {

                    // if the letter has not been guessed before, process it
                    if (guessedLetters.indexOf(answers.letter) === -1) {
                        guessedLetters.push(answers.letter);

                        var found = gameWord.makeGuess(answers.letter);

                        if (found) {
                            console.log(chalk.green("\nCORRECT!\n")) ;
                        } else {
                            incorrectGuessCount++;
                            console.log(chalk.red("\nINCORRECT\n"));
                            console.log(MAX_GUESSES - incorrectGuessCount + " guess(es) remaining!!!\n");
                        };

                        if (MAX_GUESSES - incorrectGuessCount != 0) { displayWord(gameWord); };

                        // console.log("Solved? " + gameWord.wordSolved());
                        if (!gameWord.wordSolved()) {
                            askForLetter();
                        } else {
                            console.log(chalk.blue("You got it!!! Next word."));
                            // start new game
                            playGame();
                        }
                    } else {
                        console.log(chalk.yellow("\nYou've already guessed this letter. Guess again.\n"));
                        askForLetter();
                    }

                } else {
                    console.log(chalk.yelllow("\nEnter only one letter.  Guess again.\n"));
                    askForLetter();
                }

            });
        } else {
            console.log("GAME OVER.\n");
            console.log("The answer was: " + gameWord.guessWord + ".  Play again.\n");
            playGame();
        }

    }

    askForLetter();
};

// play game
playGame();