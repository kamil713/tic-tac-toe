

let root = document.documentElement;
console.log(root.style);

const startPanelSection = document.querySelector('.start-panel');
const settingsSection = document.querySelector('.settings');

const settingsBtn = document.querySelector('.panel__button-settings');
const continueBtn = document.querySelector('.panel__button-continue');
const backBtn = document.querySelector('.panel__button-back');

const userName = document.querySelector('.name__input');

const darkMode = document.querySelector('.selected--dark-mode');
const difficulty = document.querySelector('.selected--difficulty');
// const layout = document.querySelector('.selected--layout');

const darkModeON = document.querySelector(".option--on");
const darkModeOFF = document.querySelector(".option--off");

const redLayout = document.querySelector(".option--red");
const greenLayout = document.querySelector(".option--green");
const blueLayout = document.querySelector(".option--blue");

darkModeON.addEventListener("click", () => {
	console.log("ON");
	root.style.setProperty('--white', 'rgb(255, 255, 255)');
	root.style.setProperty('--dark', 'rgb(35, 35, 35)');
})

darkModeOFF.addEventListener("click", () => {
	console.log("OFF");
	root.style.setProperty('--white', 'rgb(35, 35, 35)');
	root.style.setProperty('--dark', 'rgb(255, 255, 255)');
})

redLayout.addEventListener("click", () => {
	console.log('red');
	root.style.setProperty('--red', 'rgb(160, 28, 53)');
	root.style.setProperty('--light-red', 'rgb(255, 0, 66)');
	root.style.setProperty('--light-red-opacity', 'rgba(255, 0, 66, 0.2)');
})

greenLayout.addEventListener("click", () => {
	console.log('green');
	// colors.red = colors.green;
	console.log(root.style);
	root.style.setProperty('--red', 'rgb(28, 160, 53)');
	root.style.setProperty('--light-red', 'rgb(0, 250, 66)');
	root.style.setProperty('--light-red-opacity', 'rgba(0, 250, 66, 0.2)');

})

blueLayout.addEventListener("click", () => {
	console.log('blue');
	root.style.setProperty('--red', 'rgb(53, 28, 160)');
	root.style.setProperty('--light-red', 'rgb(66, 0, 250)');
	root.style.setProperty('--light-red-opacity', 'rgba(66, 0, 250, 0.2)');
})

/* userName.addEventListener('keyup', () => {
	console.log(userName.value.length);
}); */



continueBtn.addEventListener('click', () => {
	if ((userName.value !== "") && (userName.value.length <= 20)) {
		alert("It's work :)")
	} else {
		alert("Something went wrong. Try again.")
	}
});

settingsBtn.addEventListener('click', () => {
	startPanelSection.classList.toggle('hidden');
	settingsSection.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
	settingsSection.classList.toggle('hidden');
	startPanelSection.classList.remove('hidden');
});











/* DARK MODE ELEMENT LOGIC */
const selectedDarkMode = document.querySelector('.selected--dark-mode');
const optionsContainerDarkMode = document.querySelector(
	'.options-container--dark-mode'
);

const optionsListDarkMode = document.querySelectorAll('.option--dark-mode');

selectedDarkMode.addEventListener('click', () => {
	optionsContainerDarkMode.classList.toggle('active');
});

optionsListDarkMode.forEach((el) => {
	el.addEventListener('click', () => {
		selectedDarkMode.innerHTML = el.querySelector('label').innerHTML;
		optionsContainerDarkMode.classList.remove('active');
	});
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

selectedLayout.addEventListener('click', () => {
	optionsContainerLayout.classList.toggle('active');
});

optionsListLayout.forEach((el) => {
	el.addEventListener('click', () => {
		selectedLayout.innerHTML = el.querySelector('label').innerHTML;
		optionsContainerLayout.classList.remove('active');
	});
});




/* If class active to wtedy flex start na icon i title :) */



/* const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');

const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', () => {
	optionsContainer.classList.toggle('active');
});

optionsList.forEach((o) => {
	o.addEventListener('click', () => {
		selected.innerHTML = o.querySelector('label').innerHTML;
		optionsContainer.classList.remove('active');
	});
}); */