const GameBoard = require("../src/gameBoard");
const Ship = require("../src/ship");
// board.board[value1][value2] -> value2 is adjusted by adding 1 to align with the gameboard functions format,
// where the y-axis uses a 1-10 index range, and the x-axis follows the array's 0-9 index range.

let ship;
let board;

beforeEach(() => {
  board = new GameBoard();
  ship = new Ship(3);
});

test("Vertical - Ship placement at invalid coordinates fails", () => {
  expect(board.placeShip(3, [11, 5], true)).toBe("invalid position");
});
test("Ship placement at invalid coordinates fails", () => {
  expect(board.placeShip(3, [3, 0])).toBe("invalid position");
});

test("place ships at specific coordinates", () => {
  board.placeShip(3, [3, 5]);

  expect(board.board[3][5].name).toBe(ship.name);
});

test("try to place a ship bigger than the coordinate area", () => {
  expect(board.placeShip(3, [3, 9])).toBe("ship does not fit this coordinate");
});

test("try to place a ship in another ship area", () => {
  board.placeShip(3, [3, 5]);
  expect(board.placeShip(3, [3, 5])).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - place ships at specific coordinates", () => {
  board.placeShip(3, [3, 5], true);
  expect(board.board[3][5 - 1].name).toBe(ship.name);
});

test("Vertical - try to place a ship bigger than the coordinate area", () => {
  expect(board.placeShip(3, [8, 8], true)).toBe(
    "ship does not fit this coordinate"
  );
});

test("Vertical - try to place a ship in another ship area", () => {
  board.placeShip(3, [3, 5]);
  expect(board.placeShip(3, [3, 5], true)).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - single ship placement", () => {
  board.placeShip(4, [5, 5], true);
  expect(board.board[5][4].name).toBe("destroyer");
});

test("find a ship at specific coordinates", () => {
  board.placeShip(1, [9, 9]);
  const placedShip = board.board[9][8];
  expect(board.findShip("i", 9)).toBe(placedShip.id);
});

test("ship not found at specific coordinates", () => {
  expect(board.findShip("j", 9)).toBe(`there is no ship at current coordinate`);
});

test("HIT -> receiveAttack at specific coordinates", () => {
  board.placeShip(2, [10, 9]);
  expect(board.receiveAttack("j", 9)).toBe(`you hit a ship!`);
});

test("MISS -> receiveAttack at specific coordinates", () => {
  expect(board.receiveAttack("j", 9)).toBe(`you missed!`);
});

test("Attack outside board boundaries fails", () => {
  expect(board.receiveAttack("a", 11)).toBe("invalid position");
});

test("Attack outside board boundaries fails", () => {
  expect(board.receiveAttack("k", 5)).toBe("invalid position");
});

test("SUNK -> receiveAttack at specific coordinates", () => {
  board.placeShip(1, [3, 3]);
  board.placeShip(1, [4, 4]);
  expect(board.receiveAttack("c", 3)).toBe(`You sank the ship!`);
});

// Gameboards should keep track of missed attacks
test("keep track of missed attacks", () => {
  board.receiveAttack("j", 9);
  expect(board.board[10][8]).toBe("Miss");
});

// report whether or not all ships have been sunk.
test("all ships have been sunk", () => {
  board.placeShip(1, [3, 3]);
  board.receiveAttack("c", 3);
  expect(board.boardSunk()).toBe(true);
});
test("Vertical - all ships have been sunk", () => {
  board.placeShip(2, [3, 5], true);
  board.receiveAttack("c", 5);
  board.receiveAttack("d", 5);
  expect(board.boardSunk()).toBe(true);
});
test("there are still ships sailing", () => {
  board.placeShip(1, [3, 3]);
  board.placeShip(2, [4, 5], true);
  expect(board.boardSunk()).toBe(false);
});

//check board when a ship have been sunk
test("all ships have been sunk", () => {
  board.placeShip(1, [3, 3]);
  board.receiveAttack("c", 3);
  expect(board.receiveAttack("c", 3)).toBe("All ships have been sunk!");
});
