// game.js
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.gameEndScreen2 = document.querySelector("#game-end2");

    this.platforms = []; 
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
      level4: [
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
      level5: [
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
      level6: [
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
      level7: [
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
      level8: [
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
      level9: [
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
      level10: [
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
    this.fixedTimeStep = 1 / 60;

    this.levels = [
      "./images/level0.png",
      "./images/level1.png",
      "./images/level2.png",
      "./images/level3.png",
      "./images/level4.png",
      "./images/level5.png",
      "./images/level6.png",
      "./images/level7.png",
      "./images/level8.png",
      "./images/level9.png",
      "./images/level10.png",
    ];
    this.currentLevel = 0;
    this.levelCounter = document.getElementById("level"); // to update level count
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

  gameLoop(timestamp) {
    if (this.gameIsOver) {
      return;
    }
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
    this.lastTimestamp = timestamp;

    this.update(deltaTime); 

    window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    this.player.move(deltaTime);
    if (!this.hasCollectedItem && this.currentLevel === 10) {
      if (this.player.isCollidingWith(this.collectibleItem)) {
        this.hasCollectedItem = true;
        this.showWinScreen();
      }
    }

    for (const platform of this.platforms) {  
      this.player.isCollidingWith(platform);  
      if (this.player.isCollidingWith(platform)) {
        this.player.handlePlatformCollision(platform);  
      }
    }

    if (this.player.top + this.player.height <= 0) { 

      if (this.currentLevel < this.levels.length - 1) { 
        this.currentLevel++;
        this.removePlatforms(); 
        this.platforms = [];  
        this.createPlatforms(this.gameScreen, this.platformPositions["level" + this.currentLevel]); 

        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel] 
          }')`;
        this.player.top = 650; 

        this.updateLevelCounter(); 
      }

      if (this.currentLevel === 10 && !this.collectibleItem) { 
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
    this.levelCounter.textContent = this.currentLevel;
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