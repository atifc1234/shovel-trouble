class StartScene extends Phaser.Scene {
    constructor() {
        super( { key: 'StartScene' } ) 
    }
    preload() {
        this.load.spritesheet('shovel', 'assets/shovel idle clone.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('pickaxe', 'assets/pickaxe.png', { frameWidth: 18, frameHeight: 18});
    }
    create() {
        this.add.text(220, 50, 'Shovel Trouble', { fill: '#000', fontSize: '30px', fontFamily: 'Georgia'})
        this.add.sprite(330, 300, 'shovel').setScale(5);
        this.add.text(220, 100, 'click anywhere to start', { fill: '#000', fontSize: '20px', fontFamily: 'Georgia'});
        this.input.on('pointerup', () => {
            this.scene.stop('StartScene');
            this.scene.start('BasicTutorial');
        });

    }
}