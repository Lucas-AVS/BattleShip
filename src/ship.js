class Ship {
  constructor(hp, id) {
    this.hp = hp;
    this.id = id;
    this.hits = 0;

    if (hp == 1) this.name = "boat";
    if (hp == 2) this.name = "submarine";
    if (hp == 3) this.name = "warship";
    if (hp == 4) this.name = "destroyer";
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.hp;
  }
}

module.exports = Ship;

// module.exports = Ship;
// console.log(ship);

// ship.hit();
// console.log(ship.hp);
// console.log(ship.isSunk());
