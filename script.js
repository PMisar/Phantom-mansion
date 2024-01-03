// script.js
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

  // function handleKeydown(event) { // event listener for handling keydown events
  //   const key = event.key.toLowerCase();

  //   if ((key === "arrowup" || key === "w") && !game.player.isJumping) { 
  //     game.player.velocityY = game.player.jumpStrength;
  //     game.player.isJumping = true;
  //     event.preventDefault();
  //   }

  //   const keyMappings = {
  //     "arrowleft": "left",
  //     "a": "left",
  //     "arrowup": "up",
  //     "w": "up",
  //     "arrowright": "right",
  //     "d": "right",
  //   };

  //   if (keyMappings[key]) {
  //     event.preventDefault();

  //     switch (keyMappings[key]) {
  //       case "left":
  //         game.player.directionX = -4;
  //         break;
  //       case "up":
  //         game.player.directionY = -4;
  //         break;
  //       case "right":
  //         game.player.directionX = 4;
  //         break;
  //     }
  //   }
  // }

  // function handleKeyup(event) {  // event listener for handling keyup events.
  //   const key = event.key.toLowerCase(); // method to ensure that key input is case-insensitive.

  //   // if (key === "arrowup" || key === "w") {  // doesn't do anything.
  //     if (game.player.directionX < 0) {
  //       game.player.imageSrc = "./images/player-left.png";
  //     } else if (game.player.directionX > 0) {
  //       game.player.imageSrc = "./images/player-right.png";
  //     }
  //   // }

  //   const keyMappings = {
  //     "arrowleft": "left",
  //     "a": "left",
  //     "arrowup": "up",
  //     "w": "up",
  //     "arrowright": "right",
  //     "d": "right",
  //   };

  //   if (keyMappings[key]) {
  //     event.preventDefault();

  //     switch (keyMappings[key]) {
  //       case "left":
  //         game.player.directionX = 0;
  //         break;
  //       case "up":
  //         game.player.directionY = 0;
  //         break;
  //       case "right":
  //         game.player.directionX = 0;
  //         break;
  //     }
  //   }
  // }
  function handleKeydown(event) {
    const key = event.key.toLowerCase();

    if (key === "arrowup" || key === "w") {
      if (!game.player.isJumping) {
        game.player.velocityY = game.player.jumpStrength;
        game.player.isJumping = true;
        event.preventDefault();
      }
    }

    if (key === "arrowleft" || key === "a") {
      game.player.directionX = -4;
      event.preventDefault();
    }

    if (key === "arrowright" || key === "d") {
      game.player.directionX = 4;
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