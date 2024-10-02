class Ship {
  constructor() {
    // Constructor
    this.hp = 3;
    this.hit = function () {
      return this.hp--;
    };
    this.isSunk = function () {
      if (this.hp <= 0) {
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
