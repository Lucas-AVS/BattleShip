const ship = require("../src/ship");

test("hit ship and decrease its hp", () => {
  ship.hit();
  expect(ship.hp).toBe(2);
});

test("check if ship is sunk", () => {
  expect(ship.isSunk()).toBe(false);
});
