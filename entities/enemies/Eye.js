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
  }
}
