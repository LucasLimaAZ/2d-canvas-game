import Entity from "./Entity";

export default class WinFlag extends Entity {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.hitbox = {
      offsetX: 0,
      offsetY: 10,
      width: 40,
      height: 52,
    };
    this.solid = false;
    this.sprite.src = "assets/sprites/flag.png";
  }

  update(delta) {
    const collision = this.game.utils.checkCollision(
      this.getHitbox(),
      this.game.player.getHitbox(),
    );

    if (collision.collision) {
      this.game.utils.gameWin();
    }
  }
}
