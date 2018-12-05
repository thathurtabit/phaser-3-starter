import Player from "../sprites/Player";

class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: "TitleScene"
    });

    this.state = {
      score: 0,
      gameOver: false
    };
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.state.score += 10;
    this.scoreText.setText("Score: " + this.state.score);

    // TRIGGER BOMBS
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(star => {
        star.enableBody(true, star.x, 0, true, true);
      });

      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.state.gameOver = true;
  }

  create() {
    // NOTE: Order matters, first load = back of stack

    // BG IMAGE
    this.add.image(400, 300, "sky");

    // Create player
    this.player = new Player({
      scene: this,
      key: "player1",
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2 - 150
    });

    // Add Physics
    this.bombs = this.physics.add.group();
    this.platforms = this.physics.add.staticGroup();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.platforms
      .create(400, 568, "ground")
      .setScale(2)
      .refreshBody();

    // SCORE TEXT
    this.scoreText = this.add.text(16, 16, `Score: ${this.state.score}`, {
      fontSize: "18px",
      fill: "#000"
    });

    // PLATFORMS
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player.create();
    this.add.existing(this.player);

    // STARS
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(
      star => (this.star = star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)))
    );

    // COLLISIONS
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    this.player.update();
  }
}

export default TitleScene;
