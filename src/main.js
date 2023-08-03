/*
Marcus Williamson
2001: A Space Odyssey
9 hours

Only contains 1st intended scene

Phaser major components:
-Physics (arcade physics)
-Text objects
-Animations
-Spritesheets
-Timers(? I use update()'s delta for my own timers)

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Apes],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    fps: {
        forceSetTimeOut: true,
        target: 60
    }
    
}

let game = new Phaser.Game(config);
let menuConfig;

let cursors;
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyI;