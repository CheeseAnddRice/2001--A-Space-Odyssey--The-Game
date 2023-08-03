class EnemyApe extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, playerApe, left, right) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 100;
        //this.MAX_X_VEL = 400;
        //this.MAX_Y_VEL = 0;

        this.player = playerApe;
        this.leftBound = left;
        this.rightBound = right;
        this.movingLeft = true;
        this.dead = false;

        //this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        this.anims.play('enemyIdle');

        }

    preload() {
        this.load.spritesheet('player', './assets/enemyApe.png', {frameWidth: 32, frameHeight: 32});
    }

    update() {
        // If moving left and moved too far, change direction
        if (this.movingLeft && this.x < this.leftBound) {
            this.movingLeft = false;
        // Vice versa
        } else if (!this.movingLeft && this.x > this.rightBound) {
            this.movingLeft = true;
        }

        if(this.movingLeft) {
            this.body.setVelocityX(-this.speed);
        } else {
            this.body.setVelocityX(this.speed);
        }

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.getBounds())) {
            this.player.knockback(this);
        }
    }
}