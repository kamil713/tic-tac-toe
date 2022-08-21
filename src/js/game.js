/* ***** */
/* GAME  */
/* ***** */
let $cellElements; // includes all cells of the game board
let $board; // adds 'hover' for all cells for the corresponding turn

/* WINNING MESSAGE */
let $winningMessageElement; // shows win message when all cells are completed
let $winningMessageTextElement; // completes win message about who won, tied or lost

/* SCORE SPAN */
let $resultPlayer; // place where app displays the player's score
let $resultAIorFriend; // place where app displays the result of ai or friend

/* RESTART */
let $restartButton; // is used to clear game board or reset game if the game is over

const game = () => {
	prepareGameElements();
	prepareGameEvents();
};

const prepareGameElements = () => {
	$resultPlayer = document.querySelector('.result__player');
	$resultAIorFriend = document.querySelector('.result__ai');

	$cellElements = document.querySelectorAll('[data-cell]');
	$board = document.getElementById('board');

	$winningMessageElement = document.getElementById('winningMessage');
	$winningMessageTextElement = document.querySelector('[data-wining-message-text]');

	$restartButton = document.querySelectorAll('.restart');
};

const prepareGameEvents = () => {
  $restartButton.forEach(el => { el.addEventListener('click', startGame); });
};

/* GAME VARIABLES */
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

let circleTurn;
let gameStatus = 'still running';
let currentBoard = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

let randomMode = ['easy', 'medium', 'hard'];
let randomNumber = Math.floor(Math.random() * 3);
let currentMode;

let opponentClass;
let fieldX;
let fieldY;

/* ********** */
/* GAME LOGIC */
/* ********** */

/* STARTS THE GAME AND RESETS THE VARIABLES */
function startGame() {
	$cellElements.forEach((cell) => {
		cell.classList.remove(CROSS_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});

	setBoardHoverClass();
	$winningMessageElement.classList.remove('show');
	gameStatus = 'still runinng';
	currentBoard = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	currentMode = getModeClassForName($selectedDifficulty.textContent);
	opponentClass = !circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
	const aiCurrentClass = !circleTurn ? CIRCLE_CLASS : CROSS_CLASS;

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

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

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

function swapTurns() {
	circleTurn = !circleTurn;
}

/* like above $board - adds 'hover' for the corresponding class */
function setBoardHoverClass() {
	$board.classList.remove(CROSS_CLASS);
	$board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		$board.classList.add(CIRCLE_CLASS);
	} else {
		$board.classList.add(CROSS_CLASS);
	}
}


/* SET THE LEVEL FOR AI  */
function getModeClassForName(name) {
	if (name === 'Random') return randomMode[randomNumber];
	if (name === 'Easy') return 'easy';
	if (name === 'Medium') return 'medium';
	if (name === 'Hard') return 'hard';
	return null;
}

function notify(turn) {
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
	}
}


/* CHECKING THE WINNINGS AND UPDATING THE SCORE */
function handleCheckWin(currentClass) {
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}

	if (checkWin(opponentClass)) {
		swapTurns();
		setBoardHoverClass();
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return $cellElements[index].classList.contains(currentClass);
		});
	});
}

function isDraw() {
	return [...$cellElements].every((cell) => {
		return (
			cell.classList.contains(CROSS_CLASS) ||
			cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

function endGame(draw) {
	if (draw) {
		$winningMessageTextElement.innerText = 'Draw!';
		gameStatus = 'finish';
		$winningMessageElement.classList.add('show');
		return false;
	} else {
		$winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
		gameStatus = 'finish';
		$winningMessageElement.classList.add('show');

		if (opponentClass === CROSS_CLASS && circleTurn) {
			$resultPlayer.textContent++;
		} else if (opponentClass === CROSS_CLASS && !circleTurn) {
			$resultAIorFriend.textContent++;
		} else if (opponentClass === CIRCLE_CLASS && !circleTurn) {
			$resultPlayer.textContent++;
		} else if (opponentClass === CIRCLE_CLASS && circleTurn) {
			$resultAIorFriend.textContent++;
		}

		return true;
	}
}


/* SELECTING THE MOVEMENT FOR THE SELECTED DIFFICULTY LEVEL */
function takeAEasyMove(turn) {
	let available = [];
	$cellElements.forEach((cell) => {
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
	$cellElements.forEach((cell) => {
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
		$cellElements[randomCell].classList.add(turn);
		$cellElements[randomCell].removeEventListener('click', handleClick);

		checkID(randomCell);
		if (currentBoard[fieldY][fieldX] == '') {
			currentBoard[fieldY][fieldX] = !circleTurn ? 'x' : 'o';
		}
	}
}

function takeAHardMove(turn) {
	let available = [];
	$cellElements.forEach((cell) => {
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
		$cellElements[randomCell].classList.add(turn);
		$cellElements[randomCell].removeEventListener('click', handleClick);

		checkID(randomCell);
		if (currentBoard[fieldY][fieldX] == '') {
			currentBoard[fieldY][fieldX] = !circleTurn ? 'x' : 'o';
		}
	}
}


/* AI || MINIMAX ALGORITHM */
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
				valuesOfMoves[i][j] = minMax(freeFields - 1, !turnX, false);
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

document.addEventListener('DOMContentLoaded', game);