import { nextGeneration, play, playInterval, setupBoard } from "./boardControl";
import { CANVAS, CONFIGS, DEBUG, GRID, RULES } from "./constants";

// Buttons
const playButton = document.querySelector("#PlayPause") as HTMLButtonElement;
const clearButton = document.querySelector("#Clear") as HTMLButtonElement;
const stepButton = document.querySelector("#Step") as HTMLButtonElement;

// Dialog
const optionsButton = document.querySelector("#Options") as HTMLButtonElement;
const optionsMenu = document.querySelector("dialog") as HTMLDialogElement;
const dialogClose = document.querySelector("#dialog-close") as HTMLButtonElement;

const optionsForm = document.querySelector("form") as HTMLFormElement;
const speedInput = document.querySelector("#speed") as HTMLInputElement;
speedInput.value = String(CONFIGS.GENERATION_TIME);
const speedValue = document.querySelector("#speed-value") as HTMLSpanElement;
speedValue.textContent = speedInput.value;
const gridNumberInput = document.querySelector("#grid") as HTMLInputElement;
gridNumberInput.value = String(GRID.N);

const birthInput = document.querySelector("#birth") as HTMLInputElement;
birthInput.value = RULES.BIRTH.toString();
const surviveInput = document.querySelector("#survive") as HTMLInputElement;
surviveInput.value = RULES.SURVIVE.toString();

const showCoordinatesInput = document.querySelector("#debug-coordinates") as HTMLInputElement;
showCoordinatesInput.checked = DEBUG.SHOW_COORDS;

// Event listeners

// Actions
playButton.addEventListener("click", () => {
	const isPlaying = playButton.classList.contains("active");

	playButton.classList.toggle("active");

	isPlaying ? clearInterval(playInterval) : play();
	playButton.textContent = isPlaying ? "Play" : "Pause";
});

clearButton.addEventListener("click", setupBoard);
stepButton.addEventListener("click", nextGeneration);

// Options
function toggleDialog(){
	optionsMenu.open ? optionsMenu.close() : optionsMenu.showModal();
}
optionsButton.addEventListener("click", toggleDialog);

// Form
speedInput.addEventListener("change", () => {
	speedValue.textContent = speedInput.value;
});
function changeOptions(){
	const gridNumber = gridNumberInput.valueAsNumber;
	const speed = speedInput.valueAsNumber;
    
	if(gridNumber > 0) {
		GRID.N = gridNumber;
		GRID.SIZE = CANVAS.WIDTH / GRID.N;
	}

	if(speed > 0) CONFIGS.GENERATION_TIME = speed;

	DEBUG.SHOW_COORDS = showCoordinatesInput.checked;

	RULES.BIRTH = birthInput.value.split(",").map(Number) || [ 2 ];
	RULES.SURVIVE = surviveInput.value.split(",").map(Number) || [ 2, 3 ];

	setupBoard();
	toggleDialog();
}
dialogClose.addEventListener("click", changeOptions);
optionsForm.addEventListener("submit", changeOptions);