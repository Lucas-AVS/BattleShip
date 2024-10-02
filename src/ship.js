class Ship {
  constructor() {
    // Constructor
    this.hp = 3;
    this.hits = 0;
    this.hit = function () {
      return this.hits++;
    };
    this.isSunk = function () {
      if (this.hits >= this.hp) {
        return true;
      } else {
        return false;
      }
    };
  }
}
const ship = new Ship();

module.exports = ship;
// console.log(ship);

// ship.hit();
// console.log(ship.hp);
// console.log(ship.isSunk());
