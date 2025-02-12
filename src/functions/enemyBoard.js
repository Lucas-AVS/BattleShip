import Player from "../player";
import renderBoard from "./renderBoard";

export default function enemyBoard() {
  const enemyPlayer = new Player(false);

  renderBoard(enemyPlayer, "enemy");
}
