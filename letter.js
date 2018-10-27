const DASHES = '_';

// constructor function for creating new letters

var Letter = function (letter) {
	this.character = letter;
	this.placeholder = (this.character === ' ' || (/[.']/.test(this.character))) ? this.character : DASHES;
	this.isGuessed = (this.character === ' ' || (/[.']/.test(this.character))) ? true : false;
};

// add toString method
Letter.prototype.toString = function () {
	return (this.isGuessed) ? this.character : this.placeholder;
};

Letter.prototype.guessLetter = function (guess) {
	guess = guess.toUpperCase();

	if (this.character === guess) {
		this.isGuessed = true;
		return true;
	}

	return false;
};

module.exports = Letter;