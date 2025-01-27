const Ship = require("../ship");

const ships = [new Ship(1), new Ship(2), new Ship(3), new Ship(4)];

export default function shipsToPlace() {
  const content = document.querySelector(".content");

  function renderToPlaceBoard() {
    let container = document.createElement("div");
    container.id = "to-place-board";
    container.innerHTML = "";
    content.appendChild(container);

    ships.forEach((ship, index) => {
      // Cria um contêiner para cada navio
      const shipContainer = document.createElement("div");
      shipContainer.className = "ship-container";

      // Nome do navio
      const shipName = document.createElement("div");
      shipName.textContent = `${ship.name} (${ship.hp})`;
      shipName.className = "ship-name";

      // Contador dinâmico
      const shipCounter = document.createElement("div");

      const shipQuantity = (hp) => {
        let quantity = "";
        switch (hp) {
          case 1:
            quantity = 5;
          case 2:
            quantity = 3;
          case 3:
            quantity = 2;
          case 4:
            quantity = 1;
        }
        return quantity;
      };

      shipCounter.textContent = `x${shipQuantity(ship.hp)}`;
      shipCounter.className = "ship-counter";
      shipCounter.id = `ship-counter-${index}`;

      shipContainer.appendChild(shipName);
      shipContainer.appendChild(shipCounter);
      container.appendChild(shipContainer);
    });
  }

  return renderToPlaceBoard();
}
