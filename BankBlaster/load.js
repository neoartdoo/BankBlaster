var bankblaster = {};
var centerX=160;
var centerY=240;
var loadFlag=true;
bankblaster.load=function(){};
bankblaster.load.prototype={
    preload: function(){
        console.log("load");
        game.load.image("background",'assets/background.jpg');
        game.load.image("title",'assets/obj_Title.png');
        game.load.image("level1",'assets/txt_lvl1.png')
        game.load.image("levelcleared",'assets/txt_lvl_clr.png')
        game.load.image("levelfailed",'assets/txt_lvl_fail.png')

        game.load.image("sky",'assets/bg_sky_gradient.png');
        game.load.image("mountain",'assets/bg_mountains.png');
        game.load.image("ground",'assets/fg_ground.png');
        game.load.image("anton",'assets/char_Anton.png');
        game.load.image("dinosaur",'assets/char_dino.png');
        game.load.spritesheet('dinowalk', 'assets/dino_walk.png', 66, 60, 3);
        game.load.image("tank",'assets/obj_tank.png');
        game.load.image("right",'assets/btn_right.png');
        game.load.image("left",'assets/btn_left.png');
        game.load.image("fire",'assets/btn_fire.png');
        game.load.image("bank1",'assets/obj_bank1.png');
        game.load.image("bank2",'assets/obj_bank2.png');
        game.load.image("bank3",'assets/obj_bank3.png');
        game.load.image("bullet",'assets/bullet.png');
        game.load.audio("music",'assets/soundtrack.mp3');

        
    },
    create: function() {
        game.stage.backgroundColor="#dddddd";
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        var background=game.add.sprite(centerX,centerY,'background');
        background.anchor.setTo(0.5,0.5);
        var title=game.add.sprite(centerX,100,'title');
        title.anchor.setTo(0.5,0.5);
        title.scale.setTo(0.25,0.25);
        var text = game.add.text(centerX,centerY, "Loading . . .",{
            font: "40px Arial",
            fill: "#ff0044",
            align: "center"
        });
        text.anchor.set(0.5);
        
    },
    
    update: function() {
        if(loadFlag){
            loadFlag=false;
            console.log("call menu");
            game.state.start('menu',true,false);
        }
    },
    
    onPlayClick: function(){
       
    }
}
