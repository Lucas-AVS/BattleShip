const Ship = require("../src/ship");
let ship = new Ship(3);

test("hit ship and decrease its hp", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("check if ship is sunk", () => {
  expect(ship.isSunk()).toBe(false);
});
