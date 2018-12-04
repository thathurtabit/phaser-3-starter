import sky from "../assets/images/sky.png";
import ground from "../assets/images/platform.png";
import star from "../assets/images/star.png";
import bomb from "../assets/images/bomb.png";
import player1 from "../assets/images/player1.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }
  preload() {
    this.load.image("sky", sky);
    this.load.image("ground", ground);
    this.load.image("star", star);
    this.load.image("bomb", bomb);
    this.load.spritesheet("player1", player1, {
      frameWidth: 32,
      frameHeight: 48
    });

    const progress = this.add.graphics();

    // Register a load progress event to show a load bar
    this.load.on("progress", value => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60
      );
    });

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on("complete", () => {
      // prepare all animations, defined in a separate file
      //makeAnimations(this);
      progress.destroy();
      this.scene.start("TitleScene");
    });
  }
}

export default BootScene;
