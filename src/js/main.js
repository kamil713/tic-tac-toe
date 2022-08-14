/* GAME LOGIC */

const CROSS_CLASS = 'cross';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
	'[data-wining-message-text]'
);
const restartButton = document.getElementById('restartButton');
let circleTurn;

restartButton.addEventListener('click', startGame);

function startGame() {
	cellElements.forEach((cell) => {
		cell.classList.remove(CROSS_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'Draw!';
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
	}
	winningMessageElement.classList.add('show');
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return (
			cell.classList.contains(CROSS_CLASS) ||
			cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(CROSS_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(CROSS_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		console.log(`combination ${combination}`);
		return combination.every((index) => {
			console.log(`index ${index}`);
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

/* SWITCHING BETWEEN SECTIONS */

const infoUserName = document.querySelector('.info__player-name');

const startPanelSection = document.querySelector('.start-panel');
const settingsSection = document.querySelector('.settings');
const playModeSection = document.querySelector('.mode-panel');
const pickSideSection = document.querySelector('.side');
const gameSection = document.querySelector('.game');

const settingsBtn = document.querySelector('.panel__button-settings');
const continueBtn = document.querySelector('.panel__button-continue');
const backBtn = document.querySelector('.panel__button-back');
const playWithFriendBtn = document.querySelector('.panel__button-friend');
const playWithAiBtn = document.querySelector('.panel__button-ai');

const userName = document.querySelector('.name__input');

const sideContinueBtn = document.querySelector('.panel__button-side');
const circleSide = document.querySelector('.circle__checkbox');
const crossSide = document.querySelector('.cross__checkbox');

sideContinueBtn.addEventListener('click', () => {
	if (circleSide.checked || crossSide.checked) {
		if (circleSide.checked) {
			circleTurn = true;
			console.log(circleTurn);
		} else {
			circleTurn = false;
			console.log(circleTurn);
		}

		pickSideSection.classList.toggle('hidden');
		gameSection.classList.remove('hidden');
		startGame();
	} else {
		alert('Choose your sign.');
	}
});

continueBtn.addEventListener('click', () => {
	if (userName.value !== '' && userName.value.length <= 10) {
		startPanelSection.classList.toggle('hidden');
		playModeSection.classList.remove('hidden');

		infoUserName.textContent = userName.value;
	} else {
		alert('Something went wrong. Try again.');
	}
});

playWithAiBtn.addEventListener('click', () => {
	alert('Still working on that section, be patient :)');
});

playWithFriendBtn.addEventListener('click', () => {
	playModeSection.classList.toggle('hidden');
	pickSideSection.classList.remove('hidden');
});

settingsBtn.addEventListener('click', () => {
	startPanelSection.classList.toggle('hidden');
	settingsSection.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
	settingsSection.classList.toggle('hidden');
	startPanelSection.classList.remove('hidden');
});

/* OPTIONS / SETTINGS */
let root = document.documentElement;

/* DARK MODE ELEMENT LOGIC */
const selectedDarkMode = document.querySelector('.selected--dark-mode');
const optionsContainerDarkMode = document.querySelector(
	'.options-container--dark-mode'
);
const optionsListDarkMode = document.querySelectorAll('.option--dark-mode');

const darkModeON = document.querySelector('.option--on');
const darkModeOFF = document.querySelector('.option--off');

selectedDarkMode.addEventListener('click', () => {
	optionsContainerDarkMode.classList.toggle('active');
});

optionsListDarkMode.forEach((el) => {
	el.addEventListener('click', () => {
		selectedDarkMode.innerHTML = el.querySelector('label').innerHTML;
		optionsContainerDarkMode.classList.remove('active');
	});
});

darkModeON.addEventListener('click', () => {
	console.log('ON');
	root.style.setProperty('--white', 'rgb(255, 255, 255)');
	root.style.setProperty('--dark', 'rgb(35, 35, 35)');
});

darkModeOFF.addEventListener('click', () => {
	console.log('OFF');
	root.style.setProperty('--white', 'rgb(35, 35, 35)');
	root.style.setProperty('--dark', 'rgb(255, 255, 255)');
});

/* DIFFICULTY ELEMENT LOGIC */
const selectedDifficulty = document.querySelector('.selected--difficulty');
const optionsContainerDifficulty = document.querySelector(
	'.options-container--difficulty'
);

const optionsListDifficulty = document.querySelectorAll('.option--difficulty');

selectedDifficulty.addEventListener('click', () => {
	optionsContainerDifficulty.classList.toggle('active');
});

optionsListDifficulty.forEach((el) => {
	el.addEventListener('click', () => {
		selectedDifficulty.innerHTML = el.querySelector('label').innerHTML;
		optionsContainerDifficulty.classList.remove('active');
	});
});

/* LAYOUT ELEMENT LOGIC */
const selectedLayout = document.querySelector('.selected--layout');
const optionsContainerLayout = document.querySelector(
	'.options-container--layout'
);
const optionsListLayout = document.querySelectorAll('.option--layout');

const redLayout = document.querySelector('.option--red');
const greenLayout = document.querySelector('.option--green');
const blueLayout = document.querySelector('.option--blue');

selectedLayout.addEventListener('click', () => {
	optionsContainerLayout.classList.toggle('active');
});

optionsListLayout.forEach((el) => {
	el.addEventListener('click', () => {
		selectedLayout.innerHTML = el.querySelector('label').innerHTML;
		optionsContainerLayout.classList.remove('active');
	});
});

redLayout.addEventListener('click', () => {
	console.log('red');
	root.style.setProperty('--red', 'rgb(160, 28, 53)');
	root.style.setProperty('--light-red', 'rgb(255, 0, 66)');
	root.style.setProperty('--light-red-opacity', 'rgba(255, 0, 66, 0.2)');
});

greenLayout.addEventListener('click', () => {
	console.log('green');
	// colors.red = colors.green;
	console.log(root.style);
	root.style.setProperty('--red', 'rgb(28, 160, 53)');
	root.style.setProperty('--light-red', 'rgb(0, 250, 66)');
	root.style.setProperty('--light-red-opacity', 'rgba(0, 250, 66, 0.2)');
});

blueLayout.addEventListener('click', () => {
	console.log('blue');
	root.style.setProperty('--red', 'rgb(53, 28, 160)');
	root.style.setProperty('--light-red', 'rgb(66, 0, 250)');
	root.style.setProperty('--light-red-opacity', 'rgba(66, 0, 250, 0.2)');
});
