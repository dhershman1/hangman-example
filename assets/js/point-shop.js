
/**
 * Handles points spending and rewards!
 * Easy - Item's don't get more expensive as you buy them
 * normal - item's increase by 1.5
 * hard - items double
 */


const pointShop = rules => {
	const {tracker} = window.hangman.engine;
	const touch = window.hangman.touch();
	const currMulti = rules.multiplier;

	let cluesShowing = 0;
	const items = {
		extraLife: {
			cost: 2,
			action: cost => {
				if (tracker.lives.value !== 99) {
					tracker.points.value -= cost;
					tracker.lives.value++;
					touch.displayStats();

					return classie.animClass(document.querySelector('.points'), 'oops');
				}

				return touch.shopIssue('Already Max Lives');
			}
		},
		clue: {
			cost: 1,
			action: cost => {
				if (cluesShowing < tracker.currWord.clues.length) {
					tracker.points.value -= cost;
					touch.addClue(tracker.currWord.clues[cluesShowing]);
					cluesShowing++;
					touch.displayStats();

					return classie.animClass(document.querySelector('.points'), 'oops');
				}

				return touch.shopIssue('No More Clues!');
			}
		},
		freeLetter: {
			cost: 2,
			action: ''
		},
		freeWord: {
			cost: 5,
			action: ''
		}
	};

	const bumpCosts = () => {
		let prop = '';

		for (prop in items) {
			if (Object.prototype.hasOwnProperty.call(items, prop)) {
				items[prop].cost = items[prop].cost * currMulti;
			}
		}
	};

	const buyItem = itemName => {
		classie.addClass(document.querySelector('.alert'), 'hidden');
		const currItem = items[itemName];

		if (tracker.points.value >= currItem.cost) {
			currItem.action(currItem.cost);

			return bumpCosts();
		}

		return touch.shopIssue('You do not have enough points!');
	};

	document.querySelectorAll('.point-shop button').forEach(btnEl => {
		btnEl.onclick = ({target}) => {
			buyItem(target.value);
		};
	});
};

window.hangman.ptShop = pointShop;
