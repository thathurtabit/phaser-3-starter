import "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    const { scene, x, y, key, frame } = config;
    super(scene, x, y, key, frame);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.config = config;
    this.scene = scene;
    this.key = key;
    this.acceleration = 600;
    this.body.maxVelocity.x = 200;
    this.body.maxVelocity.y = 500;
    this.body.setBounce(0.2).setCollideWorldBounds(true);
    this.setOrigin(0.5, 0.5);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  create() {
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers(this.key, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: this.key, frame: 4 }],
      frameRate: 20
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers(this.key, {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.body.setVelocityX(0);
      this.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-330);
    }
  }
}
