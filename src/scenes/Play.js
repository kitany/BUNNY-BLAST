class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x99cc99).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'bunny-ship', 0, 30, "basic").setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'bunny-ship', 0, 20, "basic").setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*3, 'bunny-ship', 0, 10, "basic").setOrigin(0,0)

        // add new spaceship
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'carrot-ship', 0, 50, "new").setOrigin(0, 0)

        // play spaceship anims
        this.ship01.play('bunny-ship')
        this.ship02.play('bunny-ship')
        this.ship03.play('bunny-ship')
        this.ship04.play('carrot-ship')

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f2ee6f',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        // initialize time
        this.totalTime = game.settings.gameTimer;
        this.currentTime = this.totalTime;

        // display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f2ee6f',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.timerVisual = this.add.text(borderUISize + borderPadding*22.5, borderUISize + borderPadding*2, this.formatTime(this.currentTime), timeConfig)


        // GAME OVER flag
        this.gameOver = false
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        // speed up after 30 seconds
        this.speedIncrease = false
        this.clockSpeedIncrease = this.time.delayedCall(30000, () => {
            this.speedIncrease = true;
        }, null, this)

        // bgm
        this.bgm = this.sound.add('bunny-blast-bgm', {
            volume: 0.4,
            loop: true
        });

        if (!this.bgm.isPlaying) {
            this.bgm.play();
        }
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.bgm.stop()
            this.scene.restart()
        }

        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.bgm.stop()
            this.scene.start("menuScene")
          }

        this.starfield.tilePositionX -= 3

        if(!this.gameOver) {    
            // update rocket sprite           
            this.p1Rocket.update()
            // update spaceships (x3)
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()

            // update timer
            this.updateTime()

            // update speed 
            if (this.speedIncrease) {
                this.ship01.moveSpeed *= 1.5
                this.ship02.moveSpeed *= 1.5
                this.ship03.moveSpeed *= 1.5
                this.ship04.moveSpeed *= 1.5
                this.speedIncrease = false;
            }
        } 

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04, "new")
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03, "basic")   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02, "basic")
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01, "basic")
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship, type) {
        // temporarily hide ship
        ship.alpha = 0
        
        // create explosion sprite at ship's position
        let boom
        if (type == "basic") { 
            boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode')
        } else {
            boom = this.add.sprite(ship.x, ship.y, 'explosion02').setOrigin(0, 0);
            boom.anims.play('explode02')
        }
        
        // callback after anim completes
        boom.on('animationcomplete', () => {
          ship.reset()    // reset ship position
          ship.alpha = 1  // make ship visible again
          boom.destroy()  // remove explosion sprite
        }) 
        
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        let explosionNum = Math.floor(Math.random()*4)
        explosionNum == 0 ? this.sound.play('sfx-explosion01') :
            explosionNum == 1 ? this.sound.play('sfx-explosion02') :
                explosionNum == 2 ? this.sound.play('sfx-explosion03') :
                    this.sound.play('sfx-explosion04')
      }

    formatTime(ms) {
        let s = ms / 1000
        let min = Math.floor(s / 60)
        let sec = Math.floor(s % 60)
        return `${min}:${sec.toString().padStart(2, '0')}`
    }

    updateTime() {
        this.currentTime -= this.game.loop.delta
        if (this.currentTime <= 0) {
            this.currentTime = 0
            this.gameOver = true
        }
        this.timerVisual.text = this.formatTime(this.currentTime)
    }

}
