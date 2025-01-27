const Ship = require("../ship");

const ships = [new Ship(1), new Ship(2), new Ship(3), new Ship(4)];

export default function shipsToPlace() {
  const content = document.querySelector(".play-area");

  function renderToPlaceBoard() {
    const container = document.createElement("div");
    container.className = "to-place-container";
    const flexContainer = document.createElement("div");
    flexContainer.className = "to-place-flex-container";
    container.appendChild(flexContainer);
    content.appendChild(container);

    const shipContainer = document.createElement("div");
    shipContainer.className = "ship-container";
    ships.forEach((ship, index) => {
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
    });
    flexContainer.appendChild(shipContainer);

    const toPlaceBoard = document.createElement("div");
    toPlaceBoard.className = "to-place-board";
    function toPlaceFlexContainer() {
      let boardRows = 4;
      let boardColumns = 4;
      for (let y = 0; y < boardRows; y++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        toPlaceBoard.appendChild(rowDiv);
        for (let x = 0; x < boardColumns; x++) {
          let columnDiv = document.createElement("div");
          columnDiv.className = "cell";
          rowDiv.appendChild(columnDiv);
        }
      }
    }
    toPlaceFlexContainer();
    flexContainer.appendChild(toPlaceBoard);

    const deployButton = document.createElement("button");
    deployButton.className = "deploy-button";
    content.appendChild(deployButton);
  }

  return renderToPlaceBoard();
}
