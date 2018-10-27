var Letter = require("./letter.js");

var WordCategories = [
    { "name": "All",
      "wordlist": ["JavaScript", "Java", "Python", "PHP", "Ruby"] }
 ];

 // Word Constructor

var Word = function() {
    this.letters = [];
    this.guessWord = '';
    this.wordBank = WordCategories[0].wordlist;  

    this.selectRandomWord = function() {
        var randomEntry = Math.floor(Math.random() * this.wordBank.length);

        this.guessWord = this.wordBank[randomEntry].toUpperCase();

        // for each letter in the guessWord, create a letter object
        for (i=0; i < this.guessWord.length; i++) {
            this.letters.push(new Letter(this.guessWord[i]));
        }
    };

    this.makeGuess = function(character) {
        var found = false;

        // for each letter, check to see if it is guessed and set it accordingly
        for (i=0;i < this.letters.length; i++) {
            // console.log("letter being guessed: " + character);
            var letterFound = this.letters[i].guessLetter(character);
            // console.log("letter found: " + letterFound);
            // console.log("letter guessed: " + this.letters[i].isGuessed);

            if (letterFound) {found = true;};
        }
        return found;
    };

    this.wordSolved = function() {

        for (i=0; i < this.letters.length; i++) {
            if (this.letters[i].isGuessed === false) {
                return false;
            }
        }

        return true;
    }
};


// add toString method to the Word object


// toString method
Word.prototype.toString = function() {
  var gameWord = '';

  for (i=0;i < this.letters.length; i++) {
      gameWord = gameWord + " " + this.letters[i];
  }
  gameWord = gameWord + "\n";
  return gameWord;
};


// export the word object for use

module.exports = Word;
