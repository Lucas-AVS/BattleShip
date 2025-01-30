const Ship = require("../ship");

const ships = [new Ship(1), new Ship(2), new Ship(3), new Ship(4)];

export default function shipsToPlace() {
  const content = document.querySelector(".play-area");

  function renderToPlaceBoard() {
    const container = document.createElement("div");
    container.className = "to-place-container";
    container.id = "disable";
    const flexContainer = document.createElement("div");
    flexContainer.className = "to-place-flex-container";
    container.appendChild(flexContainer);
    content.appendChild(container);

    const shipContainer = document.createElement("div");
    shipContainer.className = "ship-container";
    const toPlaceBoard = document.createElement("div");
    toPlaceBoard.className = "to-place-board";

    ships.forEach((ship) => {
      const shipInfo = document.createElement("h2");

      const shipQuantity = (hp) => {
        let quantity = "";
        switch (hp) {
          case 1:
            quantity = 5;
            break;
          case 2:
            quantity = 3;
            break;
          case 3:
            quantity = 2;
            break;
          case 4:
            quantity = 1;
            break;
          default:
            quantity = 0;
        }
        return quantity;
      };

      shipInfo.textContent = `(x${shipQuantity(ship.hp)}) ${ship.name}`;
      shipInfo.className = "ship-info";
      shipContainer.appendChild(shipInfo);

      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      for (let x = 0; x < 4; x++) {
        let cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        x < ship.hp ? (cellDiv.id = ship.hp) : (cellDiv.id = "disable");

        cellDiv.addEventListener("click", () => {
          return (container.id = cellDiv.id);
        });

        rowDiv.appendChild(cellDiv);
        toPlaceBoard.appendChild(rowDiv);
      }
    });
    flexContainer.appendChild(shipContainer);
    flexContainer.appendChild(toPlaceBoard);

    const deployButton = document.createElement("button");
    deployButton.className = "deploy-button";
    content.appendChild(deployButton);
  }

  return renderToPlaceBoard();
}
