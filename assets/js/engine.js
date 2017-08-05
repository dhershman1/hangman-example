import {addSolvedWord, clearClues, clearSolvedWord, displayStats, setWord, unlockKeys} from './touch.js';
import {animClass} from './classie.js';
import {ptShop} from './point-shop.js';

/**
 * The main engine behind the game, finds words, compares guesses, etc.
 */


export const engine = (words, rules) => {
	const tracker = {
		lives: {
			full: 'Current Lives',
			value: rules.lives
		},
		wins: {
			full: 'Wins',
			value: 0
		},
		losses: {
			full: 'Losses',
			value: 0
		},
		points: {
			full: 'Shop Points',
			value: 0
		},
		foundLetters: [],
		currWord: {},
		usedWords: []
	};

	/**
	 * Sets the selected word
	 * @return {Void}
	 */
	const selectWord = () => {
		// Select a random word
		const currWord = words[Math.floor(Math.random() * words.length)];

		// Make sure our selected word is not listed in words that were already solved
		// If it is, then start over
		// (This could be way more efficient but for now it works)
		if (tracker.usedWords.indexOf(currWord.name) !== -1) {
			return selectWord();
		}

		// Set our word to the tracker
		tracker.currWord = currWord;

		// Create our blank copy of the word
		for (let i = 0; i < currWord.name.length; i++) {
			tracker.foundLetters.push('_');
		}

		// Reset all of our unlocked items, set the word, set the shop to the new tracker, and reset stats
		clearClues();
		ptShop(rules, tracker);
		setWord(tracker);
		displayStats(tracker);
	};

	/**
	 * Initialize a new game and update our variables
	 * @param  {String} type the type of new game (lost or won)
	 * @return {Void}
	 */
	const newGame = type => {
		// Check if the value sent in was win
		if (type === 'win') {
			// If so run all of our win logic
			tracker.wins.value++;
			tracker.points.value += tracker.currWord.points;
			tracker.usedWords.push(tracker.currWord.name);
			addSolvedWord(tracker.usedWords);
		} else {
			// If not run our lose logic
			tracker.losses.value++;
			tracker.lives.value = rules.lives;
			tracker.points.value = 0;
			tracker.usedWords = [];
			clearSolvedWord();
		}

		// Always run this logic regardless
		tracker.foundLetters = [];
		unlockKeys();
		selectWord();
	};

	/**
	 * Verifies our word is either complete or not
	 * @return {Function} returns with a function call to start a new game, or set the updated word
	 */
	const verifyWord = () => {
		// Does the current word equal the found letters when they're formed into a word?
		if (tracker.currWord.name === tracker.foundLetters.join('')) {
			// If so trigger a win
			return newGame('win');
		}

		// If not keep it going and set our word to the screen
		return setWord(tracker);
	};

	/**
	 * Starts the guess functionality
	 * @param  {String} userGuess the users guess for the game
	 * @return {Function}           returns a function call for continuing our game
	 */
	const makeGuess = userGuess => {
		// If the guessed letter is present within our current word do the thing
		if (tracker.currWord.name.indexOf(userGuess) !== -1) {
			// Figure out all of the locations that letter is present in the current word
			const indexs = tracker.currWord.name.split('').reduce((total, val, i) => {
				if (val === userGuess) {
					total.push(i);
				}

				return total;
			}, []);

			// Once those index locations are found, go ahead and replace them with the letter
			indexs.forEach(i => {
				tracker.foundLetters[i] = userGuess;
			});

			// Run verification against the word to see if we are done, or still going
			return verifyWord();
		}

		// If the above fails, check to see if our lives are 0 or greater
		if (tracker.lives.value > 0) {
			// If so then subtract a life
			tracker.lives.value--;
			// Update our stats tracker
			displayStats(tracker);

			// Run our eye capture animation to show the change in stats
			return animClass(document.querySelector('.lives'), 'oops');
		}

		// If the above all fails, they must've lost so lets start a new game
		return newGame();
	};

	// Initialize our game
	selectWord();

	// Return a function to whoever calls engine so they can setup the guess listeners
	return makeGuess;
};
