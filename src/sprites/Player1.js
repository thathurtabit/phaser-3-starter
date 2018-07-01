import 'phaser';

export default class Player1 extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 600;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.type = config.key;
    }
    
    create() {

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(config.key, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: config.key, frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(config.key, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player1.setVelocityX(-160);

            this.player1.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player1.setVelocityX(160);

            this.player1.anims.play('right', true);
        }
        else {
            this.player1.setVelocityX(0);

            this.player1.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player1.body.touching.down) {
            this.player1.setVelocityY(-330);
        }
    }
    
}