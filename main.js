import Player from "./entities/Player";
import Borders from "./world/Borders";
import Ground from "./world/Gound";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lastTime = 0;
    this.gravity = 200;
    this.player = new Player(this);
    this.ground = new Ground(this);
    this.borders = new Borders(this);
  }

  update(delta) {
    this.player.update(delta);
  }

  draw(context) {
    context.clearRect(0, 0, this.width, this.height);

    context.fillStyle = "gray";
    context.fillRect(
      this.ground.x,
      this.ground.y,
      this.ground.width,
      this.ground.height,
    );

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
