export default class Entity {
  /**
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = new Image();

    this.active = true;
    this.solid = true;

    this.hitbox = {
      offsetX: 0,
      offsetY: 0,
      width: 64,
      height: 64,
    };
  }

  getHitbox() {
    return {
      x: this.x + this.hitbox.offsetX,
      y: this.y + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  update(delta) {}

  draw(ctx) {
    const screenX = Math.floor(this.x - this.game.cameraX);
    ctx.drawImage(this.sprite, screenX, this.y, this.width, this.height);
  }
}
