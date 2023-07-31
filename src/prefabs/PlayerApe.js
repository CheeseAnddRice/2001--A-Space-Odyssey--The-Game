class PlayerApe extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 400;
        this.jumpVelocity = -800;
        this.MAX_X_VEL = 500;
        this.MAX_Y_VEL = 5000;

        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        this.state = '';

        }

    preload() {
        this.load.spritesheet('player', './assets/playerApe.png', {frameWidth: 32, frameHeight: 32});
    }

    update() {
        // Return from jump to idle on landing
        if(this.body.touching.down && this.state == 'jumping') {
            this.state = 'idle';
            this.anims.play('idle');
        }
        
        if(cursors.left.isDown && this.x > this.width / 2) {
            this.body.setVelocityX(-this.speed);
            this.setFlip(true, false);
            if(this.state != 'walking' && this.state != 'jumping') {
                this.state = 'walking';
                this.anims.play('walking');
            }
        } else if(cursors.right.isDown && this.x < game.config.width - this.width / 2) {
            this.body.setVelocityX(this.speed);
            this.resetFlip();
            if(this.state != 'walking' && !(this.state === 'jumping')) {
                this.state = 'walking';
                this.anims.play('walking');
            }
        } else {
            this.body.setVelocityX(0);
            if(this.state != 'idle' && !(this.state === 'jumping')) {
                this.state = 'idle';
                this.anims.play('idle');
            }
        }

        if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.body.setVelocityY(this.jumpVelocity);
            if(this.state != 'jumping') {
                this.state = 'jumping';
                this.anims.play('jumping');
            }
        }
    }


}