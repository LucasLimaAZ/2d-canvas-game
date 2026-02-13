export default class Ground {
  constructor(game) {
    this.game = game;
    this.x = -1000;
    this.y = 472 + this.game.player.height;
    this.width = 3000;
    this.height = 20;
    this.sprite = new Image();
    this.tileSize = 64;
    this.sprite.src = "assets/sprites/zamus-1-ground.png";
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
