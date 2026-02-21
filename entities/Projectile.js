import Entity from "./Entity";

export default class Projectile extends Entity {
  /**
   *
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   * @param {number} direction
   */
  constructor(game, x, y, direction) {
    super(game, x, y, 12, 4);

    this.speed = 1400;
    this.direction = direction;
    this.vx = this.speed * this.direction;
    this.damage = 1;
    this.lifeTime = 0.4;
    this.solid = false;
  }

  checkForDestructibleEntity(entity) {
    if (entity.destructible) {
      this.game.entities = this.game.entities.filter((e) => e !== entity);
    }
  }

  update(delta) {
    this.x += this.vx * delta;
    this.lifeTime -= delta;

    if (this.lifeTime <= 0) {
      this.destroy();
    }

    this.game.entities.forEach((entity) => {
      if (entity === this) return;

      const collision = this.game.utils.checkCollision(
        this.getHitbox(),
        entity.getHitbox(),
      );

      if (collision.collision) {
        this.destroy();
        this.checkForDestructibleEntity(entity);
      }
    });
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x - this.game.cameraX, this.y, this.width, this.height);
  }
}
