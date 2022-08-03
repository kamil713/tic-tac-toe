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
