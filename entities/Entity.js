export default class Entity {
  /**
   *
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
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.facing = 1;
    this.width = width;
    this.height = height;
    this.sprite = new Image();

    this.active = true;
    this.solid = true;
    this.destructible = false;
    this.hostile = false;

    /** @type {"none" | "left" | "right" | "towards-player"} */
    this.autoMovementType = "none";
    this.reactionTime = 0.6;
    this.reactionTimer = 0;
    this.playerPerceptionRange = 300;

    this.hitbox = {
      offsetX: 0,
      offsetY: 0,
      width: this.width,
      height: this.height,
    };
    this.visibleHitbox = false;
  }

  destroy() {
    this.active = false;
  }

  getHitbox() {
    return {
      x: this.x + this.hitbox.offsetX,
      y: this.y + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  showHitbox(ctx) {
    const box = this.getHitbox();
    ctx.strokeStyle = "red";
    ctx.strokeRect(box.x - this.game.cameraX, box.y, box.width, box.height);
  }

  update(delta) {
    if (
      !this.playerPerceptionRange ||
      this.playerPerceptionRange >=
        this.game.utils.distance(this, this.game.player)
    ) {
      if (this.autoMovementType === "towards-player") {
        this.reactionTimer -= delta;

        if (this.reactionTimer <= 0) {
          this.reactionTimer = this.reactionTime;

          const playerCenter = this.game.player.x + this.game.player.width / 2;
          const myCenter = this.x + this.width / 2;

          if (playerCenter > myCenter) {
            this.vx = this.speed;
            this.facing = 1;
          } else {
            this.vx = -this.speed;
            this.facing = -1;
          }
        }
      }

      this.x += this.vx * delta;
    }
  }

  draw(ctx) {
    const screenX = Math.floor(this.x - this.game.cameraX);
    if (this.visibleHitbox) this.showHitbox(ctx);

    ctx.save();

    if (this.facing === 1) {
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.sprite,
        -screenX - this.width,
        this.y,
        this.width,
        this.height,
      );
    } else {
      ctx.drawImage(this.sprite, screenX, this.y, this.width, this.height);
    }

    ctx.restore();
  }
}
