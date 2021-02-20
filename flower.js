class Flower extends Phaser.GameObjects.Sprite {
    constructor(scene, texture) {
        super(scene, 0, 0, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.initMe()
    } 

    initMe() {
        this.setActive(false);
        this.setVisible(false);
        this.state = DEAD_STATE;
        this.anims.load('flowerOpens');
    } 
    
   startMe(xPos, yPos) {
        this.state = ALIVE_STATE;
        this.setPosition(xPos, yPos);
        this.setActive(true).setVisible(true);
        this.xLine = xPos;
        this.theta = Math.random() * 6.28;
        this.speed = Phaser.Math.RND.integerInRange(1, 2);  //SPEED OF FLOWERS WAVES
    }
    
    

    
 updateMe() {
    this.x = this.xLine + Math.sin(this.theta) * 130;     
    this.y += this.speed;
    if (this.y > 400 + this.height) {
       this.setActive(false);
        this.setVisible(false);
    }
}
    
killMe() {
    mAudio.point.play();

    this.state = DEAD_STATE;
    this.once('animationcomplete', this.myAniEnded);
    this.anims.play('flowerOpens');
} 

myAniEnded() {
    this.setActive(false).setVisible(false);
    let firstFrame = this.anims.currentAnim.frames[0];
    this.anims.setCurrentFrame(firstFrame);
}
} 


