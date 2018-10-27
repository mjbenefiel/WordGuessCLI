<h1>Constructor Word Guess Node App</h1>


<hr>

Author: Michael Benefiel

Feel free to use some or all of this code if you're trying to complete a similar project.
<hr>

<h3> App demo </h3>

![alt text](https://raw.githubusercontent.com/mjbenefiel/WordGuessCLI/master/gif/hangmandemo.gif "Constructor Word Guess Node App")

<hr>

<h2> Project overview</h2>
This is a word guess CLI app that utilizes constructor functions.
<hr>

<h2> How it works </h2>

- Type ```node index.js``` into the command line to start the app.

- A prompt screen will appear, which provides detailed instructions on the game. You will also be asked if you are ready to play the game. Your options are "Yeah" and "Frick yeah!". Both options will start the game.
  
- When prompted to guess a letter, press any letter (a-z) on the keyboard to guess a letter and hit enter.
  
- Your choice will be correct or incorrect. You will receive a message if you enter more than one letter at a time.

- For every incorrect guess, the number of guesses decreases by one.

- If correct, the letter you guessed populates the corresponding _ in the word.

- You win if you correctly guess all the letters in the word before the number of guesses remaining equals 0.

- You lose if you run out of guesses before the entire word is revealed. The next word will display.

- You lose if you run out of guesses before the entire word is revealed. The next word will display.

- You can exit the game at any time by pressing Ctrl + C on your keyboard.

<hr>

<h2>Technology and packages used</h2>

[Node.js](https://nodejs.org/en/)

[Inquirer](https://www.npmjs.com/package/inquirer)

[Chalk](https://www.npmjs.com/package/chalk)

[Figlet](https://www.npmjs.com/package/figlet)

<hr></hr>

<h4>Below is a thorough, but not comprehensive, step-by-step process of how I got the app running in terms of code</h4>

- Navigate to root of project. Initialize package.json by running ```npm init```

- letter.js

  - Letter constructor function that declares letter, placeholder and if letter is guessed

  - Letter.toString constructor function that returns a string representing the object every time the function is called 

  - Letter.guessLetter constructor function that returns if letter guessed is true or false

  - export Letter

- word.js

  - require letter.js

  - declare words to be guessed during game

  - Word constructor function sets letters array, guessed word and wordBank. It also holds the following constructor functions: 

    - selectRandomWord
      - declares random entry
      - sets guessWord to upper case
      - runs for loop and creates letter object for each letter in the guessWord
      
    - makeGuess
      - declare found variable
      - run for loop to check if letter is guessed.
        - if/else statement to set true/false conditions.

    - wordSolved
      - run for loop to check if word is solved.

    - Word.toString constructor function that returns gameWords via for loop

    - export Word

- index.js

  - Game intro prompt with full instructions
    - wraps entire game
    - inquirer prompt to begin play
    
  - playGame constructor function wraps game functionality
    - declare gameWord
    - declare number of guesses
    - set empty guessedLEtters array
    - displayWord function used to pass through argument within selectRandomWord();
    - selectRandomWord selects the random word, as defined in word.js
      - display new word
    - askforLetter constructor function
      - inquirer prompt to guess letter if guesses greater than 0
      -.then inquirer promise, which:
        - defines and returns correct/incorrect guesses
        - displays guesses remaining
        - displays game word
        - asks for letter if word is not solved
        - moves to next word if word is solved
        - determines if letter has already been guessed
        - determines if more than one letter was guessed
        - determines if guess are less than 0 and displays guessed word if out of guesses
        - invokes playGame function

