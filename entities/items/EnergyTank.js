import Entity from "../Entity";

export default class EnergyTank extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 32, 32);
    this.solid = false;
    this.hitbox = {
      offsetX: 6,
      offsetY: 0,
      width: 32,
      height: 32,
    };
    this.sprite.src = "assets/sprites/energy-tank.png";
  }

  update(delta) {
    const collision = this.game.utils.checkCollision(
      this.getHitbox(),
      this.game.player.getHitbox(),
    );

    if (collision.collision) {
      this.destroy();
      this.game.player.heal(35);
    }
  }
}
