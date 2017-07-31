
/**
 * The main engine behind the game, finds words, compares guesses, etc.
 */

const engine = (words, rules) => {
	const touch = window.hangman.touch();
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

	const {ptShop} = window.hangman;
	const {displayStats} = window.hangman.touch();
	let shop = {};

	const selectWord = () => {
		const currWord = words[Math.floor(Math.random() * words.length)];

		if (tracker.usedWords.indexOf(currWord.name) !== -1) {
			return selectWord();
		}

		tracker.currWord = currWord;

		for (let i = 0; i < currWord.name.length; i++) {
			tracker.foundLetters.push('_');
		}
		touch.clearClues();
		shop = ptShop(rules);
		touch.setWord();
		touch.displayStats();

		console.log('word selected', currWord);

		return shop;
	};

	const newGame = type => {
		if (type === 'win') {
			tracker.wins.value++;
			tracker.points.value += tracker.currWord.points;
			tracker.usedWords.push(tracker.currWord.name);
			touch.addSolvedWord(tracker.currWord.name);
		} else {
			tracker.losses.value++;
			tracker.lives.value = rules.lives;
			tracker.points.value = 0;
		}

		selectWord();
	};

	const verifyWord = () => {
		if (tracker.currWord.name === tracker.foundLetters.join('')) {
			tracker.foundLetters = [];

			return newGame('win');
		}

		return touch.setWord();
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
			displayStats();

			return classie.animClass(document.querySelector('.lives'), 'oops');
		}

		return newGame();
	};

	return {
		tracker,
		makeGuess,
		selectWord
	};
};

window.hangman.engine = engine;
