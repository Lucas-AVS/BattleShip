export default function renderBoard(player, playerName) {
  const boardContainer = document.createElement("div");
  boardContainer.className = `${playerName}-board`;
  const playArea = document.querySelector(".play-area");
  playArea.appendChild(boardContainer);

  if (player.gameBoard) {
    for (const rowKey in player.gameBoard.board) {
      const row = player.gameBoard.board[rowKey];
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      boardContainer.appendChild(rowDiv);

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cellDiv = document.createElement("div");
        cellDiv.className = `cell`;
        //   cellDiv.textContent = "";
        function numberToAlphabetLetter(value) {
          return (Number(value) + 9).toString(36);
        }
        cellDiv.dataset.row = numberToAlphabetLetter(rowKey);
        cellDiv.dataset.column = columnIndex + 1;

        // check if there is a ship in the cell
        if (player.gameBoard.board[rowKey][columnIndex].hp) {
          cellDiv.id = "deployed";
        }

        // Add click event for interaction
        let y = cellDiv.dataset.row;
        let x = Number(cellDiv.dataset.column);

        function markGameBoard(y, x, result) {
          let currentBoard = document.querySelector(`.${playerName}-board`);
          let currentDiv = currentBoard.querySelector(
            `[data-row="${y}"][data-column="${x}"]`
          );
          currentDiv.id = result;
        }

        cellDiv.addEventListener("click", () => {
          if (playArea.id === `${playerName}-played`) {
            alert("It's not your turn!");
            return;
          }

          const attackResult = player.gameBoard.receiveAttack(y, x);

          if (
            attackResult === "Area already chosen!" ||
            attackResult === "invalid position"
          ) {
            alert(attackResult);
            return;
          }

          const messages = {
            "You sank the ship!": "hit",
            "You hit a ship!": "hit",
            "you missed!": "miss",
            "All ships have been sunk!": "hit",
          };

          if (messages[attackResult]) {
            alert(attackResult);
            markGameBoard(y, x, messages[attackResult]);
            playArea.id = `${playerName}-played`;
          }
        });

        rowDiv.appendChild(cellDiv);
      }
    }
  }
}
