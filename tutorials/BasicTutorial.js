class BasicTutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicTutorial' })
    }
    preload() {
        this.load.image('grassblock1', 'assets/big grass block-1.png');
        this.load.spritesheet('shovel', 'assets/shovel idle clone.png', { frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('spring', 'assets/spring.png', {frameWidth: 11, frameHeight: 11});
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('warp', 'assets/warp.png');
        this.load.audio('song', 'assets/song.mp3');
        this.load.image('mutebutton', 'assets/mute button.png');
        this.load.image('pausebutton', 'assets/pause button.png');
    }
    createPlatform(x, y, size) {
        const platforms = this.physics.add.staticGroup();
        platforms.create(x, y, 'grassblock1').setScale(size); 
        this.physics.add.collider(gameState.player, platforms)
    }
    create() {
        let sound = true;
        let mute = this.add.image(500, 30, 'mutebutton');
        let pause = this.add.image(550, 30, 'pausebutton');
        mute.setInteractive();
        pause.setInteractive();
        mute.on('pointerup', ()=> {
            if (sound) {
                game.sound.mute = true;
                sound = false;
            } else {
                game.sound.mute = false;
                sound = true;
            }
        });
        pause.on('pointerup', ()=> {
            this.scene.pause('BasicTutorial');
            this.scene.launch('PauseSceneBasic');
        })
        gameState.player = this.physics.add.sprite(320, 440, 'shovel');
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
        for (let x = -20; x < 660; x += 40) {
            this.createPlatform(x, 525, 1);
        };
        const text1 = this.add.text(250, 335, 'This is you. The shovel', { fill: '#000', fontSize: '15px', fontFamily: 'Georgia'})
        const arrow1 = this.add.image(315, 400, 'arrow');
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                text1.destroy();
                arrow1.destroy();
                const text2 = this.add.text(250, 335, 'Use arrow keys to move', { fill: '#000', fontSize: '15px', fontFamily: 'Georgia'});
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        text2.destroy();
                        this.add.text(150, 335, 'This is a warp. Use it to get to the next level', { fill: '#000', fontSize: '15px', fontFamily: 'Georgia'});
                        this.add.image(150, 400, 'arrow').setAngle(45);
                        const warps = this.physics.add.staticGroup();
                        warps.create(75, 487, 'warp');
                        this.physics.add.collider(gameState.player, warps, ()=> {
                            this.scene.stop('BasicTutorial');
                            this.scene.start('JumpTutorial')
                        })
                    },
                    loop: false
                })
            },
            loop: false
        }); 
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