export default class Borders {
  constructor(game) {
    this.game = game;
    this.left = {
      x: 0,
      y: 0,
      width: 2,
      height: this.game.height,
    };
    this.right = {
      x: this.game.width - 2,
      y: 0,
      width: 2,
      height: this.game.height,
    };
  }
}
