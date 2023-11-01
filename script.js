window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const restartButton2 = document.getElementById("restart-button2");
  const backgroundMusic = document.getElementById("background-music");
  const game = new Game();

  startButton.addEventListener("click", function () {
    startGame();
    backgroundMusic.play();
  });

  function startGame() {
    game.start(); 
  }

  function handleKeydown(event) {
    const key = event.key.toLowerCase();
  
    if ((key === "arrowup" || key === "w") && !game.player.isJumping) {
      game.player.velocityY = game.player.jumpStrength;
      game.player.isJumping = true;
      event.preventDefault();
    }
  
    const keyMappings = {
      "arrowleft": "left",
      "a": "left",
      "arrowup": "up",
      "w": "up",
      "arrowright": "right",
      "d": "right",
    };
  
    if (keyMappings[key]) {
      event.preventDefault();
  
      switch (keyMappings[key]) {
        case "left":
          game.player.directionX = -4;
          break;
        case "up":
          game.player.directionY = -4;
          break;
        case "right":
          game.player.directionX = 4;
          break;
      }
    }
  }
  
  function handleKeyup(event) {
    const key = event.key.toLowerCase();
  
    if (key === "arrowup" || key === "w") {
      // do nothing when releasing the jump key to prevent double jumps.
    }

    const keyMappings = {
      "arrowleft": "left",
      "a": "left",
      "arrowup": "up",
      "w": "up",
      "arrowright": "right",
      "d": "right",
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
      }
    }
  }
  //TEST CODE
  const updatePlayerPosition = () => {
    game.player.move();
  };

  const didCollide = () => {
    // Implement the collision detection logic here based on your game's requirements
    const playerRect = game.player.element.getBoundingClientRect();
    const obstacleRect = Platform;

    return (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    );
  };
  
// TEST CODE
  const handlePlatformCollision = () => {
    if (didCollide()) {
      console.log("Collision detected!");
      const previousTop = game.player.top;
      const previousLeft = game.player.left;
      updatePlayerPosition();

      // Restore the previous position
      game.player.top = previousTop;
      game.player.left = previousLeft;
      updatePlayerPosition();
    }
  };







  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  restartButton.addEventListener("click", function () { // game restart
    restartGame();
  });

  restartButton2.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
};

  

// const player = document.getElementById("player");
// const obstacle = document.getElementById("obstacle");

// // Set initial position
// let playerTop = 100;
// let playerLeft = 100;

// // Function to update player position
// function updatePlayerPosition() {
//   player.style.top = `${playerTop}px`;
//   player.style.left = `${playerLeft}px`;
// }

// // Function to handle keydown events
// function handleKeydown(event) {
//   const step = 10; // Amount of pixels to move on each arrow key press

//   // Store the current position before attempting to move
//   const previousTop = playerTop;
//   const previousLeft = playerLeft;

//   switch (event.key) {
//     case "ArrowUp":
//       playerTop -= step;
//       break;
//     case "ArrowDown":
//       playerTop += step;
//       break;
//     case "ArrowLeft":
//       playerLeft -= step;
//       break;
//     case "ArrowRight":
//       playerLeft += step;
//       break;
//   }

//   // Update player position
//   updatePlayerPosition();

//   // Check for collision
//   if (didCollide()) {
//     console.log("Collision detected!");
//     // Restore the previous position
//     playerTop = previousTop;
//     playerLeft = previousLeft;
//     updatePlayerPosition();
//   }
// }

// function didCollide() {
//   const playerRect = player.getBoundingClientRect();
//   const obstacleRect = obstacle.getBoundingClientRect();

//   return (
//     playerRect.left < obstacleRect.right &&
//     playerRect.right > obstacleRect.left &&
//     playerRect.top < obstacleRect.bottom &&
//     playerRect.bottom > obstacleRect.top
//   );
// }

// // Attach keydown event listener to the document
// document.addEventListener("keydown", handleKeydown);

// // Update initial player position
// updatePlayerPosition();