import Entity from "./Entity";

export default class Block extends Entity {
  /**
   *
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {boolean} visible
   */
  constructor(game, x, y, width, height, visible = false) {
    super(game, x, y, width, height);
    this.visible = visible;
  }

  draw(context) {
    if (this.visible) {
      screenX = Math.floor(this.x - this.game.cameraX);
      context.fillStyle = "yellow";
      context.fillRect(screenX, this.y, this.width, this.height);
    }
  }
}
