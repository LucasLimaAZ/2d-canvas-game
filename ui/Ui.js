export default class Ui {
  constructor(game, x, y, content, font, style) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.content = content;
    this.font = font;
    this.style = style;
  }

  update(delta) {}

  draw(ctx) {
    ctx.fillStyle = this.style;
    ctx.font = this.font;

    const text =
      typeof this.content === "function" ? this.content() : this.content;

    ctx.fillText(text, this.x, this.y);
  }
}
