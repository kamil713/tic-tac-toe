/* ******* */
/* GENERAL */
/* ******* */

/* ALL SECTIONS */
let $startPanelSection;
let $settingsSection;
let $playModeSection;
let $pickSideSection;
let $gameSection;

/* ALL SECTION BUTTONS */
let $continueBtn; // start-panel continue button
let $settingsBtn; // start-panel setting button
let $backBtn; // settings-panel back button
let $playWithFriendBtn; // play-mode play with friends button
let $playWithAiBtn; // play-mode play with ai button
let $sideContinueBtn; // pick-side continue button

/* ALL ABOUT PLAYER NAMES */
let $userName; // place where the user enters the name
let $infoUserName; // place where the application displays the user's name
let $infoAIorFirendName; // same as above or displays 'ai'

/* CHECKBOXES FROM PICK SIDE SECTION */
let $circleSide; // sets 'o' as player's choice
let $crossSide; // sets 'x' as player's choice

/* ************************************** */
/* BELOW IS ALL FROM THE SETTING SECTIONS */
/* ************************************** */

/* ROOT */
let $root; // is used to manipulate the styles of variables

/* DARK MODE ELEMENTS LOGIC */
let $selectedDarkMode; // default or user-selected dark mode value
let $optionsContainerDarkMode; // expands or collapses dark mode selection list
let $optionsListDarkMode; // all available options

/* DIFFICULTY ELEMENTS LOGIC */
let $selectedDifficulty; // default or user-selected difficulty value
let $optionsContainerDifficulty; // expands or collapses difficulty selection list
let $optionsListDifficulty; // all available options

/* LAYOUT ELEMENTS LOGIC */
let $selectedLayout; // default or user-selected layout value
let $optionsContainerLayout; // expands or collapses layout selection list
let $optionsListLayout; // all available options

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	$startPanelSection = document.querySelector('.start-panel');
	$settingsSection = document.querySelector('.settings');
	$playModeSection = document.querySelector('.mode-panel');
	$pickSideSection = document.querySelector('.side');
	$gameSection = document.querySelector('.game');

	$settingsBtn = document.querySelector('.panel__button-settings');
	$continueBtn = document.querySelector('.panel__button-continue');
	$backBtn = document.querySelector('.panel__button-back');
	$playWithFriendBtn = document.querySelector('.panel__button-friend');
	$playWithAiBtn = document.querySelector('.panel__button-ai');
	$sideContinueBtn = document.querySelector('.panel__button-side');

	$userName = document.querySelector('.name__input');
	$infoUserName = document.querySelector('.info__player-name');
	$infoAIorFirendName = document.querySelector('.info__ai');

	$circleSide = document.querySelector('.circle__checkbox');
	$crossSide = document.querySelector('.cross__checkbox');

	$root = document.documentElement;

	$selectedDarkMode = document.querySelector('.selected--dark-mode');
	$optionsContainerDarkMode = document.querySelector('.options-container--dark-mode');
	$optionsListDarkMode = document.querySelectorAll('.option--dark-mode');

	$selectedDifficulty = document.querySelector('.selected--difficulty');
	$optionsContainerDifficulty = document.querySelector('.options-container--difficulty');
	$optionsListDifficulty = document.querySelectorAll('.option--difficulty');

	$selectedLayout = document.querySelector('.selected--layout');
	$optionsContainerLayout = document.querySelector('.options-container--layout');
	$optionsListLayout = document.querySelectorAll('.option--layout');
};

const prepareDOMEvents = () => {
	$continueBtn.addEventListener('click', moveToPlayModeSection);
	$settingsBtn.addEventListener('click', moveToSettingSection);
	$backBtn.addEventListener('click', returnToStartPanelSection);
	$playWithAiBtn.addEventListener('click', function () {
		moveToPickSideSection('ai');
	});
	$playWithFriendBtn.addEventListener('click', function () {
		moveToPickSideSection('friend');
	});
	$sideContinueBtn.addEventListener('click', moveToGameSection);

	$selectedDarkMode.addEventListener('click', expandDarkModeSelectionList);
	$optionsListDarkMode.forEach((el) => {
		el.addEventListener('click', function () {
			selectElementFromDarkModeList(el);
		});
	});
	$selectedDifficulty.addEventListener('click', expandDifficultySelectionList);
	$optionsListDifficulty.forEach((el) => {
		el.addEventListener('click', function () {
			selectElementDifficultyList(el);
		});
	});
	$selectedLayout.addEventListener('click', expandLayoutSelectionList);
	$optionsListLayout.forEach((el) => {
		el.addEventListener('click', function () {
			selectElementLayoutList(el);
		});
	});
};

let gameMode = ''; // przeniesc do game

/* ************************** */
/* BELOW IS ALL LOGIC FOR ... */
/* ************************** */

/* SWITCHING BETWEEN SECTIONS */
const moveToPlayModeSection = () => {
	if ($userName.value !== '' && $userName.value.length <= 10) {
		$startPanelSection.classList.toggle('hidden');
		$playModeSection.classList.remove('hidden');

		$infoUserName.textContent = $userName.value;
	} else {
		alert('Something went wrong. Try again.');
	}
};

const moveToSettingSection = () => {
	$startPanelSection.classList.toggle('hidden');
	$settingsSection.classList.remove('hidden');
};

const returnToStartPanelSection = () => {
	$settingsSection.classList.toggle('hidden');
	$startPanelSection.classList.remove('hidden');
};

const moveToPickSideSection = (mode) => {
	$playModeSection.classList.toggle('hidden');
	$pickSideSection.classList.remove('hidden');

	if (mode === 'ai') {
		gameMode = 'ai';
		$infoAIorFirendName.textContent = 'AI';
	} else {
		gameMode = '';
		$infoAIorFirendName.textContent = $userName.value;
	}
};

const moveToGameSection = () => {
	if ($circleSide.checked || $crossSide.checked) {
		if ($circleSide.checked) {
			circleTurn = true;
		} else {
			circleTurn = false;
		}

		$pickSideSection.classList.toggle('hidden');
		$gameSection.classList.remove('hidden');
		startGame();
	} else {
		alert('Choose your sign.');
	}
};

/* OPTIONS / SETTINGS */
/* DARK MODE */
const expandDarkModeSelectionList = () => {
	$optionsContainerDarkMode.classList.toggle('active');
};
const selectElementFromDarkModeList = (el) => {
	$selectedDarkMode.innerHTML = el.querySelector('label').innerHTML;

	switch ($selectedDarkMode.textContent) {
		case 'On':
			$root.style.setProperty('--white', 'rgb(255, 255, 255)');
			$root.style.setProperty('--dark', 'rgb(35, 35, 35)');
			break;
		case 'Off':
			$root.style.setProperty('--white', 'rgb(35, 35, 35)');
			$root.style.setProperty('--dark', 'rgb(255, 255, 255)');
			break;
		default:
			console.log('error');
			console.log($selectedDarkMode.textContent);
			break;
	}

	$optionsContainerDarkMode.classList.remove('active');
};

/* DIFFICULTY */
const expandDifficultySelectionList = () => {
	$optionsContainerDifficulty.classList.toggle('active');
};
const selectElementDifficultyList = (el) => {
	$selectedDifficulty.innerHTML = el.querySelector('label').innerHTML;
	$optionsContainerDifficulty.classList.remove('active');
};

/* LAYOUT */
const expandLayoutSelectionList = () => {
	$optionsContainerLayout.classList.toggle('active');
};
const selectElementLayoutList = (el) => {
	$selectedLayout.innerHTML = el.querySelector('label').innerHTML;

	switch ($selectedLayout.textContent) {
		case 'Red':
			$root.style.setProperty('--red', 'rgb(160, 28, 53)');
			$root.style.setProperty('--light-red', 'rgb(255, 0, 66)');
			$root.style.setProperty('--light-red-opacity', 'rgba(255, 0, 66, 0.2)');
			break;
		case 'Green':
			$root.style.setProperty('--red', 'rgb(28, 160, 53)');
			$root.style.setProperty('--light-red', 'rgb(0, 250, 66)');
			$root.style.setProperty('--light-red-opacity', 'rgba(0, 250, 66, 0.2)');
			break;
		case 'Blue':
			$root.style.setProperty('--red', 'rgb(53, 28, 160)');
			$root.style.setProperty('--light-red', 'rgb(66, 0, 250)');
			$root.style.setProperty('--light-red-opacity', 'rgba(66, 0, 250, 0.2)');
			break;
		default:
			console.log('error');
			console.log($selectedDarkMode.textContent);
			break;
	}

	$optionsContainerLayout.classList.remove('active');
};


document.addEventListener('DOMContentLoaded', main);