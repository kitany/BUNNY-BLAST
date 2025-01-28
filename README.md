# BUNNY-BLAST

Name: Kayla Nguyen
Modification Title: Rocket Patrol: BUNNY BLAST (or BUNNY BLAST for short)
Project time: 11 hours
NOTE: I am aware Phaser documentation does not need to be cited, but it is good reference I'd like to keep :)

Mods Chosen: 
1) Implement the 'FIRE' UI text from the original game (1)
    - implemented FIRE text to UI on top right corner, added text to scene in Rocket.js
    - when keyFIRE is pressed, FIRE text becomes visible (used logic from playing fire audio)
    - setVisible reference: https://docs.phaser.io/api-documentation/class/gameobjects-isotriangle
2) Add your own (copyright-free) looping background music to the Play scene
(keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
    - found copyright-free music and bgm instance, the music loops and resets when a player hits RESTART
    - link to bgm: https://freesound.org/people/sunsetplanet/sounds/559067/
    - implementation reference: https://phaser.discourse.group/t/how-to-stop-a-song-in-phaser-3/754/2
3) Implement the speed increase that happens after 30 seconds in the original game (1)
    - created clock and boolean variable speedIncrease in Play.js
    - when the clock hits 30 seconds, speedIncrease is set to true
    - editted update() function in Play.js to check if speedIncrease is true and multiplies moveeSpeed by 1.5
    - timer reference: https://docs.phaser.io/api-documentation/class/time-clock
4) Create a new scrolling tile sprite for the background (1)
    - used Piskel to create new sprite background
    - inspired by this art: https://opengameart.org/content/space-pixel-art 
5) Create 4 new explosion sound effects and randomize which one plays on impact (3)
    - used Math.random to get an integer between 0 and 3 and used ternary operators to choose audio based on number
    - inspired by this video: https://youtu.be/MR6GuO0r7KY?si=p7mHQ03b4rsFN293
    - audio references:
      1. https://freesound.org/people/stumpbutt/sounds/381764/
      2. https://freesound.org/people/cabled_mess/sounds/350976/
      3. https://freesound.org/people/Jerimee/sounds/527525/
      4. https://freesound.org/people/kutejnikov/sounds/522209/
6) Display the time remaining (in seconds) on the screen (3)
    - created totalTime and currentTime (currentTime is made so we do not overwrite the totalTime the game is alloted)
    - created timeConfig and timerVisual to show a box that states the time left for the player
    - implemented formatTime(ms) and updateTime() -- updateTime() is called in update() Play.js to change the amount of time left
    - time conversion: https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
    - general timer reference: https://docs.phaser.io/phaser/concepts/game
7) Using a texture atlas, create a new animated sprite (three frames minimum) for the enemy spaceships (3)
    - used Piskel to create animated sprite
    - NOTE: animation is hard to see but the carrot-ship rotates and the bunny-ship's rocket fire is animated
8) Create a new title screen (e.g., new artwork, typography, layout) (3)
    - imported a bitmap font to change text on screen
    - layout is centered on screen and font sizes have been scaled
    - bunny border make on Piskel
    - bitmap reference:
       1. https://docs.phaser.io/api-documentation/class/gameobjects-bitmaptext
       2. https://www.fontspace.com/public-pixel-font-f72305
    - bunny sprite inspired by: https://www.teepublic.com/user/bonbonpup
9) Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
    - created unique sprite (carrot-ship) and added argument "type" to Spaceship class
    - if the ship type is "new" or not "basic," the game will change the ship's speed to a faster value
    - point value is implemented in Play.js, with carrot-ship having a point value of 50!
