class Game 
{
  constructor() 
  {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.player = new Player(this.gameScreen, 420, 580, 150, 150, "./images/player-right.png");
    this.height = 700;
    this.width = 1000;

    //added to change levels
    // this.levels = ["./images/level0.png", "./images/level1.png", "./images/level2.png", "./images/level3.png"];
    // this.currentLevel = 0;
    // this.playerPos = 0;

    this.gameIsOver = false;
  }

  start() 
  {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //added to change levels
    // this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]}')`;

    this.startScreen.style.display = "none";

    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop() 
  {
    if (this.gameIsOver) 
    {
      return;
    }
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() 
  {
    this.player.move();

    // collisions with platforms
    // for (const platform of this.platforms) 
    // {
    //   if (this.player.isCollidingWith(platform)) 
    //   {
    //     // char is colliding with the platform
    //     this.player.top = platform.top - this.player.height;
    //     this.player.velocityY = 0; // stop vertical movement
    //     this.player.isJumping = false; // reset jump state
    //   }
    // }ne

    // added to change levels
    //  if (this.player.posY < 0) {
    //   this.playerPos++;
    //   if (this.playerPos === this.height) {
    //     this.playerPos = 0;
    //     this.currentLevel++;
    //     if (this.currentLevel < this.levels.length) {
    //       this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]}')`;
    //     }
    //   }
    //   this.player.setPosition(this.player.posX, this.height - this.player.height - this.playerPos);
    // }
  }

  //   endGame() {
  //     this.player.element.remove();
  //     this.gameIsOver = true;
  //     this.gameScreen.style.display = "none";
  //     this.gameEndScreen.style.display = "block";
  //   }
}
