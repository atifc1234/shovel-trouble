
class Level1 extends Phaser.Scene {
    constructor() {
        super( {key: 'Level1'} )
    }
    preload() {
        this.load.image('grassblock1', 'assets/big grass block-1.png');
        this.load.spritesheet('shovel', 'assets/shovel idle clone.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('spring', 'assets/spring.png', {frameWidth: 11, frameHeight: 11});
        this.load.audio('boing', 'assets/Boing-sound/Boing-sound.mp3');
    }
    createPlatform(x, y, size) {
        const platforms = this.physics.add.staticGroup();
        platforms.create(x, y, 'grassblock1').setScale(size); 
        this.physics.add.collider(gameState.player, platforms)
    }
    createSpring(x, y, size) {
        const springs = this.physics.add.staticGroup();
        springs.create(x, y, 'spring').setScale(size); 
        this.physics.add.collider(gameState.player, springs, () => {
            gameState.player.setVelocityY(-360);
            let boing = this.sound.add('boing');
            boing.play();
        });
    }
    create() {
        gameState.player = this.physics.add.sprite(320, 400, 'shovel');
        gameState.player.setBounce(0.2);
        gameState. player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('shovel', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('shovel', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('shovel', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.createPlatform(300, 525, 1);
        this.createPlatform(340, 525, 1);
        this.createPlatform(260, 525, 1);
        this.createPlatform(220, 525, 1);
        this.createPlatform(380, 525, 1);
        this.createPlatform(180, 525, 1);
        this.createPlatform(420, 525, 1);        
        this.createPlatform(140, 525, 1);
        this.createPlatform(460, 525, 1);
        this.createPlatform(100, 525, 1);
        this.createPlatform(500, 525, 1);
        this.createPlatform(60, 525, 1);
        this.createPlatform(540, 525, 1);
        this.createPlatform(20, 525, 1);
        this.createPlatform(580, 525, 1);
        this.createPlatform(-20, 525, 1);
        this.createPlatform(620, 525, 1);
        this.createPlatform(660, 525, 1);
        this.createPlatform(420, 200, 1);
        this.createSpring(20, 466, 2);
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (gameState.cursors.left.isDown) {  
            gameState.player.setVelocityX(-160);
            gameState.player.anims.play('left', true);
        } else if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(160);
            gameState.player.anims.play('right', true);
        } else {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play('idle', true);
        }
        if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-180);
        }
    }
}