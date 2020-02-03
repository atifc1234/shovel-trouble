class PauseSceneFight extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseSceneFight' });
    }
    preload() {
        this.load.spritesheet('shovel', 'assets/shovel idle clone.png', { frameWidth: 32, frameHeight: 32});
        this.load.audio('song', 'assets/song.mp3');
        this.load.image('mutebutton', 'assets/mute button.png');
    }
    create() {
        let sound = true;
        let mute = this.add.image(500, 30, 'mutebutton');
        mute.setInteractive();
        mute.on('pointerup', ()=> {
            if (sound) {
                game.sound.mute = true;
                sound = false;
            } else {
                game.sound.mute = false;
                sound = true;
            }
        });
        this.add.text(220, 50, 'Shovel Trouble', { fill: '#000', fontSize: '30px', fontFamily: 'Georgia'})
        this.add.sprite(330, 300, 'shovel').setScale(5);
        this.add.text(220, 100, 'Press space to resume', { fill: '#000', fontSize: '20px', fontFamily: 'Georgia'});
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (gameState.cursors.space.isDown) {
            this.scene.run('FightTutorial');
            this.scene.stop('PauseSceneFight');
        }
    }
}