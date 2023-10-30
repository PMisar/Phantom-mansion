class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.player = new Player(this.gameScreen, 420, 580, 70, 100, "./images/player-right.png");
    this.height = 700;
    this.width = 1000;

    //added to change levels
    this.levels = ["./images/level0.png", "./images/level1.png", "./images/level2.png", "./images/level3.png"]; // 4 lever images
    this.currentLevel = 0;
    this.levelCounter = document.getElementById("level"); // to update level count 

    this.gameIsOver = false;
    this.initialRun = true;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //added to change levels
    // this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]}')`;

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
    // standing on a platform
    for (const platform of platforms) {
      if (this.player.isCollidingWith(platform)) {
        this.player.handlePlatformCollision(platform);
      }
    }
    if (this.player.top + this.player.height <= 0) {
      // Check if there are more levels
      if (this.currentLevel < this.levels.length - 1) {
        this.currentLevel++;
        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]}')`;
        this.player.top = 580;
        this.updateLevelCounter(); // Update the level counter
      } else {
        // You've completed all levels (you can add a win screen logic here)
      }
    }
  }
  updateLevelCounter() {
    this.levelCounter.textContent = this.currentLevel; // Update the level counter text
  }
  //   endGame() {
  //     this.player.element.remove();
  //     this.gameIsOver = true;
  //     this.gameScreen.style.display = "none";
  //     this.gameEndScreen.style.display = "block";
  //   }
}
