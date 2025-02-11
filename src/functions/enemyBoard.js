export default function enemyBoard() {
  const content = document.querySelector(".play-area");

  function renderEnemyBoard() {
    const container = document.createElement("div");
    container.className = "enemy-container";
    content.appendChild(container);

    const enemyBoard = document.createElement("div");
    enemyBoard.className = "enemy-board";
    container.appendChild(enemyBoard);
  }

  renderEnemyBoard();
}
