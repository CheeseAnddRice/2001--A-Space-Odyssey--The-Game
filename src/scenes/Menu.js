class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
         // menu text configuration
         let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - game.config.height / 15, '2001: A Space Odyssey', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + game.config.height / 7.5, 'Press I for help and credits', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyI = this.input.keyboard.addKey('I');
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.sound.play('sfx_select');
            this.scene.start("apeScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyI)) {
            //this.sound.play('sfx_select');
            //this.scene.start('tutorialScene');
        }
    }

}