export default class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.objects = [];
    this.lastTime = 0;
  }

  add(obj) {
    this.objects.push(obj);
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(delta);
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    this.objects.forEach((obj) => obj.update(delta));
  }

  draw() {
    this.ctx.clearRect(0, 0, 900, 600);
    this.objects.forEach((obj) => obj.draw(this.ctx));
  }
}
