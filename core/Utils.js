import Ui from "../ui/Ui";

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
    this.placeUiElement(
      new Ui(this.game, 275, 275, "You lost!", "64px Courier New", "white"),
    );
    this.placeUiElement(
      new Ui(
        this.game,
        350,
        310,
        "Press R to restart.",
        "16px Courier New",
        "white",
      ),
    );
    this.game.gameState = "lost";
  }

  gameWin() {
    this.placeUiElement(
      new Ui(this.game, 275, 275, "You win!", "64px Courier New", "white"),
    );
    this.placeUiElement(
      new Ui(
        this.game,
        350,
        310,
        "Press R to restart.",
        "16px Courier New",
        "white",
      ),
    );
    this.game.gameState = "win";
  }

  distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * @param {Entity} entity
   */
  placeEntityOnMap(entity) {
    this.game.entities.push(entity);
  }

  /**
   *
   * @param {Ui} ui
   */
  placeUiElement(ui) {
    this.game.uiElements.push(ui);
  }
}
