import Player from "./entities/Player";
import Ground from "./entities/terrain/Gound";
import Eye from "./entities/enemies/Eye";
import Utils from "./core/Utils";
import Rock from "./entities/terrain/Rock";
import Block from "./entities/Block";
import Input from "./core/Input";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lastTime = 0;

    this.utils = new Utils(this);
    this.input = new Input();
    this.player = new Player(this, this.input);

    this.floorY = 472;
    this.gravity = 400;
    this.levelTitle = "Zamus-1";

    this.entities = [];
    this.uiElements = [];
    this.cameraX = 0;

    this.initLevel();
  }

  initLevel() {
    const ground = new Ground(this);
    this.entities.push(ground);

    this.utils.placeEntityOnMap(new Eye(this, 600, this.floorY));
    this.utils.placeEntityOnMap(new Eye(this, 1200, this.floorY));
    this.utils.placeEntityOnMap(new Eye(this, 2000, this.floorY));

    this.utils.placeEntityOnMap(new Rock(this, 100, this.floorY));

    this.utils.placeEntityOnMap(new Block(this, -300, 0, 32, this.height));

    this.utils.placeUiElement(
      `Planet: ${this.levelTitle} | Gravity: ${this.gravity / 10}%`,
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
    this.entities.forEach((entity) => entity.update(delta));
    this.cameraX = this.player.x - this.width * 0.45;
  }

  draw(context) {
    context.clearRect(0, 0, this.width, this.height);

    context.fillStyle = "#010A10";
    context.fillRect(0, 0, this.width, this.height);

    this.renderEntities();
    this.renderUiElements();

    this.player.draw(context);
  }
}

const game = new Game(canvas.width, canvas.height);

const animate = (time) => {
  const delta = Math.min((time - game.lastTime) / 1000, 0.016);
  game.lastTime = time;

  game.update(delta);
  game.draw(ctx);

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
