import Entity from "../Entity";

export default class Rock extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 64, 64);
    this.hitbox = {
      offsetX: 0,
      offsetY: 38,
      width: 64,
      height: 26,
    };
    this.sprite.src = "assets/sprites/rock.png";
  }
}
