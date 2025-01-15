const Player = require("../src/player");
const GameBoard = require("../src/gameBoard");

let humanPlayer = new Player(true);

test("player type", () => {
  expect(humanPlayer.playerType).toBe("real");
});

test("players turn", () => {
  expect(humanPlayer.turn).toBe(true);
});

test("other player turn", () => {
  humanPlayer.play();
  expect(humanPlayer.turn).toBe(false);
});

test("player game board", () => {
  expect(humanPlayer.gameBoard).toBeInstanceOf(GameBoard);
});
