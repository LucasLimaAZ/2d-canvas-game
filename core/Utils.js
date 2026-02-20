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
      return { collision: true };
    }

    return { collision: false };
  }

  /**
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
