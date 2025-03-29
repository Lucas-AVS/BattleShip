export default function deployableBoard(player, playerName, deployFunction) {
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

        // if ((playerName === "enemy")) {
        if (player.gameBoard.board[rowKey][columnIndex].hp) {
          cellDiv.id = "deployed";
        }
        // }
        if (playerName === "player") {
          if (player.gameBoard.board[rowKey][columnIndex].hp) {
            cellDiv.id = "deployed";
          }
        }
        // Add click event for interaction
        let y = cellDiv.dataset.row;
        let x = Number(cellDiv.dataset.column);
        cellDiv.addEventListener("click", () => {
          deployFunction(y, x);
        });

        rowDiv.appendChild(cellDiv);
      }
    }
  }
}
