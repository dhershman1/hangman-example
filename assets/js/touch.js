import {removeClass} from './classie.js';

/**
 * Handles painting and setting elements into the DOM
 */

 /**
  * Unlocks the buttons/keys that were disabled
  * @return {Void}
  */
export const unlockKeys = () => {
	document.querySelectorAll('.letters button').forEach(btn => {
		if (btn.disabled) {
			btn.disabled = false;
		}
	});
};

/**
 * Updates the stats UI on the page
 * @param  {Object} tracker the current tracker object
 * @return {Void}
 */
export const displayStats = tracker => {
	const statsEl = document.querySelector('.stats');
	let key = '';
	let html = '';

	for (key in tracker) {
		// Build out our html stats into a large string
		if (Object.prototype.hasOwnProperty.call(tracker, key) && tracker[key].full) {
			html += `<p class="card-text ${key}">${tracker[key].full}: ${tracker[key].value}</p>`;
		}
	}
	// Give our stats element said html to display
	statsEl.innerHTML = html;
};

/**
 * Updates and unhides the alert block above the point shop
 * @param  {String} msg the message you want to set the string to
 * @return {Void}
 */
export const shopIssue = msg => {
	document.querySelector('.alert #errTxt').innerHTML = msg;
	removeClass(document.querySelector('.alert'), 'hidden');
};

/**
 * Updates the cost numbers in the UI
 * @param  {String|Number} val  the value we want to set the cost to
 * @param  {String} item the string of which item we are on
 * @return {Void}
 */
export const updateCost = (val, item) => document.getElementById(`${item}-cost`).innerHTML = val;

/**
 * Adds a clue to the clue UI
 * @param {String} clue the string to add to the clue UI
 */
export const addClue = clue => document.querySelector('.clue-list').innerHTML += `<p class="card-text">${clue}</p>`;

/**
 * Clears out the clue UI so it is empty again
 * @return {Void}
 */
export const clearClues = () => document.querySelector('.clue-list').innerHTML = '';

/**
 * Adds the solved word to our UI list
 * @param {String} words The word that should be added
 */
export const addSolvedWord = words => document.querySelector('.solved-words').innerHTML = words.join(', ');

/**
 * Empties out the solved word UI
 * @return {Void}
 */
export const clearSolvedWord = () => document.querySelector('.solved-words').innerHTML = '';

/**
 * Adds our word to the center UI to be solved
 * @param {Object} tracker the current tracker object
 */
export const setWord = tracker => document.querySelector('.hidden-word').innerHTML = tracker.foundLetters.join(' ');

/**
 * Clears out the word from the hidden word
 * @return {Void}
 */
export const clearWord = () => document.querySelector('.hidden-word').innerHTML = '';
