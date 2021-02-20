const GAMEHEIGHT = 600;
const GAMEWIDTH = 800;

const ALIVE_STATE = 1;          
const DEAD_STATE = 5;

var background_spr;
var aboutbackground;     //backgrounds
var menubackground;

var heart_spr;          //life
            
var mage_spr;            //player

var ground_spr;

var sun_spr;
var  pflower_spr;
var pflower2_spr;
var cflower_spr;
var cflower2_spr;



var fireButton;
var dropButton;        //input
var cursors;

let flame_ary = [];       //arrays to shoot
let drop_ary = [];

let nextFlameTime = 0;       
let nextDropTime = 0;

const FLAME_DELAY = 200; 
const DROP_DELAY = 200;

const NUMFLAME = 2;       //se ne metto di piu ne ho di piu di fila! (-->easier)
const NUMDROP = 2;

const NUMLEAVES = 2;      //number of spawning objects 
const NUMFLOWER = 2;


let leaf_ary = [];         //arrays of spawning objects
let flower_ary = []; 

let playing_bool = false;        //game stops

let gameover_txt = "";
let play_txt = "";
let about_txt = "";               //buttons texts
let back_txt = "";




let startb1;
let startb2;              //buttons



let score_str = 'SCORE: ';      //score text
let score = 0;



let mAudio = {
    intro: null,
    bg: null,
    explode: null,                   //sounds
    shoot: null
};

let config = {
    type: Phaser.AUTO,
    width: GAMEWIDTH,
    height: GAMEHEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);


/////////////////////////////////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////

function preload() {
    
    this.load.image('background_img', 'assets/background.png');
    this.load.image('aboutbackground', 'assets/about.jpg');
    this.load.spritesheet('menubackground', 'assets/intromenu.jpg', {             //backgrounds
        frameWidth: 800,
        frameHeight: 600  
    });
   
    
    this.load.image('button', 'assets/button.png');
    

    
    this.load.image('flame_img', 'assets/flame.png');
    this.load.image('drop_img', 'assets/water.png');
    

    
  
    this.load.image('ground', 'assets/ground.png');
    this.load.image('sun', 'assets/sun.png');

    
    this.load.atlas('leaf_sp', 'assets/leafburnt.png', 'assets/leafburnt.json');
    this.load.atlas('flower_sp', 'assets/flower.png', 'assets/flower.json');        //spawning objects sprites
    
    
    this.load.spritesheet('pflower', 'assets/pflower.png', {
        frameWidth: 128,
        frameHeight: 128
    
    });
     this.load.spritesheet('pflower2', 'assets/pflower2.png', {
        frameWidth: 128,
        frameHeight: 128
    
    });
    this.load.spritesheet('cflower', 'assets/cflower.png', {
        frameWidth: 200,
        frameHeight: 200
    
    });
    this.load.spritesheet('cflower2', 'assets/cflower2.png', {
        frameWidth: 128,
        frameHeight: 128
    
    });
        
    
    this.load.spritesheet('mage_sp', 'assets/mage.png', {       //player
        frameWidth: 768,
        frameHeight: 768
    
    });
  
    this.load.audio('intro', ['assets/audio/intro.mp3']);
    this.load.audio('bg', 'assets/audio/mgame.mp3');
    this.load.audio('point', 'assets/audio/point.mp3');
    this.load.audio('shoot', 'assets/audio/wooosh.mp3');
    this.load.audio('ab', 'assets/audio/aboutmusic.mp3');                       //AUDIO
    this.load.audio('firex', 'assets/audio/firex.mp3');
    this.load.audio('gover', 'assets/audio/gover.mp3');
    this.load.audio('leafbrn', 'assets/audio/leafbrn.mp3');
    this.load.audio('bud', 'assets/audio/bud.mp3');
    this.load.audio('uhoh', 'assets/audio/uhoh.mp3');
    this.load.audio('error', 'assets/audio/error.mp3');
    this.load.audio('blub', 'assets/audio/blub.mp3');
    
} 

///////////////////////////////////////////////////////////CREATE//////////////////////////////////////////////////////////////////


function create() {
    

 
    background_spr = this.add.image(380, 400,'background_img');

    ground_spr = this.add.sprite(400, 540, 'ground');
    
    sun_spr = this.add.image(50, 50, 'sun');
    
    cflower_spr = this.add.sprite(250, 49, 'cflower');
    cflower_spr.anims.load('cflowerAnim');
    
    pflower2_spr = this.add.sprite(320, 95, 'pflower2');
    pflower2_spr.anims.load('pflower2Anim');
      
    cflower2_spr = this.add.sprite(450, 75, 'cflower2');
    cflower2_spr.anims.load('cflower2Anim');
    
    pflower_spr = this.add.sprite(510, 63, 'pflower');
    pflower_spr.anims.load('pflowerAnim');
    
    mage_spr = this.add.sprite(200, 400, 'mage_sp');    
    mage_spr.setScale(.4);
    mage_spr.anims.load('mageFloats');
    
    
   
    

    
/////////////////////ANIMATIONS////////////////////////////////////
    
    
    this.anims.create({
        key: 'pflowerAnim',
        frames: this.anims.generateFrameNames('pflower'),
        frameRate: 4,
        repeat: -1,
    });
      
    this.anims.create({
        key: 'pflower2Anim',
        frames: this.anims.generateFrameNames('pflower2'),
        frameRate: 3,
        repeat: -1,
    });
    
    this.anims.create({
        key: 'cflowerAnim',
        frames: this.anims.generateFrameNames('cflower'),
        frameRate: 2,
        repeat: -1,
    });
    
    this.anims.create({
        key: 'cflower2Anim',
        frames: this.anims.generateFrameNames('cflower2'),
        frameRate: 2,
        repeat: -1,
    });
    
    this.anims.create({
        key: 'mageFloats',
        frames: this.anims.generateFrameNumbers('mage_sp', {
            start: 0,
            end: 13
        }),
        frameRate: 5,
        repeat: -1
    });
     
    this.anims.create({
        key: 'mageGmover',
        frames: this.anims.generateFrameNumbers('mage_sp', {   //ANIMATIONS
            start: 13,
            end: 16
        }),
        frameRate: 3,
        repeat: 0,
    });
    
    this.anims.create({
        key: 'leafDestroyed',
        frames: this.anims.generateFrameNames('leaf_sp'),
        frameRate: 10,
        repeat: 0,
    });
    
    this.anims.create({
        key: 'flowerOpens',
        frames: this.anims.generateFrameNames('flower_sp'),
        frameRate: 10,
        repeat: 0,
    });
       
    this.anims.create({
        key: 'wizardstart',
        frames: this.anims.generateFrameNumbers('menubackground', {
            start: 0,
            end: 6
        }),
        frameRate: 7,
        repeat: 0
    });
    
    
    //INPUTS
    
    cursors = this.input.keyboard.createCursorKeys();         
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    dropButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
    
    
    //ARRAYS
    for (let idx = 0; idx < NUMFLAME; idx++) {
        flame_ary[idx] = new Flame(this, 'flame_img');       //DROP BULLET ARRAY
    }
   
    for (let idx = 0; idx < NUMDROP; idx++) {
        drop_ary[idx] = new Drop(this, 'drop_img');       //FLAMES BULLET ARRAY
    }

    for (let idx = 0; idx < NUMLEAVES; idx++) {
        leaf_ary[idx] = new Leaf(this, 'leaf_sp');          //LEAVES ARRAY
        console.log(leaf_ary);
    }
    for (let idx = 0; idx < NUMFLOWER; idx++) {
        flower_ary[idx] = new Flower(this, 'flower_sp');        //EMBERS ARRAY
        console.log(flower_ary);
    }

////////////ADD MENU, ABOUT PAGE AND ARROWS FUNCTIONS TO CONNECT/////
    
    
    menubackground = this.add.image(400, 300,'menubackground');

    aboutbackground = this.add.image(400, 300,'aboutbackground');
    aboutbackground.visible = false;
    
    startb1= this.add.image(250, 470, 'button');
    startb1.setScale(.5);
    startb1.setInteractive();
    startb1.on('pointerdown',() => {this.input.addListener('pointerdown', startGame, this); });
    
    startb2= this.add.image(600,470, 'button');
    startb2.setScale(.5);
    startb2.setInteractive();
    startb2.on('pointerdown',() => {this.input.addListener('pointerdown', aboutGame, this); });
 
    
    backbt= this.add.image(667,140, 'button');
    backbt.setScale(.4);
    backbt.setInteractive();
    backbt.on('pointerdown',() => {this.input.addListener('pointerdown', menuGame, this); }); //BACK TO MENU
    backbt.visible = false;
    

     
    play_txt = this.add.text(210, 450, ' ', {
        font: '33px Arial',                         //"PLAY" TEXT
        fill: '#fff'
    });
    play_txt.text = "PLAY";
    
    about_txt = this.add.text(545, 450, ' ', {          //"ABOUT" TEXT 
        font: '33px Arial',
        fill: '#fff'
    });
    about_txt.text = "ABOUT";
    

    
    back_txt = this.add.text(622, 120, ' ', {          //"BACK" TEXT 
        font: '33px Arial',
        fill: '#fff'
    });
    
    back_txt.text = "BACK";
    back_txt.visible= false;
    

    gameover_txt = this.add.text(180, 270, ' ', {          
        font: '70px Arial',
        fill: '#000'
    });
    
    // Add the score text
    score_txt = this.add.text(10, 560, "SCORE:", {
        font: '20px Arial',                          //POSITIONING THE SCORE TEXT
        fill: '#FFF'
         
    });
    score_txt.visible= false;
    
   
 

    // Add sounds
    mAudio.intro = this.sound.add('intro');
    mAudio.bg = this.sound.add('bg');
    mAudio.point = this.sound.add('point');              //AUDIO
    mAudio.shoot = this.sound.add('shoot'); 
    mAudio.ab = this.sound.add('ab'); 
    mAudio.firex = this.sound.add('firex');
    mAudio.gover = this.sound.add('gover');
    mAudio.leafbrn = this.sound.add('leafbrn');
    mAudio.bud = this.sound.add('bud');
    mAudio.uhoh = this.sound.add('uhoh');
    mAudio.error = this.sound.add('error');
    mAudio.blub = this.sound.add('blub');

    mAudio.intro.play({
        loop: true,
    });
    
    
   

} 


/////////////////////////////////////////////////////UPDATE////////////////////////////////////////////////////////////////////////

function update() {
    
        sun_spr.rotation += 0.01;
        
        updatePlayer(mage_spr, cursors, fireButton, dropButton);

          
        if ((this.time.now > nextFlameTime) && fireButton.isDown) {
           let flame_spr = Phaser.Actions.GetFirst(flame_ary, {
                active: false
            });
            if (flame_spr) {
                flame_spr.fireMe(mage_spr.x, mage_spr.y - 18);
                nextFlameTime = this.time.now + FLAME_DELAY;               
                
            } 
        }
        if ((this.time.now > nextDropTime) && dropButton.isDown) {
           let drop_spr = Phaser.Actions.GetFirst(drop_ary, {
                active: false
            });
            if (drop_spr) {
                drop_spr.fireMe(mage_spr.x, mage_spr.y - 18);
                nextDropTime = this.time.now + DROP_DELAY;
                
            }
        }
    
      
    
        for (let flame_spr of flame_ary) {
            flame_spr.updateMe();
        }
        for (let drop_spr of drop_ary) {
            drop_spr.updateMe();
        }
        //LEAVES
        for (let leaf_spr of leaf_ary) {
            leaf_spr.updateMe();         
            checkCollisionsLeaf(leaf_spr, flame_ary, drop_ary, ground_spr);
        }
        //FLOWERS
        for (let flower_spr of flower_ary) {
            flower_spr.updateMe();
            checkCollisionsFlower(flower_spr, flame_ary, drop_ary, ground_spr);
        }
    }   

  ///////////////////////////////////////////////COLLISIONS///////////////////////////////////////////////////////////////


function checkCollisionsLeaf(leaf_spr, flame_ary, drop_ary, ground_spr) {
    if (leaf_spr.state === ALIVE_STATE) {
        for (let flame_spr of flame_ary) {
            if (flame_spr.active) {
                collisionFlameLeaf(flame_spr, leaf_spr);      
            }
        }
        
        for (let drop_spr of drop_ary) {
            if (drop_spr.active) {
                collisionDropLeaf(drop_spr, leaf_spr);      
            }
        }
        checkCollisionLeavesGround(ground_spr, leaf_spr);                        
    }

}                                           

function checkCollisionsFlower(flower_spr, flame_ary, drop_ary, ground_spr) {     
    if (flower_spr.state === ALIVE_STATE) {
        for (let flame_spr of flame_ary) {  
            if (flame_spr.active) {
                collisionFlameFlower(flame_spr, flower_spr);      
            }
        }
        for (let drop_spr of drop_ary) { 
            if (drop_spr.active) {
                collisionDropFlower(drop_spr, flower_spr);      
            }
        }
        checkCollisionFlowerGround(ground_spr, flower_spr);
    }

} 

function collisionFlameLeaf(flame_spr, leaf_spr) {
    if (bulletCollided(flame_spr, leaf_spr)) {
        console.log("fire burns the leaf, +50p");
        mAudio.leafbrn.play();
        flame_spr.killMe();                                    
        leaf_spr.killMe();
                                        
        score += 50;
        score_txt.text = score_str + score;
        
        
    }
} 



function collisionDropLeaf(drop_spr, leaf_spr) {
    if (bulletCollided(drop_spr, leaf_spr)) {
        console.log("water drop against leaf, -50p");
         mAudio.uhoh.play();
        drop_spr.killMe();
                              
        score -= 50;
        score_txt.text = score_str + score;
    }
} 

function collisionFlameFlower(flame_spr, flower_spr) {
    if (bulletCollided(flame_spr, flower_spr)) {
        console.log("fire against flower, -50p");
        mAudio.uhoh.play();
        flame_spr.killMe();
                                     
        score -= 50;
        score_txt.text = score_str + score;
    }
} 

function collisionDropFlower(drop_spr, flower_spr) {
    if (bulletCollided(drop_spr, flower_spr)) {
        console.log("bud opens, +50p");
          mAudio.bud.play();
        drop_spr.killMe();                               
        flower_spr.killMe();                              
        score += 50;
        score_txt.text = score_str + score;
    }
} 

function checkCollisionLeavesGround(ground_spr, leaf_spr) {
    let crashed_bool = collidedGround(ground_spr, leaf_spr);      
    if (crashed_bool) {
        console.log("leaf touches ground");
        mAudio.error.play();
        killPlayer(mage_spr);   
        leaf_spr.killMe(); 
    }
} 
function checkCollisionFlowerGround(ground_spr, flower_spr) {
    let crashed_bool = collidedGround(ground_spr, flower_spr);   
    if (crashed_bool) {
        console.log("flower touches ground");
        mAudio.error.play();
        killPlayer(mage_spr);   
        flower_spr.killMe(); 
    
    }
} 


function collidedGround(a_spr, b_spr) {
    let crashed_bool = false;
    let xDiff, yDiff;
    if (a_spr !== undefined && b_spr !== undefined) {     
        xDiff = Math.abs(a_spr.x - b_spr.x);             
        yDiff = Math.abs(a_spr.y - b_spr.y);
        crashed_bool = (xDiff + yDiff) < 140;                   
    
    }
    return (crashed_bool);
}     

function bulletCollided(a_spr, b_spr) {
    let destroyed_bool = false;
    let xDiff, yDiff;
    if (a_spr !== undefined && b_spr !== undefined) {     
        xDiff = Math.abs(a_spr.x - b_spr.x);             
        yDiff = Math.abs(a_spr.y - b_spr.y);
        destroyed_bool = (xDiff + yDiff) < 50;                  
    
    }
    return (destroyed_bool);
} 




/////////////////////FUNCTIONS OF THE GAME//////////////////////////////




function menuGame() {
    this.input.removeListener('pointerdown', menuGame);
    mAudio.ab.stop();
    mAudio.bg.stop();
    if (!mAudio.intro.isPlaying) {                                     
        mAudio.intro.play({
            loop: true
        });
    }
        
    
    back_txt.visible= false;
    backbt.visible = false;
    aboutbackground.visible = false;
    about_txt.visible = true;
    startb1.visible = true;
    play_txt.visible = true;                                      //VISIBLE AND NOT VISIBLE COMPONENTS 
    startb2.visible = true;
    menubackground.visible = true;
    gameover_txt.visible = false; 
    score_txt.visible = false;
                                            
    playing_bool = false;

} 



function startGame() {
    this.input.removeListener('pointerdown', startGame);
    mAudio.intro.stop();
    if (!mAudio.bg.isPlaying) {
        mAudio.bg.play({
            loop: true
        });
    }
    ground_spr.visible=false;
    score_txt.visible=true; 
    backbt.visible=false;
    back_txt.visible=false;
    startb1.visible = false;
    about_txt.visible = false;                              //THE GAME STARTS
    play_txt.visible = false;
    startb2.visible = false;
    menubackground.visible = false;
    gameover_txt.visible = false;
  
    
 

    playing_bool = true;

    mage_spr.anims.play('mageFloats'); 
    pflower_spr.anims.play('pflowerAnim');
    pflower2_spr.anims.play('pflower2Anim');
    cflower_spr.anims.play('cflowerAnim');
    cflower2_spr.anims.play('cflower2Anim');
    


    score = 0;
    score_txt.text = score_str + score;
    
  


    

    startLeaves(this);
    startFlowers(this); 
    
} 




function aboutGame() {
    this.input.removeListener('pointerdown', aboutGame);
    mAudio.intro.stop();
    if (!mAudio.ab.isPlaying) {
        mAudio.ab.play({
            loop: true
        });
    }
    

    back_txt.visible= true;
    backbt.visible = true;
    aboutbackground.visible = true;
    about_txt.visible = false;
    startb1.visible = false;
    play_txt.visible = false;
    startb2.visible = false;                                //INFO PAGE

    menubackground.visible = false;
    gameover_txt.visible = false; 
    score_txt.visible = false;

    
    playing_bool = false;



} 



function startLeaves(currentScene) {
    if (playing_bool) {                                                                                                
        let xOffset = Phaser.Math.RND.integerInRange(350, 400);               
        let nextDelay = Phaser.Math.RND.integerInRange(3500, 2500);    
        for (let idy = 0; idy <= 2; idy++) {                        
            let leaf_spr = Phaser.Actions.GetFirst(leaf_ary, {
                active: false
            });
        
            if (leaf_spr) {
                leaf_spr.startMe(xOffset, 45);   
                xOffset += 60;
            }
        }
        currentScene.time.delayedCall(nextDelay, startLeaves, [currentScene]);
    }
} 
function startFlowers(currentScene) {
    if (playing_bool) {                                                 //THE OBJECTS WILL BE SPAWNED IN A RANDOM LENGTH,
        let xOffset = Phaser.Math.RND.integerInRange(350, 400);         //BETWEEN (350) AND (400).
        let nextDelay = Phaser.Math.RND.integerInRange(1000, 2000);      //SECONDS THAT SEPARATE ONE WAVE TO ANOTHER
        for (let idy = 0; idy <= 2; idy++) {
            let flower_spr = Phaser.Actions.GetFirst(flower_ary, {
                active: false
            });
            if (flower_spr) {
                flower_spr.startMe(xOffset, 45);   
                xOffset += 60;
            }
        }
        currentScene.time.delayedCall(nextDelay, startFlowers, [currentScene]);

    }
}



function gameOver(scene) {
        mAudio.bg.stop();
    if (!mAudio.gover.isPlaying) {
        mAudio.gover.play({
            loop: false
        });
    }
    
    //RESET THE OBJECTS
    
    for (let flame_spr of flame_ary) {
        flame_spr.initMe();
    }
    for (let drop_spr of drop_ary) {
        drop_spr.initMe();
    }
    for (let leaf_spr of leaf_ary) {
        leaf_spr.initMe();
    }
    for (let flower_spr of flower_ary) {
        flower_spr.initMe();
    }
    
    back_txt.visible= true;
    backbt.visible = true;
    startb1.visible = true;
    play_txt.visible = true;                          

    
    gameover_txt.text = "GAME OVER!";
    gameover_txt.visible = true;

} 