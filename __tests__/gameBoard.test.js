const gameBoard = require("../src/gameBoard");
const Ship = require("../src/ship");
let ship = new Ship(3);

test("place ships at specific coordinates", () => {
  gameBoard.placeShip(3, [3, 5]);

  expect(gameBoard.board[3][5].name).toBe(ship.name);
});

test("try to place a ship bigger than the coordinate area", () => {
  expect(gameBoard.placeShip(3, [3, 8])).toBe(
    "ship does not fit this coordinate"
  );
});

test("try to place a ship in another ship area", () => {
  expect(gameBoard.placeShip(3, [3, 5])).toBe(
    "there is already a ship in this area"
  );
});
