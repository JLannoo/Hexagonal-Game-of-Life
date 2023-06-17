import { CANVAS, CONFIGS, DEBUG, GRID } from "./constants";
import { HexCell } from "./cell";

export let currentBoard: HexCell[][];
export let nextBoard: HexCell[][];

export let playInterval: number;

// ===== EVENT LISTENING =====
function mousePressed(){
	const optionsModal = document.querySelector("dialog") as HTMLDialogElement;
	if(optionsModal.open) return;
	
	if(mouseButton === LEFT) toggleCell();
}
function keyPressed(){
	if(key === " ") play();
	if(key === "c") setupBoard();
}

// ===== FUNCTIONS =====
/**
 * Toggles the cell that was clicked
 */
function toggleCell(){
	const clickedCell = currentBoard.flat().find(cell => cell.clickInside(mouseX - CANVAS.MARGIN, mouseY - CANVAS.MARGIN));
	
	if(!clickedCell) return;
	clickedCell.toggle();

	redraw();
}

/**
 * Creates the next generation on a timer
 */
export function play(){
	clearInterval(playInterval);
	playInterval = setInterval(nextGeneration, CONFIGS.GENERATION_TIME);
}

/**
 * Clears the board of all cells
 */
export function setupBoard(){
	currentBoard = [];
	for (let x = 0; x < GRID.N; x++) {
		currentBoard[x] = [];
		for (let y = 0; y < GRID.N; y++) {
			currentBoard[x][y] = new HexCell(x, y);
		}
	}

	redraw();
}

/**
 * Generates the next generation of cells
 */
export function nextGeneration(){
	DEBUG.LOG_GENERATIONS && console.log("Next generation");

	nextBoard = Array(GRID.N).fill(null).map(() => Array(GRID.N).fill(null));

	for(const cell of currentBoard.flat()){
		const nextState = cell.getNextState(currentBoard);

		nextBoard[cell.x][cell.y] = new HexCell(cell.x, cell.y, nextState);
	}

	DEBUG.LOG_GENERATIONS && console.log({ currentBoard, nextBoard });
	
	// Switch boards and clear nextBoard
	currentBoard = nextBoard;
	nextBoard = [];

	redraw();
}

window.mousePressed = mousePressed;
window.keyPressed = keyPressed;