import BootScene from "../scenes/BootScene";
import GameScene from "../scenes/GameScene";
import TitleScene from "../scenes/TitleScene";

export const config = {
  // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  parent: "content",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [BootScene, TitleScene, GameScene]
};
