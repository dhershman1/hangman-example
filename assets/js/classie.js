
const classie = () => {
	const hasClassList = 'classList' in document.documentElement;

	const hasClass = (el, cl) => {
		if (hasClassList) {
			return el.classList.contains(cl);
		}

		return new RegExp(`(^|\\s+) ${cl} (\\s+|$)`).test(el.className);
	};

	const addClass = (el, cl) => {
		if (hasClassList) {
			el.classList.add(cl);
		} else if (!hasClass(el, cl)) {
			el.className = `${el.className} ${cl}`;
		}
	};

	const removeClass = (el, cl) => {
		if (hasClassList) {
			el.classList.remove(cl);
		} else if (!hasClass(el, cl)) {
			el.className = el.className.replace(new RegExp(`(^|\\s+) ${cl} (\\s+|$)`), ' ');
		}
	};

	const toggleClass = (el, cl) => {
		const fn = hasClass(el, cl) ? removeClass : addClass;

		fn(el, cl);
	};

	return {
		hasClass,
		addClass,
		removeClass,
		toggleClass
	};
};

window.classie = classie;
