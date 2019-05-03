var centerX=160;
var centerY=240;
var gameWidth=320;
var gameHeight=480;
var worldLength=4
var skies;
var mountains;
var grounds;
var banks;
var anton;
var tank;
var isLeftDown;
var isRightDown;
var dummy;
var tankSpeed;
var dinosaurs;
var bullets;
var timer;
var demolishedBanks;
var levelFailedText;
var levelClearedText;
var music;
var score;
var scoreText;
var lostFlag;
var wonFlag;

bankblaster.level1=function(){};
bankblaster.level1.prototype={
    
    createSkies: function() {
        if(skies){
            skies.kill();
        }
        skies=game.add.group();
        for(var i=0;i<worldLength+1;i++){
            var sky = game.add.sprite(centerX + (320 * i),centerY,'sky');
            sky.anchor.setTo(0.5,0.5)
            sky.width=640;
            sky.height=480;
	 	    skies.add(sky);
        }
    },
    
    createMountains: function() {
        if(mountains){
            mountains.kill();
        }
        mountains=game.add.group();
        for(var i=0;i<worldLength-1;i++){
            var mountain = game.add.sprite(centerX + (480 *i),centerY,'mountain');
            mountain.anchor.setTo(0.5,0.5)
            mountain.width=480;
            mountain.height=320;
            
	 	    mountains.add(mountain);
        }
    },
    
      createGrounds: function() {
          if(grounds){
              grounds.kill();
          }
        grounds=game.add.group();
        for(var i=-1;i<worldLength;i++){
            var ground = game.add.sprite(centerX + (480 *i),gameHeight-30,'ground');
            ground.anchor.setTo(0.5,0.5)
            ground.width=480;
            ground.height=120;
	 	    grounds.add(ground);
            game.physics.enable(ground,Phaser.Physics.ARCADE);
            ground.body.allowGravity=false;
            ground.body.immovable=true;
        }
    },
    
    createBanks: function(){
        if(banks){
            banks.kill();
        }
        banks=game.add.group();
        for(var i=1;i<=7;i++){
            var bank = game.add.sprite(centerX+ (140 * i) + game.rnd.integerInRange(1,30) ,gameHeight-125,'bank' + (game.rnd.integerInRange(1,3)));
            bank.anchor.setTo(0.5,0.5)
//            bank.width=88;
//            bank.height=71;
            bank.scale.setTo(1)
            bank.hits=0;
	 	    banks.add(bank);
            game.physics.enable(bank,Phaser.Physics.ARCADE);
            bank.body.allowGravity=false;
            bank.body.immovable=true;
        }
    },
    
    createDinosaur: function(){
        if(dinosaurs.alive<6){
            dinosaur = game.add.sprite(tank.x + (200 + game.rnd.integerInRange(0,400)),gameHeight-120
                                       ,'dinosaur');
            dinosaur.anchor.setTo(0.5,0.5);
//            dinosaur.width=52; 
//            dinosaur.height=49;
            dinosaur.scale.setTo(1)
            dinosaur.hits=0;
            dinosaurs.add(dinosaur);
            game.physics.enable(dinosaur,Phaser.Physics.ARCADE);
            dinosaur.allowRotation=false;
            
            
        }
        
    },

    fireAtDino: function(){
        var bullet = game.add.sprite(tank.x + (Math.sign(tank.scale.x) * 40),tank.y-120
                                       ,'bullet');
            bullet.anchor.setTo(0.5,0.5);
            bullet.width=52;
            bullet.height=49;
            bullets.add(bullet);
            game.physics.enable(bullet,Phaser.Physics.ARCADE);
            bullet.allowRotation=false;
            bullet.allowGravity=false;
            phaser.physics.arcade.moveToXY(bullet,bullet.x+200,bullet.y,100,500);
            console.log("Bullet fired");
    },
    
    createAnton: function() {
        anton = game.add.sprite(40,gameHeight-115,'anton');
        anton.anchor.setTo(0.5,0.5);
        anton.width=32;
        anton.height=44;
    },
    
    createTank: function() {
        tank = game.add.sprite(40,gameHeight-100,'tank');
        tank.anchor.setTo(0.5,0.5);
        tank.width=72;
        tank.height=23;
        game.physics.enable(tank,Phaser.Physics.ARCADE);
        tank.allowRotation=false;
        
        dummy = game.add.sprite(40+120,gameHeight-220,'tank');
        dummy.anchor.setTo(0.5,0.5);
        dummy.width=72;
        dummy.height=23;
        dummy.alpha=0;
       // dummy.visible=false;
    },
    
    createButtons: function() {
        var left = game.add.button(35,gameHeight-40,'left');
        left.anchor.setTo(0.5,0.5);
        left.width=60;
        left.height=60;
        left.onInputDown.add(this.handleLeftButtonDown);
        left.onInputUp.add(this.handleLeftOrRightButtonUp);
        left.fixedToCamera=true;
        
        var right = game.add.button(105,gameHeight-40,'right');
        right.anchor.setTo(0.5,0.5);
        right.width=60;
        right.height=60;
        right.onInputDown.add(this.handleRightButtonDown);
        right.onInputUp.add(this.handleLeftOrRightButtonUp);
        right.fixedToCamera=true;
        
        var fire = game.add.button(gameWidth-40,gameHeight-40,'fire',this.handleFireButtonClick);
        fire.anchor.setTo(0.5,0.5);
        fire.width=60;
        fire.height=60;
        fire.fixedToCamera=true;
    },

    createTexts: function(){
        if(levelClearedText){
            levelClearedText.kill();
        }
 		levelClearedText = game.add.sprite(centerX,centerY-50,'levelcleared')
        levelClearedText.anchor.setTo(0.5)
        levelClearedText.scale.setTo(3)
        levelClearedText.fixedToCamera=true;
        levelClearedText.visible=false;

        if(levelFailedText){
            levelFailedText.kill();
        }
        levelFailedText = game.add.sprite(centerX,centerY-50,'levelfailed')
        levelFailedText.anchor.setTo(0.5)
        levelFailedText.scale.setTo(3)
        levelFailedText.fixedToCamera=true;
        levelFailedText.visible=false;
    
        if(scoreText){
            scoreText.kill();
        }
        scoreText = game.add.text(centerX,30, "Score : " + score, {
            font: "30px Arial",
            fill: "#00ff44",
            align: "center"
        });
        scoreText.anchor.setTo(0.5)
        scoreText.fixedToCamera=true;
        

    },
    
    handleLeftButtonDown: function() {
        isLeftDown=true;
        console.log("Left Button Down");
    },
    
    handleRightButtonDown: function() {
        isRightDown=true;
        console.log("Right Button Down");
    },
    
    handleLeftOrRightButtonUp: function() {
        isRightDown=false;
        isLeftDown=false;
        console.log("Left Button Down");
    },
    
    handleFireButtonClick: function() {
        tank.body.velocity=0;
        //fireAtDino();
        var bullet = game.add.sprite(tank.x + (Math.sign(tank.scale.x) * 50),tank.y-10
                                       ,'bullet');
        bullet.anchor.setTo(0.5,0.5);
        bullet.width=20;
        bullet.height=20;
        
        bullets.add(bullet);
        game.physics.enable(bullet,Phaser.Physics.ARCADE);
        bullet.body.allowRotation=false;
        bullet.body.allowGravity=false;
        bullet.body.lifespan=100;
        
        var tween=game.physics.arcade.moveToXY(bullet,bullet.x+ ( Math.sign(tank.scale.x) * 200),tank.y-10,100,200);
        game.time.events.add(140,removeBullet,this,bullet);
        console.log("Bullet fired");
        console.log("Fire Button Clicked");
        function removeBullet(bullet){
            console.log(bullet);
            bullet.kill();
        }
    },

    
    handleBulletDinosaurCollision: function(bullet,dinosaur) {
        bullets.remove(bullet);
        bullet.kill();

        dinosaur.hits=dinosaur.hits+1;
        game.add.tween(dinosaur).to({alpha:0.5},250,Phaser.Easing.Linear.None,true,0,0,true);
        if(dinosaur.hits>=2){
            score=score+100;
            scoreText.setText("Score : " +score);
            dinosaurs.remove(dinosaur);
            dinosaur.kill();
        }
    },

    handleBulletBankCollision: function(bullet,bank) {
        bullets.remove(bullet);
        bullet.kill();

        bank.hits=bank.hits+1;
        game.add.tween(bank).to({alpha:0.5},250,Phaser.Easing.Linear.None,true,0,0,true);
        if(bank.hits>=4){
            bank.kill();
            score=score+500;
            scoreText.setText("Score : " +score);
            demolishedBanks=demolishedBanks+1;
        }
    },

    // moveDinosaur: function(dinosaur){
    //     if(tank.x+200 < dinosaur.x) {
    //         game.add.tween(dinosaur).to({x:tank.x+30},2000,Phaser.Easing.Linear.None,true,0,0,false);
    //     }
    // },

    handleDinosaurTankCollistion: function(dinosaur,tank){
        
        if(wonFlag) return;
        
        dinosaur.kill();
        tank.kill();
        anton.kill();
        levelFailedText.visible=true;
        game.world.bringToTop(levelFailedText);
        var restartLevel= function(){
            music.pause();
            game.state.start(game.state.current,true,false);
        }

        if(!lostFlag){
            lostFlag=true;
            game.time.events.add(2000,restartLevel,this);
        }
    },

    
        
   


    
  
    preload: function(){

       
        
    },
    create: function() {
        console.log("Create Function Called");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y=1000;
        game.stage.backgroundColor="#abbc90";
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        
        
        music.play();
        
        score=0;
        lostFlag=false;
        wonFlag=false;

        this.createSkies();
        this.createMountains();
        this.createGrounds();
        this.createBanks();
        this.createAnton();
        this.createTank();
        this.createButtons();
        
        if(dinosaurs){
            dinosaurs.kill();
        }
        dinosaurs=game.add.group();
        
        if(bullets){
            bullets.kill();
        }
        bullets=game.add.group();
        this.createTexts();
        
        isRightDown=false;
        isLeftDown=false;
        tankSpeed=3;
        
        demolishedBanks=0;
        game.time.events.loop(2000,this.createDinosaur,this);
        game.world.setBounds(0,0,1280,1920);
        game.camera.follow(dummy);
       
    },
    update: function() {
        

        game.physics.arcade.collide(tank, grounds);
        game.physics.arcade.collide(dinosaurs, grounds);
        game.physics.arcade.overlap(bullets,dinosaurs,this.handleBulletDinosaurCollision);
        game.physics.arcade.overlap(bullets,banks,this.handleBulletBankCollision);
        game.physics.arcade.overlap(dinosaurs,tank,this.handleDinosaurTankCollistion);
        if(isRightDown){
            tank.scale.x=tank.scale.x<0?-tank.scale.x:tank.scale.x;
            anton.scale.x=anton.scale.x<0?-anton.scale.x:anton.scale.x;
            tank.x+=tankSpeed;
            if(tank.x>1005) {
                tank.x=1005;
            }
            
        }
        if(isLeftDown){
            tank.scale.x=tank.scale.x>0?-tank.scale.x:tank.scale.x;
            anton.scale.x=anton.scale.x>0?-anton.scale.x:anton.scale.x;
            tank.x-=tankSpeed;
            if(tank.x<40) {
                tank.x=40;
            }
        }
        anton.x=tank.x;
        dummy.x=tank.x+120;

        dinosaurs.forEachAlive(moveDinosaur,this);

        function moveDinosaur(dinosaur) {
            if(tank.x+200 < dinosaur.x) {
                game.add.tween(dinosaur).to({x:tank.x+30},2000,Phaser.Easing.Linear.None,true,0,0,false);
            }
        }
        
        if(demolishedBanks>=banks.length && !wonFlag && !lostFlag){
            console.log("Level Cleared " + demolishedBanks + "/" + banks.length);
            levelClearedText.visible=true;
            
            var gotoMenu= function(){
                music.pause();
                game.state.start("menu");
                }
            if(!wonFlag){
                wonFlag=true;
                game.time.events.add(2000,gotoMenu,this);
            }
        }
        
        
    },
    
    render: function() {
        // grounds.forEachAlive(renderGroup, this);
        // banks.forEachAlive(renderGroup,this);
        // function renderGroup(member) {    game.debug.body(member);}
        // game.debug.body(tank);
        // game.debug.cameraInfo(game.camera,32,500);
    }
    
    
};
