const GameBoard = require("../src/gameBoard");
const Ship = require("../src/ship");

let ship;
let board;

beforeEach(() => {
  board = new GameBoard();
  ship = new Ship(3);
});

test("place ships at specific coordinates", () => {
  board.placeShip(3, [3, 5]);

  expect(board.board[3][5].name).toBe(ship.name);
});

test("try to place a ship bigger than the coordinate area", () => {
  expect(board.placeShip(3, [3, 8])).toBe("ship does not fit this coordinate");
});

test("try to place a ship in another ship area", () => {
  board.placeShip(3, [3, 5]);
  expect(board.placeShip(3, [3, 5])).toBe(
    "there is already a ship in this area"
  );
});

test("Vertical - place ships at specific coordinates", () => {
  board.placeShip(3, [3, 5], true);

  expect(board.board[3][5].name).toBe(ship.name);
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
