class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.gameScreen = gameScreen;
    this.imageSrc = imgSrc; // player facing left image
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);

    //jump part
    this.velocityY = 0; // initial vertical velocity
    this.gravity = 0.3; // gravity strength
    this.jumpStrength = -8; // initial jump velocity (negative for upward movement)
    this.isJumping = false;
  }

  //previous code
  handlePlatformCollision(platform) {
    this.top = platform.top - this.height;
    // this.left = platform.left - this.width;

    this.velocityY = 5;
    this.isJumping = false;
  }

  move() {
    this.velocityY += this.gravity; //jump part
    this.top += this.velocityY;

    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    this.left += this.directionX;
    this.top += this.directionY;

    if (this.directionX < 0) {
      this.imageSrc = "./images/player-left.png"; // left-facing image source
    } else if (this.directionX > 0) {
      this.imageSrc = "./images/player-right.png"; // right-facing image source
    }

    this.left = Math.max(20, Math.min(this.gameScreen.offsetWidth - this.width - 20, this.left));
    this.top = Math.min(this.gameScreen.offsetHeight - this.height - 20, this.top);

    this.updatePosition();
  }

  updatePosition() {
    this.element.src = this.imageSrc;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  // previous code
  // interaction with platforms
  isCollidingWith(platform) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = platform.element.getBoundingClientRect();
    const didCollide = playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top

    let previousTop = 0, previousLeft = 0;

    // if (!didCollide) {
    //   previousTop = this.top;
    //   previousLeft = this.left;
    // }

    if (didCollide) {
      //console.log("Collision detected!");

      this.top += obstacleRect.bottom
    }
    return didCollide;
  }
  // isCollidingWith(platform) {
  //   let playerLeft = this.left;
  //   let playerRight = this.left + this.width;
  //   let playerTop = this.top;
  //   let playerBottom = this.top + this.height;

  //   const platformLeft = platform.left;
  //   const platformRight = platform.left + platform.width;
  //   const platformTop = platform.top;
  //   const platformBottom = platform.top + platform.height;

  //   if (
  //     playerLeft < platformRight &&
  //     playerRight > platformLeft &&
  //     playerTop < platformBottom &&
  //     playerBottom > platformTop 
  //   )
  //   {
  //     playerTop = platformTop - this.height;
  //     playerBottom = platformBottom;
  //     playerLeft = platformLeft - this.width; 
  //     playerRight = platformRight; 
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



  // isCollidingTop(platform) {
  //   const playerLeft = this.left;
  //   const playerRight = this.left + this.width;
  //   const playerTop = this.top;
  //   const playerBottom = this.top + this.height;

  //   const platformLeft = platform.left;
  //   const platformRight = platform.left + platform.width;
  //   const platformTop = platform.top;
  //   const platformBottom = platform.top + platform.height;

  //   return (
  //     playerRight > platformLeft &&
  //   playerLeft < platformRight &&
  //   playerTop < platformBottom && // Adjusted this line
  //   playerBottom > platformTop && // Adjusted this line
  //   playerTop < platformTop
  // );
  // }
}

// move function with jump images (was putting default image player-right)

//     let jumpImageSrc = "./images/player-right.png"; // Default jump image source

//     if (this.directionX < 0) {
//         jumpImageSrc = "./images/player-left-jump.png"; // Jumping left image source
//     } else if (this.directionX > 0) {
//         jumpImageSrc = "./images/player-right-jump.png"; // Jumping right image source
//     }

//     if (this.isJumping) {
//         // Set the image source to the jumping image
//         this.imageSrc = jumpImageSrc;
//     } else {
//         // Handle left and right movement images
//         if (this.directionX < 0) {
//             this.imageSrc = "./images/player-left.png"; // left-facing image source
//         } else if (this.directionX > 0) {
//             this.imageSrc = "./images/player-right.png"; // right-facing image source
//         }
//     }