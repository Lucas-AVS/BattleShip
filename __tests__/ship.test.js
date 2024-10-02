const ship = require("../src/ship");

test("hit ship and decrease its hp", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("check if ship is sunk", () => {
  expect(ship.isSunk()).toBe(false);
});
