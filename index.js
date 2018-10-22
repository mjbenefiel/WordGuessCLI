
const Word = require('./Word.js');
const inquirer = require('inquirer');

var target;
var targetWord;
var guesses;
var guessesLeft;

const wordList = ["JS", "HTML", "CSS"]; 

    // Select a word from the given list
    function randomWord(wordList) {
        var index = Math.floor(Math.random() * wordList.length);
        return wordList[index];
    }

const questions = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter',
        validate: function (value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1); // fix letter logic later
            return valid || 'Please enter a single letter';
        },
        when: function () {
            return (!target.allGuessed() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'Want to play again?',
        // default: true,
        when: function () {
            return (target.allGuessed() || guessesLeft <= 0);
        }
    }
];

function resetGame() {
    targetWord = randomWord(wordList);
    // console.log(targetWord);
    target = new Word(targetWord);
    target.makeGuess(' ');
    guesses = [];
    guessesLeft = 9;
}

function ask() {
    // console.log('target.allGuessed():', target.allGuessed());
    if (!target.allGuessed() && guessesLeft > 0) {
        console.log(target + '');
    }
    
    inquirer.prompt(questions).then(answers => {
        // console.log('answers.playAgain ' + answers.playAgain);
        if ('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }

        if (answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();
            
            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                target.makeGuess(currentGuess);
                if (targetWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('you already guessed', currentGuess);
                
            }
        }

        if (!target.allGuessed()) {
            if (guessesLeft < 1) {
                console.log('no more guesses');
                console.log(targetWord, 'was the correct answer.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', guessesLeft);
            }

        } else {
            console.log(targetWord, 'is the correct answer!');
            // console.log(answers.playAgain);
        }

        ask();
    }); // end inquirer.then
}
resetGame();
ask();