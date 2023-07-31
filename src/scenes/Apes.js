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
    }

    create() {
        // Variables
        this.physics.world.gravity.y = 3000;

        // Define keys
        cursors = this.input.keyboard.createCursorKeys();

        // Background and ground
        this.add.sprite(0, 0, 'background1').setOrigin(0, 0);
        this.ground = this.physics.add.sprite(0, game.config.height - 160, 'ground').setOrigin(0, 0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

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

        // Enemy
        this.enemy = this.physics.add.sprite(this.game.config.width - this.game.config.width / 10, game.config.height / 2, 'enemy', 0).setOrigin(0.5, 0);
        this.physics.add.collider(this.enemy, this.ground);

        // Bones
        this.bones = this.add.sprite(game.config.width / 5, game.config.height / 2 + 16, 'bones').setOrigin(0.5, 0);
        this.bones.alpha = 0;
    }

    update() {
        this.player.update();

        // Reveal bones if monolith contacted
        if(this.bones.alpha == 0) {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.monolith.getBounds())) {
                this.bones.alpha = 1;
            }
        // Once bones revealed, check for player interaction and give bone to player
        } else {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.bones.getBounds())) {
                console.log("Found bones");
            }
        }
    }

}