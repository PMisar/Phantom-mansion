class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.gameEndScreen2 = document.querySelector("#game-end2");

    this.platforms = [];
    this.platformPositions = {
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
        { left: 400, top: 250 },
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
        { left: 520, top: 170 },
        { left: 600, top: 370 },
        { left: 500, top: 470 },

      ],
    };
    this.currentPlatform = this.platformPositions.level1;
    this.player = new Player(
      this.gameScreen,
      420,
      600,
      60,
      90,
      "./images/player-right.png"
    );
    this.height = 700;
    this.width = 1000;
    // this.fallThreshold = this.height / 2;
    // this.timerDuration = 30; // seconds
    this.remainingTime = this.timerDuration;

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
      this.platforms.push(new Platform(gameScreen, position.left, position.top, 100, 20));
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

    // this.remainingTime -= 1 / 60; // 60 FPS game loop

    if (!this.hasCollectedItem && this.currentLevel === 3) {
      if (this.player.isCollidingWith(this.collectibleItem)) {
        this.hasCollectedItem = true;
        this.showWinScreen();
      }
    }
    // if (this.remainingTime <= 0) {
    //   this.gameIsOver = true;
    //   this.endGame();
    //   return;
    // }
    // if (this.player.top > this.fallThreshold) {
    //   this.gameIsOver = true;
    //   this.endGame();
    //   return;
    // }

    for (const platform of this.platforms) {
      // standing on a platform
      if (this.player.isCollidingWith(platform)) {
        this.player.handlePlatformCollision(platform);
      }
      // else if (this.player.isCollidingTop(platform)){
      //   this.player.handlePlatformCollision(platform);
      // }
    }

    if (this.player.top + this.player.height <= 0) {
      if (this.player.top > this.height / 2) {
        //death scenario
        this.gameIsOver = true;
      }

      if (this.currentLevel < this.levels.length - 1) {
        // to check if there are more levels
        this.currentLevel++;
        this.removePlatforms();
        this.platforms = [];
        this.createPlatforms(this.gameScreen, this.platformPositions["level" + this.currentLevel]);
        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]
          }')`;
        this.player.top = 580;

        this.updateLevelCounter(); // to update the level counter
      }

      if (this.currentLevel === 3 && !this.collectibleItem) {
        // show item at level 3

        this.collectibleItem = new Collectible(
          this.gameScreen,
          550,
          30,
          50,
          140,
          "./images/sword.png"
        );
      }
    }
  }

  updateLevelCounter() {
    this.levelCounter.textContent = this.currentLevel; // updates the level counter text
  }
  ˇ
  showWinScreen() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    const gameEndScreen2 = document.querySelector("#game-end2");
    gameEndScreen2.style.display = "block";

    // Hide the death screen
    this.gameEndScreen.style.display = "none";
  }

  endGame() {
    this.player.element.remove();
    this.gameIsOver = true;

    // Display the death screen only if the player didn't collect the sword (gameIsOver is not due to collecting the sword)
    if (!this.hasCollectedItem) {
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "block";

      // if (this.player.top > this.fallThreshold) {
      //   // Display the game-end screen (player fell)
      //   this.gameScreen.style.display = "none";
      //   this.gameEndScreen.style.display = "block";

      //   // Hide game-end screen2 (player didn't collect the item)
      //   const gameEndScreen2 = document.querySelector("#game-end2");
      //   gameEndScreen2.style.display = "none";
      // }
    }

  }
  showWinScreen() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.gameScreen.style.display = "none";
    const gameEndScreen2 = document.querySelector("#game-end2");
    gameEndScreen2.style.display = "block";
  }

  // endGame() {
  //   this.player.element.remove();
  //   this.gameIsOver = true;
  //   this.gameScreen.style.display = "none";
  //   this.gameEndScreen.style.display = "block";
  // }
}

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