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
    this.jumpStrength = -6; // initial jump velocity (negative for upward movement)
    this.isJumping = false;
  }

  handlePlatformCollision(platform) {
    this.top = platform.top - this.height;
    this.velocityY = 0;
    this.isJumping = false;
  }

  // standing on a platform
  isCollidingWith(platform) {
    const playerLeft = this.left;
    const playerRight = this.left + this.width;
    const playerTop = this.top;
    const playerBottom = this.top + this.height;

    const platformLeft = platform.left;
    const platformRight = platform.left + platform.width;
    const platformTop = platform.top;
    const platformBottom = platform.top + platform.height;

    return (
      playerRight > platformLeft &&
      playerLeft < platformRight &&
      playerBottom > platformTop &&
      playerTop < platformBottom &&
      playerTop < platformTop // New condition to check that player's top doesn't collide with platform
    );
  }
  // collect item
  // playerHasCollectedItem() {
  //   const playerLeft = this.left;
  //   const playerRight = this.left + this.width;
  //   const playerTop = this.top;
  //   const playerBottom = this.top + this.height;
  
  //   const itemLeft = this.collectibleItem.left;
  //   const itemRight = this.collectibleItem.left + this.collectibleItem.width;
  //   const itemTop = this.collectibleItem.top;
  //   const itemBottom = this.collectibleItem.top + this.collectibleItem.height;
  
  //   // Check for collision between player and collectible item
  //   if (
  //     playerRight > itemLeft &&
  //     playerLeft < itemRight &&
  //     playerBottom > itemTop &&
  //     playerTop < itemBottom
  //   ) {
  //     return true; // The item is collected
  //   } else {
  //     return false; // The item is not collected
  //   }
  // }

  move() {
    this.velocityY += this.gravity; //jump part
    this.top += this.velocityY;

    // if (this.top > this.gameScreen.offsetHeight) {
    //   this.top = this.gameScreen.offsetHeight - this.height;
    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    this.left += this.directionX;
    this.top += this.directionY;

    if (this.directionX < 0) {// spookie facing left or right
      this.imageSrc = "./images/player-left.png"; // left-facing image source
    } else if (this.directionX > 0) {
      this.imageSrc = "./images/player-right.png"; // right-facing image source
    }

    this.left = Math.max(20, Math.min(this.gameScreen.offsetWidth - this.width - 20, this.left));
    // this.top = Math.max(10, Math.min(this.gameScreen.offsetHeight - this.height - 10, this.top)); //for border at the top
    this.top = Math.min(this.gameScreen.offsetHeight - this.height - 20, this.top);

    this.updatePosition();
  }

  updatePosition() {
    this.element.src = this.imageSrc;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}


// move function with jump images (was putting default image player-right)
// move()
//   {
//     this.velocityY += this.gravity;
//     this.top += this.velocityY;

//     if (this.top > this.gameScreen.offsetHeight - this.height) {
//       this.top = this.gameScreen.offsetHeight - this.height;
//       this.velocityY = 0;
//       this.isJumping = false;
//     }

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
//     this.left += this.directionX;
//     this.top += this.directionY;

//     this.updatePosition();
//      }
