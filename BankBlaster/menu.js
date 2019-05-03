
bankblaster.menu=function(){};
bankblaster.menu.prototype={
    preload: function(){
        music=game.add.audio('music');
        
    },
    create: function() {
        console.log("Menu");
        var background=game.add.sprite(centerX,centerY,'background');
        background.anchor.setTo(0.5,0.5);
        var title=game.add.sprite(centerX,100,'title');
        title.anchor.setTo(0.5,0.5);
        title.scale.setTo(0.25,0.25);
        
        var play =  game.add.button(centerX,400,'level1',this.onPlayClick);
        play.anchor.setTo(0.5,0.5);
		play.scale.setTo(2,2)
		
//        var text = game.make.text(centerX,400, "Play Level 1");
//        text.anchor.set(0.5);
        
    },
    
    update: function() {},
    
    onPlayClick: function(){
        game.state.start('level1',true,false);
    }
}
