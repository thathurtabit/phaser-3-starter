class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
    }


}

export default GameScene;
