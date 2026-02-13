export default class Ground {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 400 + this.game.player.height;
    this.width = this.game.width;
    this.height = 20;
  }
}
