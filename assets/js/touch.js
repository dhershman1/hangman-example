
/**
 * Handles painting and setting elements into the DOM
 */

window.hangman.touch = () => {

	// I REALLY hate this, but I am to lazy to setup any kind of templating right now...
	const buildBtns = () => {
		const {engine} = window.hangman;
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
			'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		const groupEl = document.querySelector('.letters');

		letters.forEach(char => {
			groupEl.innerHTML += `<button class="btn btn-lg btn-primary" value="${char}">${char}</button>`;
		});
		const btnEls = document.querySelectorAll('.letters button');

		document.onkeyup = ({key}) => {
			if (key.length === 1 && (/[A-Z]/i).test(key)) {
				engine.makeGuess(key.toUpperCase());
			}
		};
		btnEls.forEach(btn => {
			btn.onclick = ({target}) => {
				engine.makeGuess(target.value);
			};
		});
	};

	const displayStats = () => {
		const statsEl = document.querySelector('.stats');
		const {tracker} = window.hangman.engine;
		let key = '';

		statsEl.innerHTML = '';
		for (key in tracker) {
			if (Object.prototype.hasOwnProperty.call(tracker, key) && tracker[key].full) {
				statsEl.innerHTML += `<p class="card-text ${key}">${tracker[key].full}: ${tracker[key].value}</p>`;
			}
		}
	};

	const shopIssue = msg => {
		document.querySelector('.alert #errTxt').innerHTML = msg;
		classie.removeClass(document.querySelector('.alert'), 'hidden');
	};

	const addClue = clue => document.querySelector('.clue-list').innerHTML += `<p class="card-text">${clue}</p>`;

	const clearClues = () => document.querySelector('.clue-list').innerHTML = '';

	const addSolvedWord = word => document.querySelector('.solved-words').innerHTML += `${word}, `;

	const setWord = () => {
		const {tracker} = window.hangman.engine;

		document.querySelector('.hidden-word').innerHTML = tracker.foundLetters.join(' ');
	};

	return {
		buildBtns,
		setWord,
		addClue,
		clearClues,
		displayStats,
		addSolvedWord,
		shopIssue
	};
};
