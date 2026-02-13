import Input from "../core/Input.js";
import Utils from "../core/Utils.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.x = 20;
    this.y = 400;
    this.width = 40;
    this.height = 60;
    this.speed = 200;
    this.input = new Input();
    this.utils = new Utils();
  }

  update(delta) {
    if (
      this.input.keys["ArrowRight"] &&
      !this.utils.checkCollision(this, this.game.borders.right)
    ) {
      this.x += this.speed * delta;
    } else if (
      this.input.keys["ArrowLeft"] &&
      !this.utils.checkCollision(this, this.game.borders.left)
    ) {
      this.x -= this.speed * delta;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
