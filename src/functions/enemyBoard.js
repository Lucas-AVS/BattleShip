import Player from "../player";
import renderBoard from "./renderBoard";

export default function enemyBoard() {
  const enemyPlayer = new Player(false);

  function deployRandomShips(player) {
    if (player.gameBoard) {
      function randomCoordinate() {
        let y = Math.floor(Math.random() * 10);
        let yPositionToLetter = (Number(y) + 9).toString(36); // Convert number to letter
        let x = Math.floor(Math.random() * 10);
        let orientation = Math.random() < 0.5;
        return [yPositionToLetter, x, orientation];
      }
      function deployShipType(shipLength, quantity) {
        for (let i = 0; i < quantity; i++) {
          let [y, x, orientation] = randomCoordinate();
          let result = player.gameBoard.placeShip(
            shipLength,
            [y, x],
            orientation
          );
          if (
            result === "invalid position" ||
            result === "ship does not fit this coordinate" ||
            result === "there is already a ship in this area"
          ) {
            i--;
          }
        }
      }
      deployShipType(4, 1); // destroyer
      deployShipType(3, 2); // warship
      deployShipType(2, 3); // submarine
      deployShipType(1, 4); // boat
    }
  }
  deployRandomShips(enemyPlayer);
  renderBoard(enemyPlayer, "enemy");
}
