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
  expect(board.placeShip(3, ["k", 5], true)).toBe("invalid position");
});
test("Ship placement at invalid coordinates fails", () => {
  expect(board.placeShip(3, ["c", 0])).toBe("invalid position");
});

test("place ships at specific coordinates", () => {
  board.placeShip(3, ["c", 2]);

  expect(board.board[3][2].name).toBe(ship.name);
});

test("try to place a ship bigger than the coordinate area", () => {
  expect(board.placeShip(3, ["c", 9])).toBe(
    "ship does not fit this coordinate"
  );
});

test("try to place a ship in another ship area", () => {
  board.placeShip(3, ["c", 5]);
  expect(board.placeShip(3, ["c", 5])).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - place ships at specific coordinates", () => {
  board.placeShip(3, ["c", 5], true);
  expect(board.board[3][5 - 1].name).toBe(ship.name);
});

test("Vertical - try to place a ship bigger than the coordinate area", () => {
  expect(board.placeShip(4, ["h", 8], true)).toBe(
    "ship does not fit this coordinate"
  );
});

test("Vertical - try to place a ship in another ship area", () => {
  board.placeShip(3, ["c", 5]);
  expect(board.placeShip(3, ["c", 5], true)).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - single ship placement", () => {
  board.placeShip(4, ["e", 5], true);
  expect(board.board[5][4].name).toBe("destroyer");
});

test("Vertical - single ship placement at last row", () => {
  board.placeShip(3, ["h", 1], true);
  expect(board.board[8][0].name).toBe("warship");
});

test("find a ship at specific coordinates", () => {
  board.placeShip(1, ["i", 9]);
  const placedShip = board.board[9][8];
  expect(board.findShip("i", 9)).toBe(placedShip.id);
});

test("ship not found at specific coordinates", () => {
  expect(board.findShip("j", 9)).toBe(`there is no ship at current coordinate`);
});

test("HIT -> receiveAttack at specific coordinates", () => {
  board.placeShip(2, ["j", 9]);
  expect(board.receiveAttack("j", 9)).toBe(`You hit a ship!`);
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
  board.placeShip(1, ["c", 3]);
  board.placeShip(1, ["d", 4]);
  expect(board.receiveAttack("c", 3)).toBe(`You sank the ship!`);
});

// Gameboards should keep track of missed attacks
test("keep track of missed attacks", () => {
  board.receiveAttack("j", 9);
  expect(board.board[10][8]).toBe("Miss");
});

// report whether or not all ships have been sunk.
test("all ships have been sunk", () => {
  board.placeShip(1, ["c", 3]);
  board.receiveAttack("c", 3);
  expect(board.boardSunk()).toBe(true);
});
test("Vertical - all ships have been sunk", () => {
  board.placeShip(2, ["c", 5], true);
  board.receiveAttack("c", 5);
  board.receiveAttack("d", 5);
  expect(board.boardSunk()).toBe(true);
});
test("there are still ships sailing", () => {
  board.placeShip(1, ["c", 3]);
  board.placeShip(2, ["d", 5], true);
  expect(board.boardSunk()).toBe(false);
});

//check board when a ship have been sunk
test("all ships have been sunk", () => {
  board.placeShip(1, ["c", 3]);
  expect(board.receiveAttack("c", 3)).toBe("All ships have been sunk!");
});

//check if is possible to attack more than once a missed area
test("AREA ALREADY CHOSEN -> empty area", () => {
  board.receiveAttack("e", 5);
  expect(board.receiveAttack("e", 5)).toBe("Area already chosen!");
});

//check if is possible to attack more than once a hitted area
test("AREA ALREADY CHOSEN -> hitted ship", () => {
  board.placeShip(2, ["e", 5]);
  board.receiveAttack("e", 5);
  expect(board.receiveAttack("e", 5)).toBe("Area already chosen!");
});

//when a ship is sunk its obj in the array change to sunk shipname
test("AREA ALREADY CHOSEN -> hitted ship", () => {
  board.placeShip(1, ["f", 6]);
  board.receiveAttack("f", 6);
  expect(board.board[6][5]).toBe("sunken boat");
});

test("place a ships at the first column", () => {
  board.placeShip(3, ["a", 1]);

  expect(board.board[1][0].name).toBe("warship");
});

test("try to place a ship larger than the coordinate area between 2 ships", () => {
  board.placeShip(1, ["a", 1]);
  board.placeShip(1, ["a", 3]);
  expect(board.placeShip(4, ["a", 2])).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - try to place a ship larger than the coordinate area between 2 ships", () => {
  board.placeShip(1, ["a", 1]);
  board.placeShip(1, ["c", 1]);
  expect(board.placeShip(4, ["b", 1], true)).toBe(
    "there is already a ship in this area"
  );
});
