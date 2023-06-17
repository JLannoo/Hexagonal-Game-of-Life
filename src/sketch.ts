import { CANVAS, COLORS } from "./constants";

import { setupBoard, currentBoard } from "./boardControl";

function setup(){
	const canvas = createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);
	canvas.parent("sketch");
	setupBoard();
}

function draw(){
	background(COLORS.DEAD);

	push();
	translate(CANVAS.MARGIN, CANVAS.MARGIN);
	for(const cell of currentBoard.flat()){
		cell.draw();
	}
	pop();

	noLoop();
}

window.setup = setup;
window.draw = draw;