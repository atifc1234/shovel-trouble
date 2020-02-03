const gameState = {}

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 500,
    backgroundColor: "b9eaff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            enableBody: true,
            debug: false,
        }
    },
    scene: [StartScene, BasicTutorial, JumpTutorial, FightTutorial, Level1, PauseScene1, PauseSceneBasic, PauseSceneJump, PauseSceneFight]
  }
  
  const game = new Phaser.Game(config)