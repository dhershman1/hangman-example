import {addClass, animClass} from './classie.js';
import {addClue, displayStats, shopIssue, updateCost} from './touch.js';

/**
 * Handles points spending and rewards!
 * Easy - Item's don't get more expensive as you buy them
 * normal - item's increase by 1.5
 * hard - items double
 */

/**
 * Factory function to create our point shop system
 * @param  {Object} rules   the current rules set object
 * @param  {Object} tracker the current tracker object
 */
export const ptShop = (rules, tracker) => {
	// Set our multiplier from rules
	const currMulti = rules.multiplier;
	let cluesShowing = 0;
	// The items inside the point shop
	const items = {
		// Extra Life shop item
		extraLife: {
			cost: 3,
			/**
			 * The Extra life Action function
			 * @param  {Number} cost the cost of that item
			 * @return {Boolean}      returns a boolean if the action ran or not
			 */
			action: cost => {
				// Verify they don't have our max live count
				if (tracker.lives.value !== 99) {
					// Go ahead and remove the points
					tracker.points.value -= cost;
					// Add on our aditional life
					tracker.lives.value++;
					// Update our stats display
					displayStats(tracker);

					// Call attention to our point decrease
					animClass(document.querySelector('.points'), 'oops');

					return true;
				}

				// They must have max lives, so display the alert
				shopIssue('Already Max Lives');

				return false;
			}
		},
		clue: {
			cost: 2,
			/**
			 * The Clue Action function
			 * @param  {Number} cost the cost of that item
			 * @return {Boolean}      returns a boolean if the action ran or not
			 */
			action: cost => {
				// Verify we still have clues to show
				if (cluesShowing < tracker.currWord.clues.length) {
					tracker.points.value -= cost;
					addClue(tracker.currWord.clues[cluesShowing]);
					cluesShowing++;
					displayStats(tracker);
					animClass(document.querySelector('.points'), 'oops');

					return true;
				}

				shopIssue('No More Clues!');

				return false;
			}
		}
	};

	/**
	 * The basic buy item functionality of the shop
	 * @param  {String} itemName the name of the item purchased
	 * @return {Function}          Returns a function call to run a UI update
	 */
	const buyItem = itemName => {
		// Make sure to hide our alert box
		addClass(document.querySelector('.alert'), 'hidden');
		const currItem = items[itemName];

		// Verify there are enough points to purchase the item
		if (tracker.points.value >= currItem.cost) {
			// Trigger the action of the item so it applies itself to the game
			const actionPass = currItem.action(currItem.cost);

			// If the action is a success, then we need to apply our multiplier to cost
			if (actionPass) {
				items[itemName].cost = Math.floor(currItem.cost * currMulti);
			}

			// Update the UI to reflect these costs
			return updateCost(items[itemName].cost, itemName);
		}

		// If there isn't enough points update the UI to show this
		return shopIssue('You do not have enough points!');
	};

	// Add listeners to our shop buttons
	document.querySelectorAll('.point-shop button').forEach(btnEl => {
		btnEl.onclick = ({target}) => {
			buyItem(target.value);
		};
	});
};
