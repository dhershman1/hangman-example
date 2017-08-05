import {addClass, removeClass} from './classie.js';
import {engine} from './engine.js';

/**
 * The core to the entire game
 * Builds out the displays, and sets up our data
 * And then it is done. Engine takes it from there
 */


export const hangman = (difficulty = 'normal') => {
	const words = [
		{
			name: 'AVON',
			points: 3,
			clues: ['This brand name is also the name of a city within Lorain County',
				'This brand is also the name of a pyramid scheme makeup company']
		}, {
			name: 'BFGOODRICH',
			points: 1.5,
			clues: ['This brand name is sort of similar to the chain "Goodwill"',
				'The first two letters of this brand are commonly used in text to describe "Best Friend"']
		}, {
			name: 'GOODYEAR',
			points: 1,
			clues: ['Something you would say if your year was pleasant',
				'One of the more iconic brands commonly found around akron']
		}, {
			name: 'FIRESTONE',
			points: 1,
			clues: ['This brands name is some what related to "hot stone"']
		}, {
			name: 'FUZION',
			points: 3,
			clues: ['This brand uses the improper spelling of what its called to Fuse something together',
				'This brand shares the first part of a party video game name for the old school xbox']
		}, {
			name: 'MICHELIN',
			points: 1,
			clues: ['Commonly known for its iconic mascot the BRANDNAME Man',
				'This mascot is commonly protrayed doing heroic acts in animated commercials']
		}, {
			name: 'PIRELLI',
			points: 2,
			clues: ['This brand is actually an italian company',
				'It ironically manufactures tires in the USA but in a city called Rome']
		}, {
			name: 'CONTINENTAL',
			points: 1.5,
			clues: ['This brand name is relative to what is the proper name of the land that North America is',
				'This land is usually pretty MASSIVE in size']
		}, {
			name: 'DUNLOP',
			points: 2,
			clues: ['This brand actually formed in Britian before selling in the USA']
		}, {
			name: 'BRIDGESTONE',
			points: 1.5,
			clues: ['This brand name shares its name with bridges', 'Like "Hot stone" but with bridges']
		}, {
			name: 'HANKOOK',
			points: 2,
			clues: ['This brand is a play on the famous John that signed the Declaration of Independence']
		}, {
			name: 'GENERALTIRE',
			points: 2,
			clues: ['This brand shares its name with a major brand in the car industry']
		}, {
			name: 'DICKCEPEK',
			points: 2,
			clues: ['This company is named after an American Off-Road motorsports hall of fame member from the 1900s',
				'It became a brand name for tires and parts in 1963']
		}, {
			name: 'FALKEN',
			points: 1.5,
			clues: ['This brand name could be used in the iconic phrase "FALCON PUNCH!"']
		}, {
			name: 'KOOSIER',
			points: 3,
			clues: ['This brand name shares the first few letters of its name with "koozy" like a beer koozy']
		}, {
			name: 'KUMHO',
			points: 1.5,
			clues: ['This brand is a foreign tire company from South Korea']
		}, {
			name: 'LAUFENN',
			points: 2,
			clues: [
				'This brand is actually owned by the brand named after the famous John who signed the Declaration of Independence'
			]
		}, {
			name: 'NEXEN',
			points: 2,
			clues: ['This brand is also a foreign company from South Korea',
				'This brand shares its name with a game development company']
		}, {
			name: 'POWERKING',
			points: 2,
			clues: ['This brand has a strong something level',
				'This brand shares its name with a person of power from medieval times']
		}, {
			name: 'RIKEN',
			points: 1.5,
			clues: ['This brand gets its tires made by the same company with the iconic hero mascot']
		}, {
			name: 'SUMITOMO',
			points: 1.5,
			clues: ['This brands origin is located within Japan and was a subsidiary of one of the brands that was from Britian']
		}, {
			name: 'TOYO',
			points: 1,
			clues: ['This brand has strong link with a major car manufacturing company in the US',
				'Its name shares the same first letters of this major car manufacture']
		}, {
			name: 'UNIROYAL',
			points: 1,
			clues: ['This brand has royality in its name', 'It also has a little something about unity']
		}, {
			name: 'VREDESTEIN',
			points: 3,
			clues: ['This little known brand is based out of the Netherlands',
				'The first two letters of its name are a current type of video game trend']
		}, {
			name: 'YOKOHAMA',
			points: 1,
			clues: ['This brand is pretty well known for its dirt bikes', 'Its origin is also in Japan']
		}
	];
	const rules = {
		nightmare: {
			lives: 2,
			multiplier: 3
		},
		hard: {
			lives: 5,
			multiplier: 2
		},
		normal: {
			lives: 10,
			multiplier: 1.5
		},
		easy: {
			lives: 15,
			multiplier: 1
		}
	};
	const currRules = rules[difficulty];
	const makeGuess = engine(words, currRules);

	document.onkeyup = ({key}) => {
		if (key.length === 1 && (/[A-Z]/i).test(key)) {
			document.getElementById(`${key.toLowerCase()}Btn`).disabled = true;
			makeGuess(key.toUpperCase());
		}
	};
	document.querySelectorAll('.letters button').forEach(btn => {
		btn.onclick = ({target}) => {
			btn.disabled = true;
			makeGuess(target.value);
		};
	});

	if (difficulty === 'nightmare') {
		addClass(document.querySelector('.main-logo'), 'hidden');
		removeClass(document.querySelector('.nightmare-logo'), 'hidden');
		addClass(document.querySelector('body'), 'nightmare');
	}

};

// Listner
document.querySelectorAll('.intro-content button').forEach(el => {
	el.onclick = ({target}) => {
		addClass(document.querySelector('.intro-content'), 'hidden');
		removeClass(document.querySelector('.main-content'), 'hidden');
		hangman(target.value);
	};
});
