export default class Input {
  constructor() {
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }

  isRight() {
    return this.keys["ArrowRight"];
  }

  isLeft() {
    return this.keys["ArrowLeft"];
  }

  isJump() {
    return this.keys["Space"];
  }

  isShoot() {
    return this.keys["KeyZ"];
  }

  isRestart() {
    return this.keys["KeyR"];
  }
}
