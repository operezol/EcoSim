class MyGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyGameScene' });
  }

  preload() {
    // Load any assets that your game needs here.
  }

  create() {
    this.text = this.add.text(100, 100, 'Hello, world!');
    this.text.setColor('white');
    this.text.setFontFamily('Arial');
    this.text.setFontSize(24);
    
  }
}

var game = new Phaser.Game({
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  customEnvironment: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  scene: MyGameScene
});

game.start();

