# ⬡⬢ Conway's Game of Life but with Hexagons ⬢⬡

This is a simple implementation of Conway's Game of Life, but with hexagons instead of squares.

 It's written in Typescript using the [p5.js](https://p5js.org/) library with the [p5.ts](https://github.com/jlannoo/p5.ts) scaffold that I wrote.

I tweaked the rules to accomodate the different geometry. Instead of 8 neighbors, each cell has 6 neighbors. The rules are as follows:
- Any live cell with 0 or 1 live neighbors dies.
- Any live cell with 3 or 4 live neighbors lives.
- Any live cell with 5 or more live neighbors dies.
- Any dead cell with exactly 2 live neighbors becomes alive.
