export default class Utils {
  /**
   *
   * @param {Game} game
   */
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

  gameLoss() {
    this.placeUiElement("You lost!", "64px Courier New", "white", 275, 275);
    this.placeUiElement(
      "Press R to restart.",
      "16px Courier New",
      "white",
      350,
      310,
    );
    this.game.gameState = "lost";
  }

  gameWin() {
    this.placeUiElement("You win!", "64px Courier New", "white", 275, 275);
    this.placeUiElement(
      "Press R to restart.",
      "16px Courier New",
      "white",
      350,
      310,
    );
    this.game.gameState = "win";
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
