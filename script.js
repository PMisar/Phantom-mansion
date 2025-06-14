// // script.js
// window.onload = function () {
//   const startButton = document.getElementById("start-button");
//   const restartButton = document.getElementById("restart-button");
//   const restartButton2 = document.getElementById("restart-button2");
//   const backgroundMusic = document.getElementById("background-music");
//   const game = new Game();

//   startButton.addEventListener("click", function () {
//     startGame();
//     backgroundMusic.play();
//   });

//   function startGame() {
//     game.start();
//   }

//   function handleKeydown(event) {
//     const key = event.key.toLowerCase();

//     if (key === "arrowup" || key === "w") {
//       if (!game.player.isJumping) {
//         game.player.velocityY = game.player.jumpStrength;
//         game.player.isJumping = true;
//         event.preventDefault();
//       }
//     }

//     if (key === "arrowleft" || key === "a") {
//       game.player.directionX = -4;
//       event.preventDefault();
//     }

//     if (key === "arrowright" || key === "d") {
//       game.player.directionX = 4;
//       event.preventDefault();
//     }
//   }

//   function handleKeyup(event) {
//     const key = event.key.toLowerCase();

//     if ((key === "arrowleft" || key === "a") && game.player.directionX < 0) {
//       game.player.directionX = 0;
//       event.preventDefault();
//     }

//     if ((key === "arrowright" || key === "d") && game.player.directionX > 0) {
//       game.player.directionX = 0;
//       event.preventDefault();
//     }
//   } 

//   window.addEventListener("keydown", handleKeydown);
//   window.addEventListener("keyup", handleKeyup);

//   restartButton.addEventListener("click", function () {
//     restartGame();
//   });

//   restartButton2.addEventListener("click", function () {
//     restartGame();
//   });

//   function restartGame() {
//     location.reload();
//   }
// }

// script.js - Fixed input handling
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

    if (key === "arrowup" || key === "w") {
      if (!game.player.isJumping) {
        game.player.velocityY = game.player.jumpStrength;
        game.player.isJumping = true;
        event.preventDefault();
      }
    }

    // Fixed: Use -1 and 1 instead of -4 and 4 (speed is now handled in Player class)
    if (key === "arrowleft" || key === "a") {
      game.player.directionX = -1;
      event.preventDefault();
    }

    if (key === "arrowright" || key === "d") {
      game.player.directionX = 1;
      event.preventDefault();
    }
  }

  function handleKeyup(event) {
    const key = event.key.toLowerCase();

    if ((key === "arrowleft" || key === "a") && game.player.directionX < 0) {
      game.player.directionX = 0;
      event.preventDefault();
    }

    if ((key === "arrowright" || key === "d") && game.player.directionX > 0) {
      game.player.directionX = 0;
      event.preventDefault();
    }
  } 

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  restartButton2.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
}