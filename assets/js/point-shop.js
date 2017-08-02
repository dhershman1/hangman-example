import {addClass, animClass} from './classie.js';
import {addClue, displayStats, shopIssue, updateCost} from './touch.js';

/**
 * Handles points spending and rewards!
 * Easy - Item's don't get more expensive as you buy them
 * normal - item's increase by 1.5
 * hard - items double
 */

export const ptShop = (rules, tracker) => {
	// Set our multiplier from rules
	const currMulti = rules.multiplier;
	let cluesShowing = 0;
	// The items inside the point shop
	const items = {
		// Extra Life shop item
		extraLife: {
			cost: 2,
			action: cost => {
				// Verify they don't have our max live count
				if (tracker.lives.value !== 99) {
					// Go ahead and remove the points
					tracker.points.value -= cost;
					// Add on our aditional life
					tracker.lives.value++;
					// Update our stats display
					displayStats();

					// Call attention to our point decrease
					return animClass(document.querySelector('.points'), 'oops');
				}

				// They must have max lives, so display the alert
				return shopIssue('Already Max Lives');
			}
		},
		clue: {
			cost: 1,
			action: cost => {
				// Verify we still have clues to show
				if (cluesShowing < tracker.currWord.clues.length) {
					tracker.points.value -= cost;
					addClue(tracker.currWord.clues[cluesShowing]);
					cluesShowing++;
					displayStats();

					return animClass(document.querySelector('.points'), 'oops');
				}

				return shopIssue('No More Clues!');
			}
		}
	};

	// Handles buying stuff from the points shop
	const buyItem = itemName => {
		addClass(document.querySelector('.alert'), 'hidden');
		const currItem = items[itemName];

		if (tracker.points.value >= currItem.cost) {
			currItem.action(currItem.cost);

			items[itemName].cost = Math.floor(currItem.cost * currMulti);

			return updateCost(items[itemName].cost, itemName);
		}

		return shopIssue('You do not have enough points!');
	};

	// Add listeners to our shop buttons
	document.querySelectorAll('.point-shop button').forEach(btnEl => {
		btnEl.onclick = ({target}) => {
			buyItem(target.value);
		};
	});
};
