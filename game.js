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
    renderType: Phaser.AUTO
  });
  game.start();
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.fullScreenTarget = 'game-canvas';

