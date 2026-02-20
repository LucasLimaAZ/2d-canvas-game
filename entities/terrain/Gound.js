import Entity from "../Entity";

export default class Ground extends Entity {
  /**
   *
   * @param {Game} game
   */
  constructor(game) {
    const tileSize = 64;

    super(game, -1000, 472 + game.player.height, 3000, tileSize);

    this.sprite = new Image();
    this.tileSize = tileSize;
    this.sprite.src = "assets/sprites/zamus-1-ground.png";

    this.hitbox = {
      offsetX: 0,
      offsetY: 0,
      width: this.width,
      height: this.tileSize,
    };
  }

  draw(ctx) {
    for (let i = 0; i < this.width; i += this.tileSize) {
      const screenX = Math.floor(this.x + i - this.game.cameraX);

      ctx.drawImage(
        this.sprite,
        0,
        0,
        32,
        32,
        screenX,
        this.y,
        this.tileSize,
        this.tileSize,
      );
    }
  }
}
