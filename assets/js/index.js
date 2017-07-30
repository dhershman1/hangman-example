const classie = window.classie();

const hangman = (difficulty = 'normal') => {
	const rules = {
		hard: {
			lives: 5,
			clues: false
		},
		normal: {
			lives: 10,
			clues: true,
			clueCost: 1
		},
		easy: {
			lives: 15,
			clues: true,
			clueCost: 0.5
		}
	};
	const currRules = rules[difficulty];
	const clues = window.clues(currRules.clueCost);
	let tracker = {
		wins: 0,
		losses: 0,
		spendPts: 0
	};

	const newGame = () => {
		tracker = {
			wins: 0,
			losses: 0,
			spendPts: 0
		};
	};
};

// Listner
document.querySelector('.btn-group').addEventListener('click', event => {
	hangman(event.target.value);
});
