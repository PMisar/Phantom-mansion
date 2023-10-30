window.onload = function () 
{
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const backgroundMusic = document.getElementById("background-music");
  const game = new Game();

  startButton.addEventListener("click", function () 
  {
    startGame();
    backgroundMusic.play(); 
  });

  function startGame() 
  {
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key.toLowerCase();
  
    if ((key === "arrowup" || key === "w") && !game.player.isJumping) {
      game.player.velocityY = game.player.jumpStrength;
      game.player.isJumping = true;
      event.preventDefault();
    }
  

    const keyMappings = 
    {
      "arrowleft": "left",
      "a": "left",
      "arrowup": "up",
      "w": "up",
      "arrowright": "right",
      "d": "right",
      "arrowdown": "down",
      "s": "down",
    };
  
    if (keyMappings[key]) 
    {
      event.preventDefault();
  
      switch (keyMappings[key]) 
      {
        case "left":
          game.player.directionX = -4;
          break;
        case "up":
          game.player.directionY = -4;
          break;
        case "right":
          game.player.directionX = 4;
          break;
        case "down":
          game.player.directionY = 4;
          break;
      }
    }
  }
  
  function handleKeyup(event) {
    const key = event.key.toLowerCase();
  
    if (key === "arrowup" || key === "w") {
      // Do nothing when releasing the jump key to prevent double jumps.
    }

    const keyMappings = 
    {
      "arrowleft": "left",
      "a": "left",
      "arrowup": "up",
      "w": "up",
      "arrowright": "right",
      "d": "right",
      "arrowdown": "down",
      "s": "down",
    };

    if (keyMappings[key]) {
      event.preventDefault();
  
      switch (keyMappings[key]) {
        case "left":
          game.player.directionX = 0;
          break;
        case "up":
          game.player.directionY = 0;
          break;
        case "right":
          game.player.directionX = 0;
          break;
        case "down":
          game.player.directionY = 0;
          break;
      }
    }
  }
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};

  