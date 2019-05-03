
var game = new Phaser.Game(320,480,Phaser.CANVAS);
game.state.add('load',bankblaster.load);
game.state.add('menu',bankblaster.menu);
game.state.add('level1',bankblaster.level1);
game.state.start('load');

