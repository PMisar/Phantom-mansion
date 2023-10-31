class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.platforms = [];
    this.platformPositions = {
      level1: [
        { left: 100, top: 100 },
        { left: 300, top: 250 },
        { left: 500, top: 400 },
        { left: 100, top: 500 },
        { left: 300, top: 650 },
        { left: 500, top: 700 },
        // Add more positions as needed for level 1
      ],
      level2: [
        { left: 100, top: 100 },
        { left: 300, top: 250 },
        { left: 500, top: 400 },
        { left: 100, top: 500 },
        { left: 300, top: 650 },
        { left: 500, top: 700 },
        // Add more positions as needed for level 2
      ],
      level3: [
        { left: 100, top: 500 },
        { left: 300, top: 450 },
        { left: 500, top: 400 },
        // Add more positions as needed for level 3
      ],
    };
    // this.platformPositions = {
    //   level1: Array.from({ length: 10 }, () => ({
    //     left: Math.floor(Math.random() * 800),
    //     top: Math.floor(Math.random() * 600),
    //   })),
    //   level2: Array.from({ length: 10 }, () => ({
    //     left: Math.floor(Math.random() * 800),
    //     top: Math.floor(Math.random() * 600),
    //   })),
    //   level3: Array.from({ length: 5 }, () => ({
    //     left: Math.floor(Math.random() * 800),
    //     top: Math.floor(Math.random() * 600),
    //   })),
    // };
    this.currentPlatform = this.platformPositions.level1;
    this.player = new Player(
      this.gameScreen,
      420,
      580,
      70,
      100,
      "./images/player-right.png"
    );
    this.height = 700;
    this.width = 1000;
    this.levels = [
      "./images/level0.png",
      "./images/level1.png",
      "./images/level2.png",
      "./images/level3.png",
    ]; // 4 level images
    this.currentLevel = 0;
    this.levelCounter = document.getElementById("level"); // to update level count
    this.initialRun = true;

    this.collectibleItem = null;
    this.hasCollectedItem = false;
    this.gameIsOver = false;
    this.createPlatforms(this.gameScreen, this.currentPlatform);
  }

  createPlatforms(gameScreen, platformPositions) {
    platformPositions.forEach((position) => {
      this.platforms.push(new Platform(gameScreen, position.left, position.top, 100, 25));
    });
    return this.platforms;
  }

  removePlatforms() {
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

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();

    for (const platform of this.platforms) {
      // standing on a platform
      if (this.player.isCollidingWith(platform)) {
        this.player.handlePlatformCollision(platform);
      }
    }
    if (this.player.top + this.player.height <= 0) {
      if (this.player.top > this.height / 2) {
        //death scenario
        this.gameIsOver = true;
      }

      if (this.currentLevel < this.levels.length - 1) {
        // to check if there are more levels
        this.currentLevel++;
        // this.currentPlatform = this.platformPositions.level2;
        this.removePlatforms();
        this.platforms = [];
        this.createPlatforms(this.gameScreen, this.platformPositions["level" + this.currentLevel]);
        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]
          }')`;
        this.player.top = 580;

        this.updateLevelCounter(); // to update the level counter
      }

      if (this.currentLevel === 3 && !this.collectibleItem) {
        // show item

        this.collectibleItem = new Collectible(
          this.gameScreen,
          470,
          300,
          50,
          140,
          "./images/sword.png"
        );
      }
    }
    if (this.gameIsOver) {
      // death scenario
      this.endGame();
    }
  }

  updateLevelCounter() {
    this.levelCounter.textContent = this.currentLevel; // updates the level counter text
  }
  endGame() {
    this.player.element.remove();
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}