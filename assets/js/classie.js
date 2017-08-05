
/**
 * Classie is a tiny tiny library for class manipulation I wrote a while ago
 */

// Verify if the browser is modern enough to use the "Class List" property or not
const hasClassList = 'classList' in document.documentElement;

/**
 * Checks if the element has the class sent in
 * @param  {Object}  el the element we are going to be checking
 * @param  {String}  cl the class string we should be looking for
 * @return {Boolean}    returns a boolean that verifies if the class is present or not
 */
export const hasClass = (el, cl) => {
	// Check if we should use class list
	if (hasClassList) {
		return el.classList.contains(cl);
	}

	// Use regext to check for our class
	// We havet to use new RegExp() because it only accepts dynamic variable
	return new RegExp(`(^|\\s+) ${cl} (\\s+|$)`).test(el.className);
};

/**
 * Adds a class to our element
 * @param  {Object}  el the element we are going to be checking
 * @param  {String}  cl the class string we should be looking for
 */
export const addClass = (el, cl) => {
	if (hasClassList) {
		el.classList.add(cl);
	} else if (!hasClass(el, cl)) {
		el.className = `${el.className} ${cl}`;
	}
};

/**
 * Removes a class from our element
 * @param  {Object}  el the element we are going to be checking
 * @param  {String}  cl the class string we should be looking for
 */
export const removeClass = (el, cl) => {
	if (hasClassList) {
		el.classList.remove(cl);
	} else if (!hasClass(el, cl)) {
		el.className = el.className.replace(new RegExp(`(^|\\s+) ${cl} (\\s+|$)`), ' ');
	}
};

/**
 * Adds a class, and then after a timeout removes it
 * @param  {Object}  el the element we are going to be checking
 * @param  {String}  cl the class string we should be looking for
 * @param  {Number}  timer the length the class should be set for
 */
export const animClass = (el, cl, timer = 1000) => {
	addClass(el, cl);

	setTimeout(() => {
		removeClass(el, cl);
	}, timer);
};
