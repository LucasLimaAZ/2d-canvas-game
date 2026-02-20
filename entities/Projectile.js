import Entity from "./Entity";

export default class Projectile extends Entity {
  constructor(game, x, y, direction) {
    super(game, x, y, 12, 4);

    this.speed = 1400;
    this.direction = direction;
    this.vx = this.speed * this.direction;
    this.damage = 1;
    this.lifeTime = 2;
    this.solid = false;
  }

  update(delta) {
    this.x += this.vx * delta;
    this.lifeTime -= delta;
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x - this.game.cameraX, this.y, this.width, this.height);
  }

  destroy() {
    this.game.entities = this.game.entities.filter((e) => e !== this);
  }
}
