class Apes extends Phaser.Scene {
    constructor() {
        super("apeScene");
    }

    preload() {
        this.load.image('background1', './assets/background1.png');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('player', './assets/playerApe.png', {frameWidth: 32, frameHeight: 32});

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
    
    }

    update() {
        this.player.update();
    }

}