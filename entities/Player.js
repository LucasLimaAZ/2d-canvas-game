import Input from "../core/Input.js";
import Utils from "../core/Utils.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.x = 20;
    this.y = 400;
    this.width = 64;
    this.height = 64;
    this.speed = 200;
    this.frameX = 1;
    this.frameY = 0;
    this.maxFrame = 3;
    this.fps = 8;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.facing = 1;
    this.vy = 0;
    this.jumpForce = 350;
    this.onGround = false;
    this.input = new Input();
    this.utils = new Utils(game);
    this.playerSprite = new Image();
    this.playerSprite.src = "assets/sprites/player-sheet.png";
    this.hitbox = {
      offsetX: 10,
      offsetY: 0,
      width: 44,
      height: 64,
    };
    this.collisions = {
      left: false,
      right: false,
      up: false,
      down: false,
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

  isPlayerColliding() {
    const player = this.getHitbox();

    this.collisions.left = false;
    this.collisions.right = false;
    this.collisions.up = false;
    this.collisions.down = false;

    for (const entity of this.game.entities) {
      if (!entity.solid) continue;
      if (entity === this) continue;

      const other = entity.getHitbox();

      if (!this.utils.checkCollision(player, other)) continue;

      const dx = player.x + player.width / 2 - (other.x + other.width / 2);
      const dy = player.y + player.height / 2 - (other.y + other.height / 2);

      const overlapX = player.width / 2 + other.width / 2 - Math.abs(dx);
      const overlapY = player.height / 2 + other.height / 2 - Math.abs(dy);

      if (overlapX < overlapY) {
        if (dx > 0) {
          this.collisions.left = true;
        } else {
          this.collisions.right = true;
        }
      } else {
        if (dy > 0) {
          this.collisions.up = true;
        } else {
          this.collisions.down = true;
          this.onGround = true;
          this.vy = 0;
        }
      }

      return entity;
    }

    return null;
  }

  update(delta) {
    this.isPlayerColliding();

    if (this.input.keys["ArrowRight"] && !this.collisions.right) {
      this.facing = 1;
      this.x += this.speed * delta;
    } else if (this.input.keys["ArrowLeft"] && !this.collisions.left) {
      this.facing = -1;
      this.x -= this.speed * delta;
    }

    if (!this.onGround) {
      this.vy += this.game.gravity * delta;
      this.y += this.vy * delta;
    }

    if (this.utils.checkCollision(this.getHitbox(), this.game.ground)) {
      this.onGround = true;
      this.vy = 0;
      this.y = this.game.ground.y - this.height;
    } else {
      this.onGround = false;
    }

    if (this.input.keys["Space"]) {
      this.vy = -this.jumpForce;
    }

    if (this.input.keys["ArrowRight"] || this.input.keys["ArrowLeft"]) {
      if (this.frameTimer > this.frameInterval) {
        this.frameX++;
        if (this.frameX > this.maxFrame) this.frameX = 0;
        this.frameTimer = 0;
      } else {
        this.frameTimer += delta * 1000;
      }
    }
  }

  draw(ctx) {
    ctx.imageSmoothingEnabled = false;

    const screenX = Math.floor(this.x - this.game.cameraX);

    ctx.save();

    if (this.facing === -1) {
      ctx.scale(-1, 1);

      ctx.drawImage(
        this.playerSprite,
        this.frameX * 32,
        this.frameY * 32,
        32,
        32,
        -screenX - this.width,
        this.y,
        this.width,
        this.height,
      );
    } else {
      ctx.drawImage(
        this.playerSprite,
        this.frameX * 32,
        this.frameY * 32,
        32,
        32,
        screenX,
        this.y,
        this.width,
        this.height,
      );
    }

    ctx.restore();
  }
}
