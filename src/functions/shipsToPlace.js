const Ship = require("../ship");

const ships = [new Ship(1), new Ship(2), new Ship(3), new Ship(4)];

export default function shipsToPlace(
  boat = 5,
  submarine = 3,
  warship = 2,
  destroyer = 1,
  vertical = false
) {
  const content = document.querySelector(".play-area");

  function orientationChange() {
    vertical = !vertical;

    const container = document.querySelector(".to-place-container");
    const button = document.querySelector(".orientation-button");

    if (vertical) {
      container.id = "vertical";
      button.textContent = "Change to horizontal";
    } else {
      container.id = "horizontal";
      button.textContent = "Change to vertical";
    }
  }

  // Clear before render
  const existingContainer = document.querySelector(".to-place-container");
  if (existingContainer) {
    existingContainer.remove();
  }

  function renderToPlaceBoard() {
    const container = document.createElement("div");
    container.className = "to-place-container";
    if (vertical) {
      container.id = "vertical";
    } else {
      container.id = "horizontal";
    }

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

      const shipQuantity =
        {
          1: boat,
          2: submarine,
          3: warship,
          4: destroyer,
        }[ship.hp] || 0;

      shipInfo.textContent = `(x${shipQuantity}) ${ship.name}`;
      shipInfo.className = "ship-info";
      shipContainer.appendChild(shipInfo);

      let rowDiv = document.createElement("div");
      rowDiv.className = "row";

      for (let i = 0; i < 4; i++) {
        let cellDiv = document.createElement("div");
        cellDiv.className = "cell";

        // (if quantity = 0) => disable ship
        if (shipQuantity === 0) {
          cellDiv.dataset.shipHp = "disabled";
          cellDiv.style.opacity = "0.5"; // disabled UI
        } else {
          cellDiv.dataset.shipHp = i < ship.hp ? ship.hp : "disabled";
        }

        cellDiv.addEventListener("click", () => {
          if (cellDiv.dataset.shipHp !== "disabled") {
            container.dataset.selectedShipHp = cellDiv.dataset.shipHp;
          }
        });

        rowDiv.appendChild(cellDiv);
        toPlaceBoard.appendChild(rowDiv);
      }
    });

    flexContainer.appendChild(shipContainer);
    flexContainer.appendChild(toPlaceBoard);

    const orientationButton = document.createElement("button");
    orientationButton.className = "orientation-button";
    if (container.id === "vertical") {
      orientationButton.textContent = "Change to horizontal";
    } else {
      orientationButton.textContent = "Change to vertical";
    }
    orientationButton.addEventListener("click", () => orientationChange());

    container.appendChild(orientationButton);
  }

  return renderToPlaceBoard();
}
