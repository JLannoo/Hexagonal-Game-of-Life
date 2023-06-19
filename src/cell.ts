import { GRID, DEBUG, RULES, COLORS } from "./constants";

export class HexCell {
	public x: number;
	public y: number;
	public isAlive: boolean;
	private offset: number;

	private xScaleFactor = sqrt(3);
	private yScaleFactor = 1.5;

	constructor(x: number, y: number, isAlive = false) {
		this.x = x;
		this.y = y;
		this.offset = y % 2;
		this.isAlive = isAlive;
	}

	public draw() {
		stroke(COLORS.STROKE);
		strokeWeight(GRID.N >= 40 ? 1 : 2);
		fill(this.isAlive ? COLORS.ALIVE : COLORS.DEAD);
	
		const { x, y } = this.gridToPixel(this.x, this.y);

		beginShape();
		for (let i = 0; i < 6; i++) {
			const angle = i * PI / 3 + PI / 6;
			const px = x + (GRID.SIZE/2) * cos(angle);
			const py = y + (GRID.SIZE/2) * sin(angle);
			vertex(px, py);
		}
		endShape(CLOSE);

		if(DEBUG.SHOW_COORDS){
			fill(this.isAlive ? 0 : 255);
			textSize(GRID.SIZE / 5);
			noStroke();
			textAlign(CENTER, CENTER);

			text(`${this.x}, ${this.y}`, x, y);
		}
	}

	public toggle() {
		this.isAlive = !this.isAlive;
	}

	public clickInside(mouseX: number, mouseY: number): boolean {
		const { x, y } = this.gridToPixel(this.x, this.y);

		return dist(mouseX, mouseY, x, y) < GRID.SIZE/2;
	}

	private gridToPixel(x: number, y: number): { x: number, y: number } {
		const displace = DEBUG.NO_OFFSET ? 0 : this.offset * ((GRID.SIZE/2) * this.xScaleFactor) / 2;

		const px = (x * GRID.SIZE/2 * this.xScaleFactor) + GRID.SIZE/2 + displace;
		const py = (y * GRID.SIZE/2 * this.yScaleFactor) + GRID.SIZE/2;

		return { x: px, y: py };
	}

	public getNeighbours(board: HexCell[][]): HexCell[] {
		const neighbours: HexCell[] = [];

		neighbours.push(board[this.x - 1]?.[this.y]);
		neighbours.push(board[this.x + 1]?.[this.y]);
		neighbours.push(board[this.x]?.[this.y - 1]);
		neighbours.push(board[this.x]?.[this.y + 1]);

		if(this.offset === 0){
			neighbours.push(board[this.x - 1]?.[this.y - 1]);
			neighbours.push(board[this.x - 1]?.[this.y + 1]);
		} else {
			neighbours.push(board[this.x + 1]?.[this.y - 1]);
			neighbours.push(board[this.x + 1]?.[this.y + 1]);
		}

		return neighbours.filter(cell => cell !== undefined);
	}

	public getNeighboursAlive(board: HexCell[][]): number {
		return this.getNeighbours(board).filter(cell => cell.isAlive).length;
	}

	public getNextState(board: HexCell[][]): boolean {
		const aliveNeighbours = this.getNeighboursAlive(board);

		if(this.isAlive){
			return RULES.SURVIVE.includes(aliveNeighbours);
		} else {
			return RULES.BIRTH.includes(aliveNeighbours);
		}
	}
}