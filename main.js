import Player from "./entities/Player";
import Ground from "./entities/terrain/Gound";
import Eye from "./entities/enemies/Eye";
import Utils from "./core/Utils";
import Rock from "./entities/terrain/Rock";
import Block from "./entities/Block";
import Input from "./core/Input";
import WinFlag from "./entities/WinFlag";
import Ui from "./ui/Ui";
import EnergyTank from "./entities/items/EnergyTank";
import Projectile from "./entities/Projectile";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lastTime = 0;

    this.utils = new Utils(this);
    this.input = new Input();
    this.player = new Player(this);

    this.floorY = 504;
    this.gravity = 400;
    this.levelTitle = "Zamus-1";

    this.entities = [];
    this.uiElements = [];
    this.cameraX = 0;

    this.initLevel();
    this.gameState = "playing";
  }

  initLevel() {
    const ground = new Ground(this);
    this.entities.push(ground);

    this.utils.placeEntityOnMap(new Eye(this, 600, this.floorY - 32));
    this.utils.placeEntityOnMap(new Eye(this, 900, this.floorY - 32));
    this.utils.placeEntityOnMap(new Eye(this, 1200, this.floorY - 32));
    this.utils.placeEntityOnMap(new Eye(this, 1500, this.floorY - 32));
    this.utils.placeEntityOnMap(new Eye(this, 1900, this.floorY - 32));

    this.utils.placeEntityOnMap(new Rock(this, 100, this.floorY - 32));
    this.utils.placeEntityOnMap(new Rock(this, 800, this.floorY - 32));
    this.utils.placeEntityOnMap(new Rock(this, 1000, this.floorY - 32));

    this.utils.placeEntityOnMap(new Block(this, -300, 0, 32, this.height));
    this.utils.placeEntityOnMap(new Block(this, 2000, 0, 32, this.height));

    this.utils.placeEntityOnMap(new EnergyTank(this, 900, this.floorY));

    this.utils.placeEntityOnMap(
      new WinFlag(this, 1400, this.floorY - 32, 64, 64),
    );

    this.utils.placeUiElement(
      new Ui(
        this,
        20,
        20,
        () =>
          `Planet: ${this.levelTitle} | Gravity: ${this.gravity / 10}% | Energy: ${this.player.hp}%`,
        "16px Courier New",
        "white",
      ),
    );

    this.utils.placeUiElement(
      new Ui(
        this,
        525,
        20,
        `Arrows: move | Space: jump | Z: shoot`,
        "16px Courier New",
        "white",
      ),
    );
  }

  renderUiElements() {
    this.uiElements.forEach((ui) => ui.draw(ctx));
  }

  renderEntities() {
    this.entities.forEach((entity) => entity.draw(ctx));
  }

  spawnProjectile(x, y, direction) {
    const projectile = new Projectile(this, x, y, direction);
    this.entities.push(projectile);
  }

  reset() {
    this.entities = [];
    this.uiElements = [];
    this.cameraX = 0;

    this.player = new Player(this, this.input);

    this.initLevel();
    this.gameState = "playing";
  }

  update(delta) {
    if (this.gameState !== "playing") {
      if (this.input.isRestart()) this.reset();
      return;
    }

    this.player.update(delta);
    this.entities.forEach((entity) => entity.update(delta));
    this.entities = this.entities.filter((entity) => entity.active);
    this.uiElements.forEach((ui) => ui.update(delta));

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
