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

        // States: idle, walking, jumping, stunned
        this.state = '';

        // Stun time is how long to be stunned, stun timer tracks how much longer player will be stunned for
        // (timer of 0 or less means not stunned)
        this.stunTime = 200;
        this.stunTimer = 0;
        this.knockbackPower = 10;
        this.stunLeft = true; // Left or right stun

        }

    preload() {
        this.load.spritesheet('player', './assets/playerApe.png', {frameWidth: 32, frameHeight: 32});
    }

    update(delta) {
        // Decrement stuntimer and move player
        if(this.stunTimer > 0) {
            this.stunTimer -= delta;
            if(this.stunLeft) {
                this.x -= this.knockbackPower;
            } else {
                this.x += this.knockbackPower;
            }
        }

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

    knockback(enemy) {
        if(enemy.x > this.x) {
            this.stunLeft = true;
        } else {
            this.stunLeft = false;
        }
        this.stunTimer = this.stunTime;
        //direction = new Phaser.Math.Vector2(this.x - enemy.x), (this.y - enemy.y);
        //console.log(direction.x);
        //direction = normalize(direction);
        //console.log(direction);
        /*let direction;
        // Push left
        if(enemy.x > this.x) {
            direction = -this.knockbackPower;
        }
        else {
            direction = this.knockbackPower;
        }
        this.setVelocityX(direction * 100000);
        */
    }

}