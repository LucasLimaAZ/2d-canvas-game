import Entity from "./Entity.js";
import Projectile from "./Projectile.js";

export default class Player extends Entity {
  /**
   *
   * @param {Game} game
   * @param {Input} input
   */
  constructor(game, input) {
    super(game, 20, 400, 64, 64);

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
    this.weaponCost = 4;

    this.sprite.src = "assets/sprites/player-sheet.png";
    this.projectile = new Projectile();
    this.shootSound = new Audio("assets/sounds/shoot.wav");
    this.input = input;

    this.shootCoolDown = 0;
    this.shootCoolDownTime = 250;

    this.hitbox = {
      offsetX: 10,
      offsetY: 0,
      width: 44,
      height: 64,
    };
  }

  jump() {
    this.vy = -this.jumpForce;
    this.onGround = false;
  }

  shoot() {
    if (this.game.ammo < 1) return;

    const projectile = new Projectile(
      this.game,
      this.x + this.width / 2,
      this.y + this.height / 1.5,
      this.facing,
    );

    this.shootSound.play();
    this.game.ammo -= this.weaponCost;
    this.game.utils.placeEntityOnMap(projectile);
  }

  walkAnimation(delta) {
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      if (this.frameX > this.maxFrame) this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += delta * 1000;
    }
  }

  getCollidingEntity(entity) {
    if (!entity.solid) return;
    const collision = this.game.utils.checkCollision(
      this.getHitbox(),
      entity.getHitbox(),
    );

    if (collision.collision) {
      if (entity.hostile) this.game.utils.gameLoss();

      return entity;
    }
  }

  moveHorizontal(delta) {
    let moveX = 0;

    if (this.input.isRight()) {
      moveX = this.speed * delta;
      this.facing = 1;
    }

    if (this.input.isLeft()) {
      moveX = -this.speed * delta;
      this.facing = -1;
    }

    this.x += moveX;

    this.game.entities.forEach((entity) => {
      const collidingEntity = this.getCollidingEntity(entity);
      if (collidingEntity) {
        const box = entity.getHitbox();

        if (moveX > 0) {
          this.x = box.x - this.hitbox.width - this.hitbox.offsetX;
        } else if (moveX < 0) {
          this.x = box.x + box.width - this.hitbox.offsetX;
        }
      }
    });
  }

  moveVertical(delta) {
    this.vy += this.game.gravity * delta;
    this.y += this.vy * delta;

    this.onGround = false;

    this.game.entities.forEach((entity) => {
      const collidingEntity = this.getCollidingEntity(entity);

      if (collidingEntity) {
        const box = entity.getHitbox();

        if (this.vy > 0) {
          this.y = box.y - this.hitbox.height;
          this.vy = 0;
          this.onGround = true;
        } else if (this.vy < 0) {
          this.y = box.y + box.height;
          this.vy = 0;
        }
      }
    });
  }

  update(delta) {
    if (this.shootCoolDown > 0) {
      this.shootCoolDown -= delta * 1000;
    }

    if (this.input.isJump() && this.onGround) {
      this.jump();
    }

    this.moveHorizontal(delta);
    this.moveVertical(delta);

    if (this.input.isRight() || this.input.isLeft()) {
      this.walkAnimation(delta);
    }

    if (this.input.isShoot()) {
      if (this.shootCoolDown <= 0) {
        this.shoot();
        this.shootCoolDown = this.shootCoolDownTime;
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
        this.sprite,
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
        this.sprite,
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
