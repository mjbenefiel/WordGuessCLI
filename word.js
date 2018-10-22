const Letter = require('./Letter.js');
function Word(wordString) {
    // console.log('making a new Word', wordString);
    
    this.letterArray = [];
    
    wordString.split('').forEach(element => {
        this.letterArray.push(new Letter(element));
    });

    this.toString = function() {
        return this.letterArray.join(' ');
    }

    this.makeGuess = function (guessedLetter) {
        this.letterArray.forEach(element => {
            element.makeGuess(guessedLetter);
        });
    }

    // this.allGuessed = function() {
    //     return this.letterArray.reduce((accumulator, currentValue) => (accumulator && currentValue.guessed), true);
    // }

    this.allGuessed = function() {
        return this.letterArray.every((currentValue) => currentValue.guessed);
    }
}


module.exports = Word;