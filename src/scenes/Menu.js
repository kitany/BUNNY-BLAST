class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load music
        this.load.audio('bunny-blast-bgm', './assets/8bittownthemesong.wav')

        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('starfield', './assets/starfield.png')

        // load menu border
        this.load.image('bunny-border', './assets/bunny-border.png')
        this.load.image('bunny-border-flipped', './assets/bunny-border-flipped.png')


        // load bunny spaceship spritesheet
        this.load.spritesheet('bunny-ship', './assets/bunny-ship.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2,
        })

        // load carrot spaceship spritesheet
        this.load.spritesheet('carrot-ship', './assets/carrot-ship.png', {
            frameWidth: 48,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 3,
        })

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        })
        this.load.spritesheet('explosion02', './assets/explosion02.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 5,
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion01', './assets/sfx-explosion01.wav')
        this.load.audio('sfx-explosion02', './assets/sfx-explosion02.wav')
        this.load.audio('sfx-explosion03', './assets/sfx-explosion03.wav')
        this.load.audio('sfx-explosion04', './assets/sfx-explosion04.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')

        // load font 
        this.load.bitmapFont('pixel', 'assets/fonts/pixel-bitmap-font/pixel.png', 'assets/fonts/pixel-bitmap-font/pixel.xml');
    }


    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30,
        })

        this.anims.create({
            key: 'explode02',
            frames: this.anims.generateFrameNumbers('explosion02', { 
                start: 0, 
                end: 5, 
                first: 0
            }),
            frameRate: 30,
        })

        this.anims.create({
            key: 'bunny-ship',
            frames: this.anims.generateFrameNumbers('bunny-ship', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 4,
            repeat: -1,
        })

        this.anims.create({
            key: 'carrot-ship',
            frames: this.anims.generateFrameNumbers('carrot-ship', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 4,
            repeat: -1,
        })
        
        // menu UI
        this.add.bitmapText(game.config.width/7 + borderPadding,
            game.config.height/3 - 20,
            'pixel', 'ROCKET PATROL:\n BUNNY BLAST!');
        this.add.bitmapText(game.config.width/4 - borderUISize - borderPadding + 10,
            game.config.height/2 - 20,
            'pixel', 'Use <- -> arrows to\nmove & (F) to fire!').setFontSize(20);
        this.add.bitmapText(game.config.width/4 - borderUISize - borderPadding + 55,
            game.config.height/1.5 - 35,
            'pixel', 'Press <- for Novice\n or -> for Expert').setFontSize(15);

        // menu border
        this.add.tileSprite(0, 30, 640, 0, 'bunny-border-flipped').setOrigin(0, 0)
        this.add.tileSprite(0, game.config.height - 120, 640, 0, 'bunny-border').setOrigin(0, 0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 3,
              spaceshipSpeed2: 5,
              gameTimer: 60000,  
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
            spaceshipSpeed: 4,
            spaceshipSpeed2: 6,
            gameTimer: 45000,   
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')    
        }
    }
    
}
