// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, type) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.points = pointValue
      if (type == "basic") {
        this.moveSpeed = game.settings.spaceshipSpeed
      } else {
        this.moveSpeed = game.settings.spaceshipSpeed2
      }
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    // reset position
    reset() {
        this.x = game.config.width
    }
}