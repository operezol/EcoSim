class MyGameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MyGameScene' });
    }

    preload() {
      // Load any assets that your game needs here.
    }

    create() {
      this.text = this.add.text(100, 100, 'Hello, world!');
    }
  }

  var game = new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: 'game-canvas',
    scene: MyGameScene,
    type: Phaser.AUTO,
    scale:{
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%'
    }
  });

  game.start();

