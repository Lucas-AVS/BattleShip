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

        // Add click event for interaction
        let y = cellDiv.dataset.row;
        let x = Number(cellDiv.dataset.column);
        cellDiv.addEventListener("click", () => {
          deployShip(y, x);
        });

        rowDiv.appendChild(cellDiv);
      }
    }
  }
}
