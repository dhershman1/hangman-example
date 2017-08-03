import {removeClass} from './classie.js';

/**
 * Handles painting and setting elements into the DOM
 */

export const unlockKeys = () => {
	document.querySelectorAll('.letters button').forEach(btn => {
		if (btn.disabled) {
			btn.disabled = false;
		}
	});
};

// Build out our stats div and display it
export const displayStats = tracker => {
	const statsEl = document.querySelector('.stats');
	let key = '';

	statsEl.innerHTML = '';
	for (key in tracker) {
		if (Object.prototype.hasOwnProperty.call(tracker, key) && tracker[key].full) {
			statsEl.innerHTML += `<p class="card-text ${key}">${tracker[key].full}: ${tracker[key].value}</p>`;
		}
	}
};

// Unhide the alert and set it's message
export const shopIssue = msg => {
	document.querySelector('.alert #errTxt').innerHTML = msg;
	removeClass(document.querySelector('.alert'), 'hidden');
};

export const updateCost = (val, item) => document.getElementById(`${item}-cost`).innerHTML = val;

// Display a clue
export const addClue = clue => document.querySelector('.clue-list').innerHTML += `<p class="card-text">${clue}</p>`;

// Clear out the clues
export const clearClues = () => document.querySelector('.clue-list').innerHTML = '';

// Once a word is solved, add it to the solved section
export const addSolvedWord = words => document.querySelector('.solved-words').innerHTML = words.join(', ');

export const clearSolvedWord = () => document.querySelector('.solved-words').innerHTML = '';

// Set a new word into our game box
export const setWord = tracker => document.querySelector('.hidden-word').innerHTML = tracker.foundLetters.join(' ');

export const clearWord = () => document.querySelector('.hidden-word').innerHTML = '';
