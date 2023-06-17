// ===== CANVAS =====
const width = 1000;
const margin = 20;
export const CANVAS = {
	WIDTH: width,
	HEIGHT: width * 0.75 + margin * 3,
	MARGIN: margin,
};

const bodyColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
export const COLORS = {
	STROKE: "#FFFFFF",
	BACKGROUND: bodyColor,

	DEAD: bodyColor,
	ALIVE: "#FFFFFF",
};

// ===== SIZES =====
const GRID_N = 20;
export const GRID = {
	N: GRID_N,
	SIZE: CANVAS.WIDTH / GRID_N,
};

// ===== RULES =====
/**
 * ### RULES
 * - Any live cell with 3 or 4 live neighbours survives.
 * - Any dead cell with 2 live neighbours becomes a live cell.
 * - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 * 
 * > These can be changed to any set of numbers.
 */
export const RULES = {
	SURVIVE: [ 3, 4 ],
	BIRTH: [ 2 ],
};

// ===== CONFIGS =====
export const CONFIGS = {
	GENERATION_TIME: 100,
};

// ===== DEBUG =====
export const DEBUG = {
	SHOW_COORDS: false,
	NO_OFFSET: false,
	LOG_GENERATIONS: false,
};

