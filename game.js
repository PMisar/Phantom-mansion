// game.js
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.gameEndScreen2 = document.querySelector("#game-end2");

    this.platforms = [];  // array to store platform objects
    this.platformPositions = {
      level0: [
        { left: 500, top: 100 },
        { left: 400, top: 250 },
        { left: 100, top: 400 },
        { left: 300, top: 550 },
        { left: 650, top: 600 },
        { left: 700, top: 250 },
      ],
      level1: [
        { left: 200, top: 150 },
        { left: 400, top: 250 },
        { left: 500, top: 400 },
        { left: 100, top: 500 },
        { left: 300, top: 550 },
        { left: 550, top: 600 },
        { left: 650, top: 200 },
        { left: 800, top: 100 },
      ],
      level2: [
        { left: 200, top: 550 },
        { left: 400, top: 350 },
        { left: 100, top: 400 },
        { left: 400, top: 650 },
        { left: 200, top: 100 },
        { left: 600, top: 150 },
        { left: 550, top: 500 },
        { left: 650, top: 300 },
        { left: 800, top: 400 },
        { left: 250, top: 200 },
      ],
      level3: [
        { left: 100, top: 650 },
        { left: 350, top: 500 },
        { left: 800, top: 250 },
        { left: 670, top: 570 },
        { left: 300, top: 250 },
        { left: 520, top: 170 },
        { left: 600, top: 370 },
        { left: 500, top: 470 },
      ],
    };
    this.currentPlatform = this.platformPositions.level0; // initial platform positions
    this.player = new Player(
      this.gameScreen,
      460,
      650,
      60,
      90,
      "./images/player-right.png"
    );
    this.height = 700;
    this.width = 1000;
    this.lastTimestamp = 0;
    this.fixedTimeStep = 1 / 60; // 60 FPS

    this.levels = [
      "./images/level0.png",
      "./images/level1.png",
      "./images/level2.png",
      "./images/level3.png",
    ]; // 4 level images
    this.currentLevel = 0;
    this.levelCounter = document.getElementById("level"); // to update level count
    this.collectibleItem = null;
    this.hasCollectedItem = false;
    this.gameIsOver = false;
    this.createPlatforms(this.gameScreen, this.currentPlatform);
  }

  createPlatforms(gameScreen, platformPositions) {
    // creates platform objects based on provided positions
    platformPositions.forEach((position) => {
      this.platforms.push(new Platform(gameScreen, position.left, position.top, 100, 20));
    });
    return this.platforms;
  }

  removePlatforms() {
    // removes platform elements from the DOM
    document.querySelectorAll(".platform").forEach((e) => {
      e.remove()
    })
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop(timestamp) {
    if (this.gameIsOver) {
      return;
    }
    // test code
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
    this.lastTimestamp = timestamp;

    this.update(deltaTime); // Pass deltaTime to the update method

    window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }
  //   this.update();

  //   window.requestAnimationFrame(() => this.gameLoop());
  // }

  update(deltaTime) {
    this.player.move(deltaTime);

    if (!this.hasCollectedItem && this.currentLevel === 3) {
      if (this.player.isCollidingWith(this.collectibleItem)) {
        this.hasCollectedItem = true;
        this.showWinScreen();
      }
    }

    // detecting and interacting with platforms
    for (const platform of this.platforms) {  // iterating through each platform in the platforms array.
      this.player.isCollidingWith(platform);  // calling method to check if the player is colliding with the current platform.
      if (this.player.isCollidingWith(platform)) {
        this.player.handlePlatformCollision(platform);  // calling the method of the player object, passing the platform as an argument.
      }
    }

    if (this.player.top + this.player.height <= 0) { // checks if the top edge of the player (plus its height) is above the screen.

      if (this.currentLevel < this.levels.length - 1) { // to check if there are more levels
        this.currentLevel++;
        this.removePlatforms(); // calling a function to remove the existing platforms
        this.platforms = [];  // reseting the platforms array.
        this.createPlatforms(this.gameScreen, this.platformPositions["level" + this.currentLevel]); // creating new platforms for the next level using a function, passing the game screen element and positions for the new level.

        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]  // updating the background image of the game screen to the one specified for the next level.
          }')`;
        this.player.top = 650; // players position

        this.updateLevelCounter(); // to update the level counter
      }

      if (this.currentLevel === 3 && !this.collectibleItem) { // show item at level 3
        this.collectibleItem = new Collectible(
          this.gameScreen,
          550,
          30,
          50,
          140,
          "images/Sword.png"
        );
      }
    }
  }

  updateLevelCounter() {
    this.levelCounter.textContent = this.currentLevel; // updates the level counter text
  }

  showWinScreen() {
    this.player.element.remove();
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    const gameEndScreen2 = document.querySelector("#game-end2");
    gameEndScreen2.style.display = "block";
  }

  endGame() {
    this.player.element.remove();
    this.gameIsOver = true;
    if (!this.hasCollectedItem) {
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "block";
    }
  }
}