class Ship {
  constructor(hp) {
    // Constructor
    this.hp = hp;
    if (hp == 1) {
      this.name = "boat";
    }
    if (hp == 2) {
      this.name = "submarine";
    }
    if (hp == 3) {
      this.name = "warship";
    }
    if (hp == 4) {
      this.name = "destroyer";
    }
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

module.exports = Ship;

// module.exports = Ship;
// console.log(ship);

// ship.hit();
// console.log(ship.hp);
// console.log(ship.isSunk());
