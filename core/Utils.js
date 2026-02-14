export default class Utils {
  constructor(game) {
    this.game = game;
  }

  checkCollision(a, b) {
    if (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    ) {
      const overlapX =
        a.x + a.width / 2 < b.x + b.width / 2
          ? a.x + a.width - b.x
          : b.x + b.width - a.x;
      const overlapY =
        a.y + a.height / 2 < b.y + b.height / 2
          ? a.y + a.height - b.y
          : b.y + b.height - a.y;

      if (overlapX < overlapY) {
        return { collision: true, direction: a.x < b.x ? "left" : "right" };
      } else {
        return { collision: true, direction: a.y < b.y ? "up" : "down" };
      }
    }

    return false;
  }

  /**
   *
   * @param {Entity} entity
   */
  placeEntityOnMap(entity) {
    this.game.entities.push(entity);
  }

  /**
   *
   * @param {string} text
   * @param {string} font
   * @param {string} style
   * @param {number} x
   * @param {number} y
   */
  placeUiElement(text, font, style, x, y) {
    const ui = { text, font, style, x, y };
    this.game.uiElements.push(ui);
  }
}
