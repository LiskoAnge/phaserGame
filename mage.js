function updatePlayer(mage_spr, cursors, fireButton) { 
    if (cursors.left.isDown) {
        mage_spr.x -= 5;
        if (mage_spr.x < 0) {
            mage_spr.x = 0;
        }
        mage_spr.anims.play('mageFloats');   //HORIZONTAL MOVEMENT
    } 
    if (cursors.right.isDown) {
        mage_spr.x += 5;
        if (mage_spr.x > GAMEWIDTH) {
            mage_spr.x = GAMEWIDTH;
        }
    } 
    /*
    if (cursors.up.isDown) {
        playerShip_spr.y -= 5;
        if (playerShip_spr.y < 0) {
            playerShip_spr.y = 0;
        }
    }                                              //VERTICAL MOVEMENT  --> NO NEEDED HERE
    if (cursors.down.isDown) {
        playerShip_spr.y += 5;
        if (playerShip_spr.y > GAMEHEIGHT) {
            playerShip_spr.y = GAMEHEIGHT;
        }
    }  
    */
    
} // end of updatePlayer()

function killPlayer(mage_spr) { 
    playing_bool = false;
    mage_spr.anims.play('mageGmover');
    mage_spr.once('animationcomplete', playerAniEnded);
} 

function playerAniEnded() {
    console.log("into playerAniEnded");
    let firstFrame = this.anims.currentAnim.frames[0];
    this.anims.setCurrentFrame(firstFrame);
    gameOver(this.scene); 
}