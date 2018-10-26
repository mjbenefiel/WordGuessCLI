var inquirer = require("inquirer");
var Word = require("./word.js");
var chalk = require("chalk");
var figlet = require("figlet")

let hangmanFig = "Hangman";
figlet(hangmanFig, function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(chalk.hex('#008080')(data));
  //Welcome screen text.
  console.log(chalk.hex('8EFF0D')("Welcome to Hangman"));
  console.log(chalk.hex('8EFF0D')("TBD Edition"));
  //Game instructions.
  var howToPlay = 
 chalk.hex('#E89C0C')("==========================================================================================================" + "\r\n" +
  "How to play" + "\r\n" +
  "==========================================================================================================" + "\r\n" +
  "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
  "Keep guessing letters. When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
  "If incorrect, the letter you guessed does not appear in the word." + "\r\n" + 
  "For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
  "If correct, the letter you guessed appears in the word." + "\r\n" +
  "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
  "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
  "===========================================================================================================" + "\r\n" +
  "You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
  "===========================================================================================================")
  console.log(howToPlay);
  confirmStart();
});

function confirmStart() {
  inquirer.prompt([
      {
          type: 'list',
          name: 'choice',
          message: 'Are you ready to play?',
          choices: ['Yeah', 'Frick yeah!']
      }
  ]).then(function (answers) {
      // console.log('----- ' + answers.choice.toUpperCase() + ' -----')
      if (answers.choice === 'Yeah' || 'Frick yeah!') {
         
 





var playGame = function() {

    var gameWord = new Word();
    var guesses = 5;
    var guessedLetters = [];

    //////////////////////////
    // game functions
    //////////////////////////
    function displayWord (ele) {
        //using prototype with toString()
        console.log(ele + '');
    }

    // get the random word
    gameWord.selectRandomWord();
    console.log(chalk.hex('#E89C0C')("\n***NEW GAME***\n"));
    // console.log("\n" + gameWord.guessWord);
    displayWord(gameWord);

    var askForLetter = function() {
        if (guesses > 0) {
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
                            console.log(chalk.hex('8EFF0D')("\nCORRECT!\n")) ;
                        } else {
                            guesses--;
                            console.log(chalk.red("\nINCORRECT\n"));
                            // console.log(guesses + " guess(es) remaining!!!\n");
                        };

                        if (guesses === 1) {
                          console.log(chalk.hex('440CE8')(guesses + " guess remaining\n"))
                        } else {
                          console.log(chalk.hex('440CE8')(guesses + " guesses remaining\n"))
                        }

                        if (guesses != 0) { displayWord(gameWord); };

                        // console.log("Solved? " + gameWord.wordSolved());
                        if (!gameWord.wordSolved()) {
                            askForLetter();
                        } else {
                            console.log(chalk.hex('440CE8')("You got it!!! Next word."));
                            // start new game
                            playGame();
                        }
                    } else {
                        console.log(chalk.hex('#E89C0C')("\nYou've already guessed this letter. Guess again.\n"));
                        askForLetter();
                    }

                } else {
                    console.log(chalk.hex('#E89C0C')("\nEnter only one letter.  Guess again.\n"));
                    askForLetter();
                }

            });
        } else {
            console.log(chalk.red("GAME OVER.\n"));
            console.log(chalk.red("The answer was: " + gameWord.guessWord + ".  Play again.\n"));
            playGame();
        }

    }

    askForLetter();
};

// play game
playGame();

} 
})
}