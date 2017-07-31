/**
 * The Brains to the entire game
 */

const classie = window.classie();

const hangman = (difficulty = 'normal') => {
	const words = [
		{
			name: 'AVON',
			points: 3
		}, {
			name: 'BFGOODRICH',
			points: 1.5
		}, {
			name: 'GOODYEAR',
			points: 1
		}, {
			name: 'FIRESTONE',
			points: 1
		}, {
			name: 'FUZION',
			points: 3
		}, {
			name: 'MICHELIN',
			points: 1
		}, {
			name: 'PIRELLI',
			points: 2
		}, {
			name: 'CONTINENTAL',
			points: 1.5
		}, {
			name: 'DUNLOP',
			points: 2
		}, {
			name: 'BRIDGESTONE',
			points: 1.5
		}, {
			name: 'HANKOOK',
			points: 2
		}, {
			name: 'GENERALTIRE',
			points: 2
		}, {
			name: 'DICKCEPEK',
			points: 2
		}, {
			name: 'FALKEN',
			points: 1.5
		}, {
			name: 'KOOSIER',
			points: 3
		}, {
			name: 'KUMHO',
			points: 1.5
		}, {
			name: 'LAUFENN',
			points: 2
		}, {
			name: 'NEXEN',
			points: 2
		}, {
			name: 'POWERKING',
			points: 2
		}, {
			name: 'RIKEN',
			points: 1.5
		}, {
			name: 'SUMITOMO',
			points: 1.5
		}, {
			name: 'TOYO',
			points: 1
		}, {
			name: 'UNIROYAL',
			points: 1
		}, {
			name: 'VREDESTEIN',
			points: 3
		}, {
			name: 'YOKOHAMA',
			points: 1
		}
	];
	const rules = {
		hard: {
			lives: 5,
			clueCost: 2
		},
		normal: {
			lives: 10,
			clueCost: 1
		},
		easy: {
			lives: 15,
			clueCost: 0.5
		}
	};

	const currRules = rules[difficulty];
	const clues = window.clues(currRules.clueCost);

	let tracker = {
		wins: 0,
		losses: 0,
		points: 0
	};

	const makeGuess = (userGuess) => {

	};

		// I REALLY hate this, but I am to lazy to setup any kind of templating right now...
	const buildBtns = () => {
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
			'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		const groupEl = document.querySelector('.btn-group.letters');

		letters.forEach(char => {
			groupEl.innerHTML += `<button class="btn btn-primary" value="${char}">${char}</button>`;
		});
		groupEl.addEventListener('click', ({key}) => {
			if (key.length === 1 && (/[A-Z]?/i).test(key)) {
				makeGuess(key);
			}
		});
	};

	// Probably can be removed. With my thought process going a different direction.
	const newGame = () => {
		tracker = {
			wins: 0,
			losses: 0,
			points: 0
		};

		buildBtns();
	};

	return newGame();
};

// Listner
document.querySelector('.intro-content .btn-group').addEventListener('click', event => {
	classie.removeClass(document.querySelector('.intro-content'), 'intro');
	classie.removeClass(document.querySelector('.main-content'), 'main');
	hangman(event.target.value);
});
