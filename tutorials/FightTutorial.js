class FightTutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'FightTutorial'})
    }
    preload() {
        this.load.image('grassblock1', 'assets/big grass block-1.png');
        this.load.spritesheet('shovel', 'assets/shovel idle clone.png', { frameWidth: 32, frameHeight: 32});
        this.load.image('spring', 'assets/spring.png');
        this.load.audio('boing', 'assets/boing.mp3');
        this.load.spritesheet('pickaxe', 'assets/pickaxe.png', { frameWidth: 18, frameHeight: 18});
        this.load.image('fullheart', 'assets/fullheart.png');
        this.load.image('halfheart', 'assets/halfheart.png')
        this.load.audio('song', 'assets/song.mp3');
        this.load.image('mutebutton', 'assets/mute button.png');
        this.load.image('pausebutton', 'assets/pause button.png');
    }
    createPlatform(x, y, size) {
        const platforms = this.physics.add.staticGroup();
        platforms.create(x, y, 'grassblock1').setScale(size); 
        this.physics.add.collider(gameState.player, platforms);
        this.physics.add.collider(gameState.pickaxe, platforms);
    }
    createSpring(x, y, size) {
        const springs = this.physics.add.staticGroup();
        springs.create(x, y, 'spring').setScale(size); 
        this.physics.add.collider(gameState.player, springs, () => {
            gameState.player.setVelocityY(-360);
            let boing = this.sound.add('boing');
            boing.play({
                volume: 1.5,
                loop: false
            });
        });
        this.physics.add.collider(gameState.pickaxe, springs, () => {
            gameState.pickaxe.setVelocityY(-360);
        });
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
            this.scene.pause('FightTutorial');
            this.scene.launch('PauseSceneFight');
        })
        gameState.fullheart = this.physics.add.staticGroup();
        gameState.player = this.physics.add.sprite(320, 400, 'shovel');
        gameState.player.setBounce(0.2);
        gameState.player.setCollideWorldBounds(true);
        gameState.player.health = 5;
        gameState.player.wasHit = false;
        gameState.pickaxe = this.physics.add.sprite(500, 300, 'pickaxe').setScale(1.7);
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
        this.anims.create({
            key: 'idlep',
            frames: this.anims.generateFrameNumbers('pickaxe', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'rightp',
            frames: this.anims.generateFrameNumbers('pickaxe', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftp',
            frames: this.anims.generateFrameNumbers('pickaxe', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        for (let x = -20; x < 660; x += 40) {
            this.createPlatform(x, 525, 1);
        };
        this.createPlatform(220, 375, 1);
        this.createSpring(100, 466, 2);
        const text1 = this.add.text(210, 30, 'This is your health. 5 total', { fill: '#000', fontSize: '15px', fontFamily: 'Georgia'});
        const arrow1 = this.add.image(180, 30, 'arrow').setAngle(90);
        this.time.addEvent({
            delay: 3000,
            callback: ()=> {
                text1.destroy();
                arrow1.destroy();
            },
            loop: false
        })
        const warps = this.physics.add.staticGroup();
        warps.create(1230, 1337, 'warp');
        this.physics.add.collider(gameState.player, warps, ()=> {
            this.scene.stop('JumpTutorial');
            this.scene.start('FightTutorial')
        });
        this.physics.add.collider(gameState.pickaxe, gameState.player, ()=>{
            if (gameState.pickaxe.body.touching.up && gameState.player.body.touching.down) {
                gameState.pickaxe.setActive(false);
                gameState.pickaxe.setVisible(false);
                gameState.pickaxe.x = 1000;
            } else if (!gameState.player.wasHit && (gameState.pickaxe.body.touching.down && gameState.player.body.touching.up || gameState.pickaxe.body.touching.left && gameState.player.body.touching.right || gameState.pickaxe.body.touching.right && gameState.player.body.touching.left)) {
                gameState.player.health -= 1;
                console.log(gameState.player.health);
                gameState.player.wasHit = true
            } else if (gameState.player.wasHit) {
                this.time.addEvent({
                    delay: 1500,
                    callback: ()=> {
                        gameState.player.wasHit = false
                    },
                    loop: false
                })
            }
            });
    }
    update() {
        switch (gameState.player.health) {
            case 5:
                gameState.fullheart.setVisible(false)
                for (let i = 30; i < 6 * 30; i += 30) {
                    gameState.fullheart.create(i, 30, 'fullheart');
                };
                break;
            case 4:
                gameState.fullheart.setVisible(false)
                for (let i = 30; i < 5 * 30; i += 30) {
                    gameState.fullheart.create(i, 30, 'fullheart');
                };
                break;
            case 3:
                gameState.fullheart.setVisible(false)
                for (let i = 30; i < 4 * 30; i += 30) {
                    gameState.fullheart.create(i, 30, 'fullheart');
                };
                break;
            case 2:
                gameState.fullheart.setVisible(false)
                for (let i = 30; i < 3 * 30; i += 30) {
                    gameState.fullheart.create(i, 30, 'fullheart');
                };
                break;
            case 1:
                gameState.fullheart.setVisible(false)
                for (let i = 30; i < 2 * 30; i += 30) {
                    gameState.fullheart.create(i, 30, 'fullheart');
                };
                break;
            default:
                this.scene.stop('FightTutorial')
        }
        gameState.cursors = this.input.keyboard.createCursorKeys();
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
        if (gameState.pickaxe.x > gameState.player.x && (gameState.pickaxe.y )){
            gameState.pickaxe.anims.play('leftp', true);
            gameState.pickaxe.setVelocityX(-100);
        } else if (gameState.pickaxe.x < gameState.player.x) {
            gameState.pickaxe.anims.play('rightp', true);
            gameState.pickaxe.setVelocityX(100);
        } else {
            gameState.pickaxe.anims.play('idlep', true);
        };
    }
}