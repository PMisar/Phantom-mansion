class Game 
{
  constructor() 
  {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.player = new Player(this.gameScreen, 420, 580, 70, 100, "./images/player-right.png");
    
    this.collectibleItem = null; // Initialize collectibleItem to null
    
    this.height = 700;
    this.width = 1000;
    this.levels = ["./images/level0.png", "./images/level1.png", "./images/level2.png", "./images/level3.png"]; // 4 level images
    this.currentLevel = 0;
    this.levelCounter = document.getElementById("level"); // to update level count 
    this.gameIsOver = false;
    this.initialRun = true;
  }

  start() 
  {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

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
    
    for (const platform of platforms)  // standing on a platform
    {  
      if (this.player.isCollidingWith(platform)) 
      {
        this.player.handlePlatformCollision(platform);
      }
    }
    if (this.player.top + this.player.height <= 0) // add ; at the end to show the item image 
    {
      if (this.currentLevel < this.levels.length - 1) // to check if there are more levels
      {   
        this.currentLevel++;
        this.gameScreen.style.backgroundImage = `url('${this.levels[this.currentLevel]}')`;
        this.player.top = 580;
        // this.player.top = this.gameScreen.offsetHeight - this.player.height;

        this.updateLevelCounter(); // to update the level counter
      } else 
      {
        if (this.currentLevel === 3 && !this.collectibleItem)
        {
          this.collectibleItem = new Collectible(
            this.gameScreen, 450, 450, 150, 80, "./images/sword.png");
        }
      }
    }
  }

  updateLevelCounter() 
  {
    this.levelCounter.textContent = this.currentLevel; // Update the level counter text
  }
  //   endGame() {
  //     this.player.element.remove();
  //     this.gameIsOver = true;
  //     this.gameScreen.style.display = "none";
  //     this.gameEndScreen.style.display = "block";
  //   }
}
