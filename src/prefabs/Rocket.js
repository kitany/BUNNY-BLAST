// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.isFiring = false
      this.moveSpeed = 2

      this.sfxShot = scene.sound.add('sfx-shot')

      // FIRE UI text
      let fireConfig = {
        fontFamily: 'Courier',
        fontSize: '30px',
        backgroundColor: '#4c9160',
        color: '#235e34',
        align: 'center',
        }
      this.fireText = scene.add.text(500, borderUISize + borderPadding + 15, 'FIRE!', fireConfig);
      this.fireText.setVisible(false)
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
            this.fireText.setVisible(true)
        }

        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
            this.fireText.setVisible(false)
        }
    }
    
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
        this.fireText.setVisible(false)
    }
  }