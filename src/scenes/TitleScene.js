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
    // BG IMAGE
    this.add.image(400, 300, "sky");

    // Add Physics
    this.bombs = this.physics.add.group();
    this.platforms = this.physics.add.staticGroup();
    this.player1 = this.physics.add.sprite(100, 450, "player1");

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

    // PLAYER
    this.player1.setBounce(0.2);
    this.player1.setCollideWorldBounds(true);

    // PLAYER ANIM (left)
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // PLAYER ANIM (turn)
    this.anims.create({
      key: "turn",
      frames: [{ key: "player1", frame: 4 }],
      frameRate: 20
    });

    // PLAYER ANIM (right)
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player1", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

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
    this.physics.add.collider(this.player1, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player1,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player1,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player1.body.velocity.x = -160;

      this.player1.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player1.body.velocity.x = 160;

      this.player1.anims.play("right", true);
    } else {
      this.player1.body.velocity.x = 0;

      this.player1.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.player1.body.touching.down) {
      this.player1.body.velocity.y = -330;
    }
  }
}

export default TitleScene;
