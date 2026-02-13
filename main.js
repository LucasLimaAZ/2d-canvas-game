import Player from "./entities/Player";
import Borders from "./world/Borders";
import Ground from "./world/Gound";
import Eye from "./entities/enemies/Eye";
import Utils from "./core/Utils";
import Rock from "./entities/terrain/Rock";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lastTime = 0;

    this.player = new Player(this);
    this.ground = new Ground(this);
    this.borders = new Borders(this);
    this.utils = new Utils(this);

    this.floorY = 472;
    this.gravity = 400;
    this.planetName = "Zamus-1";

    this.entities = [];
    this.uiElements = [];
    this.cameraX = 0;

    this.initLevel();
  }

  initLevel() {
    this.utils.placeEntityOnMap(new Eye(this, 600, this.floorY));
    this.utils.placeEntityOnMap(new Eye(this, 1200, this.floorY));
    this.utils.placeEntityOnMap(new Eye(this, 2000, this.floorY));
    this.utils.placeEntityOnMap(new Rock(this, 300, this.floorY));

    this.utils.placeUiElement(
      `Planet: ${this.planetName} | Gravity: ${this.gravity / 10}%`,
      "16px Courier New",
      "white",
      20,
      20,
    );
  }

  renderUiElements() {
    this.uiElements.forEach((ui) => {
      ctx.fillStyle = ui.style;
      ctx.font = ui.font;
      ctx.fillText(ui.text, ui.x, ui.y);
    });
  }

  renderEntities() {
    this.entities.forEach((entity) => entity.draw(ctx));
  }

  update(delta) {
    this.player.update(delta);

    this.cameraX = this.player.x - this.width * 0.45;
  }

  draw(context) {
    context.clearRect(0, 0, this.width, this.height);

    context.fillStyle = "#010A10";
    context.fillRect(0, 0, this.width, this.height);

    this.ground.draw(context);

    this.renderEntities();
    this.renderUiElements();

    this.player.draw(context);
  }
}

const game = new Game(canvas.width, canvas.height);
const animate = (time) => {
  const delta = (time - game.lastTime) / 1000;
  game.lastTime = time;

  game.update(delta);
  game.draw(ctx);

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
