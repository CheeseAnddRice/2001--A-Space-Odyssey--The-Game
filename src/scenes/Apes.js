class Apes extends Phaser.Scene {
    constructor() {
        super("apeScene");
    }

    preload() {
        this.load.image('background1', './assets/background1.png');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('player', './assets/playerApe.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemy', './assets/enemyApe.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('monolith', './assets/monolith.png');
        this.load.image('bones', './assets/bones.png');
        this.load.image('bone', './assets/bone.png');
    }

    create() {
        // Variables
        this.physics.world.gravity.y = 3000;

        // Define keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Background and ground
        this.add.sprite(0, 0, 'background1').setOrigin(0, 0);
        this.ground = this.physics.add.sprite(0, game.config.height - 160, 'ground').setOrigin(0, 0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        // Text and gameover
        menuConfig.fontSize = '18px';
        this.add.text(game.config.width / 2, game.config.height / 15, 'L/R arrows to move, up arrow to jump', menuConfig).setOrigin(0.5);
        this.endText = this.add.text(game.config.width / 2, game.config.height / 3.5, 'Game won', menuConfig).setOrigin(0.5);
        this.endText2 = this.add.text(game.config.width / 2, game.config.height / 2.80, 'Press space to return', menuConfig).setOrigin(0.5);
        this.endText.alpha = 0;
        this.endText2.alpha = 0;
        this.gameEnded = false;

        // Monolith
        this.monolith = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 - game.config.height / 10, 'monolith').setOrigin(0.5, 0);

        // Player
        this.player = new PlayerApe(this, this.game.config.width / 10, game.config.height / 2, 'player', 0).setOrigin(0.5, 0);
        this.physics.add.collider(this.player, this.ground);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
            frameRate: 3,
            repeat: -1
        })

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('player', {start: 3, end: 5}),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player', {start: 6, end: 8}),
            frameRate: 7,
            repeat: 0
        })

        // Enemies
        this.anims.create({
            key: 'enemyIdle',
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 2}),
            frameRate: 7,
            repeat: -1
        });

        this.enemies = [];

        this.enemy = new EnemyApe(this, 200, game.config.height / 2, 'enemy', 0, this.player, 100, 400).setOrigin(0.5, 0);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.player);
        this.enemies.push(this.enemy);

        this.enemy2 = new EnemyApe(this, this.game.config.width - this.game.config.width / 9, game.config.height / 2, 'enemy', 0, this.player, 300, 600).setOrigin(0.5, 0);
        this.physics.add.collider(this.enemy2, this.ground);
        this.physics.add.collider(this.enemy2, this.player);
        this.enemies.push(this.enemy2);

        // Bones
        this.bones = this.add.sprite(game.config.width / 5, game.config.height / 2 + 16, 'bones').setOrigin(0.5, 0);
        this.bones.alpha = 0;
        this.bone = this.add.sprite(0, 0, 'bone').setOrigin(0.5);
        this.bone.alpha = 0;
    }

    update(time, delta) {
        this.player.update(delta);
        let deadCount = 0;
        if(!this.gameEnded) {
            for (let e of this.enemies) {
                if(e.dead) {
                    deadCount++;
                } else {
                    e.update();
                }
            }
        }

        if(this.gameEnded && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }

        if (deadCount == this.enemies.length) {
            this.gameOver();
        }

        // Reveal bones if monolith contacted
        if(this.bones.alpha == 0) {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.monolith.getBounds())) {
                this.bones.alpha = 1;
            }
        // Once bones revealed, check for player interaction and give bone to player
        } else {
            if(!this.player.boneEquipped && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.bones.getBounds())) {
                this.bone.alpha = 1;
                this.player.boneEquipped = true;
            }
        }

        // If bone equipped, move it with player
        if(this.player.boneEquipped) {
            this.bone.setPosition(this.player.x, this.player.y);
        }

    }

    destroyApe(ape) {
        this.bone.alpha = 0;
        this.player.boneEquipped = false;
        ape.setPosition(10000, 0); // quick fix to 'delete' it because of null references
        ape.dead = true;
    }

    gameOver() {
        this.endText.alpha = 1;
        this.endText2.alpha = 1;
        this.gameEnded = true;
    }
}