import {addSolvedWord, clearClues, displayStats, setWord, unlockKeys} from './touch.js';
import {animClass} from './classie.js';
import {ptShop} from './point-shop.js';

/**
 * The main engine behind the game, finds words, compares guesses, etc.
 */


export const engine = (words, rules) => {
	let shop = {};
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

	const selectWord = () => {
		const currWord = words[Math.floor(Math.random() * words.length)];

		if (tracker.usedWords.indexOf(currWord.name) !== -1) {
			return selectWord();
		}

		tracker.currWord = currWord;

		for (let i = 0; i < currWord.name.length; i++) {
			tracker.foundLetters.push('_');
		}

		clearClues();
		shop = ptShop(rules);
		setWord(tracker);
		displayStats(tracker);

		return shop;
	};

	const newGame = type => {
		if (type === 'win') {
			tracker.wins.value++;
			tracker.points.value += tracker.currWord.points;
			tracker.usedWords.push(tracker.currWord.name);
			addSolvedWord(tracker.currWord.name);
		} else {
			tracker.foundLetters = [];
			tracker.losses.value++;
			tracker.lives.value = rules.lives;
			tracker.points.value = 0;
		}

		tracker.foundLetters = [];
		unlockKeys();
		selectWord();
	};

	const verifyWord = () => {
		if (tracker.currWord.name === tracker.foundLetters.join('')) {
			return newGame('win');
		}

		return setWord(tracker);
	};

	const makeGuess = userGuess => {
		if (tracker.currWord.name.indexOf(userGuess) !== -1) {
			const indexs = tracker.currWord.name.split('').reduce((total, val, i) => {
				if (val === userGuess) {
					total.push(i);
				}

				return total;
			}, []);

			indexs.forEach(i => {
				tracker.foundLetters[i] = userGuess;
			});

			return verifyWord();
		}

		if (tracker.lives.value > 0) {
			tracker.lives.value--;
			displayStats(tracker);

			return animClass(document.querySelector('.lives'), 'oops');
		}

		return newGame();
	};

	selectWord();

	return makeGuess;
};
