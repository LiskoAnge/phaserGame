class Flame extends Phaser.GameObjects.Sprite {
    
    constructor(scene, texture) {       
        super(scene, 0, 0, texture);
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.initMe()
    } 

    initMe() {
        this.setActive(false); 
        this.setVisible(false); 
    } 

    fireMe(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
         mAudio.shoot.play();
    } 

    updateMe() {

        if (this.active) {
            this.y -= 5;
            if (this.y < -10) {
                this.initMe();
            }
        }
    } 
    
    killMe(){
        this.initMe();
    }

} 