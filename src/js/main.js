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
let gameMode = '';

const userName = document.querySelector('.name__input');

const sideContinueBtn = document.querySelector('.panel__button-side');
const circleSide = document.querySelector('.circle__checkbox');
const crossSide = document.querySelector('.cross__checkbox');

let helpTurn;
sideContinueBtn.addEventListener('click', () => {
	if (circleSide.checked || crossSide.checked) {
		if (circleSide.checked) {
			circleTurn = true;
			helpTurn = true;
			console.log(circleTurn);
		} else {
			circleTurn = false;
			helpTurn = false;
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
	playModeSection.classList.toggle('hidden');
	pickSideSection.classList.remove('hidden');
	gameMode = 'ai';
});

playWithFriendBtn.addEventListener('click', () => {
	playModeSection.classList.toggle('hidden');
	pickSideSection.classList.remove('hidden');
	gameMode = '';
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

let resultPlayer = document.querySelector('.result__player');
let resultAI = document.querySelector('.result__ai');

const restartBtn = document.querySelector('.panel__button-restart');
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
	'[data-wining-message-text]'
);
const restartButton = document.getElementById('restartButton');
let circleTurn;
let gameStatus = 'still running';
let currentBoard = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

restartBtn.addEventListener('click', startGame);

let randomMode = ['easy', 'medium', 'hard'];
let randomNumber = Math.floor(Math.random() * 3);
let currentMode;

function getModeClassForName(name) {
	if (name === 'Random') return randomMode[randomNumber];
	if (name === 'Easy') return 'easy';
	if (name === 'Medium') return 'medium';
	if (name === 'Hard') return 'hard';
	return null;
}

function notify(turn) {
	// ...
	console.log(currentMode);
	switch (currentMode) {
		case 'easy':
			takeAEasyMove(turn);
			break;
		case 'medium':
			takeAMediumMove(turn);
			break;
		case 'hard':
			takeAHardMove(turn);
			break;
		// ...
	}
}

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
	gameStatus = 'still runinng';
	currentBoard = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	currentMode = getModeClassForName(selectedDifficulty.textContent);
}

let fieldX;
let fieldY;
function checkID(id) {
	if (id < 3) {
		fieldX = id;
		fieldY = 0;
	} else if (id < 6) {
		fieldX = id - 3;
		fieldY = 1;
	} else {
		fieldX = id - 6;
		fieldY = 2;
	}
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
	const aiCurrentClass = !circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
	console.log(currentBoard);
	if (gameStatus === 'still runinng') {
		placeMark(cell, currentClass);
		handleCheckWin(currentClass);

		checkID(cell.id);
		if (currentBoard[fieldY][fieldX] == '') {
			currentBoard[fieldY][fieldX] = currentClass == CROSS_CLASS ? 'x' : 'o';
		}
	}

	if (gameStatus === 'still runinng') {
		if (gameMode !== '') {
			notify(aiCurrentClass);
			handleCheckWin(aiCurrentClass);
		}
	}
}

function handleCheckWin(currentClass) {
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
		gameStatus = 'finish';
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
		gameStatus = 'finish';
		// if (circleTurn) {
		// 	resultPlayer.textContent++;
		// } else {
		// 	resultAI.textContent++;
		// }
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
		// try
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(CROSS_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		// console.log(`combination ${combination}`);
		return combination.every((index) => {
			// console.log(`index ${index} ${cellElements[index].classList.contains(currentClass)}`);
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

/* CONTROL GAME */

function takeAEasyMove(turn) {
	let available = [];
	cellElements.forEach((cell) => {
		if (
			!cell.classList.contains('cross') &&
			!cell.classList.contains('circle')
		) {
			available.push(cell);
		}
	});

	let randomCell = available[Math.floor(Math.random() * available.length)];
	if (randomCell !== undefined) {
		randomCell.classList.add(turn);
		randomCell.removeEventListener('click', handleClick);
	}
}

function takeAMediumMove(turn) {
	let available = [];
	cellElements.forEach((cell) => {
		if (
			!cell.classList.contains('cross') &&
			!cell.classList.contains('circle')
		) {
			available.push(cell);
		}
	});

	let randomCell;
	if (Boolean(Math.round(Math.random()))) {
		randomCell = minMax(available.length, false, true);
		console.log('ai');
	} else {
		randomCell = available[Math.floor(Math.random() * available.length)].id; //
		console.log('przypadkowa');
	}

	if (randomCell !== undefined) {
		console.log(randomCell);
		cellElements[randomCell].classList.add(turn);
		cellElements[randomCell].removeEventListener('click', handleClick);

		checkID(randomCell);
		if (currentBoard[fieldY][fieldX] == '') {
			currentBoard[fieldY][fieldX] = !circleTurn ? 'x' : 'o';
		}
	}
}

function takeAHardMove(turn) {
	let available = [];
	cellElements.forEach((cell) => {
		if (
			!cell.classList.contains('cross') &&
			!cell.classList.contains('circle')
		) {
			available.push(cell);
		}
	});

	let randomCell = minMax(available.length, false, true);
	console.log(randomCell);
	if (randomCell !== undefined) {
		console.log('wbiłem tu');
		cellElements[randomCell].classList.add(turn);
		cellElements[randomCell].removeEventListener('click', handleClick);

		checkID(randomCell);
		if (currentBoard[fieldY][fieldX] == '') {
			currentBoard[fieldY][fieldX] = !circleTurn ? 'x' : 'o';
		}
	}
}

function minMax(freeFields, turnX, depth0) {
	const humanTurn = circleTurn ? 'x' : 'o';
	const aiTurn = !circleTurn ? 'x' : 'o';

	let supp = turnX ? true : false;

	if (checkIfSomeoneHasWon()) {
		if (supp) return 3;
		else return 1;
	}

	if (freeFields == 0) return 2;
	let valueOfThisMove = 0;
	let valuesOfMoves = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (currentBoard[i][j] == '') {
				if (supp) currentBoard[i][j] = humanTurn;
				else currentBoard[i][j] = aiTurn;
				valuesOfMoves[i][j] = minMax(freeFields - 1, !turnX, false); // >>>????
				currentBoard[i][j] = '';
			}
		}
	}

	if (supp) {
		valueOfThisMove = 3;
		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				if (valuesOfMoves[i][j] != 0 && valuesOfMoves[i][j] < valueOfThisMove)
					valueOfThisMove = valuesOfMoves[i][j];
	} else {
		let x = 0;
		let y = 0;
		valueOfThisMove = valuesOfMoves[0][0];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (valuesOfMoves[i][j] > valueOfThisMove) {
					valueOfThisMove = valuesOfMoves[i][j];
					x = j;
					y = i;
				}
			}
		}
		if (depth0) return y * 3 + x;
	}

	return valueOfThisMove;
}

function checkIfSomeoneHasWon() {
	for (let i = 0; i < 3; i++)
		if (
			currentBoard[i][0] != '' &&
			currentBoard[i][0] == currentBoard[i][1] &&
			currentBoard[i][1] == currentBoard[i][2]
		)
			return true;
	for (let i = 0; i < 3; i++)
		if (
			currentBoard[0][i] != '' &&
			currentBoard[0][i] == currentBoard[1][i] &&
			currentBoard[1][i] == currentBoard[2][i]
		)
			return true;
	if (
		currentBoard[0][0] != '' &&
		currentBoard[0][0] == currentBoard[1][1] &&
		currentBoard[1][1] == currentBoard[2][2]
	)
		return true;
	if (
		currentBoard[2][0] != '' &&
		currentBoard[2][0] == currentBoard[1][1] &&
		currentBoard[1][1] == currentBoard[0][2]
	)
		return true;
	return false;
}
