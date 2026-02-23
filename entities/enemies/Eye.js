import Entity from "../Entity";

export default class Eye extends Entity {
  /**
   *
   * @param {Game} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {
    super(game, x, y, 64, 64);
    this.sprite.src = "assets/sprites/enemy.png";
    this.destructible = true;
    this.hostile = true;
    this.autoMovementType = "towards-player";
    this.speed = 450;
    this.damage = 3;
    this.hitbox = {
      offsetX: 10,
      offsetY: 8,
      width: 44,
      height: 48,
    };
  }
}
