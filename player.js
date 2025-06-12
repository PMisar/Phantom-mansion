// // player.js
// class Player {
//   constructor(gameScreen, left, top, width, height, imgSrc) {
//     this.left = left;
//     this.top = top;
//     this.width = width;
//     this.height = height;
//     this.directionX = 0;
//     this.directionY = 0;
//     this.gameScreen = gameScreen;
//     this.imageSrc = imgSrc; // player facing left image
//     this.element = document.createElement("img");
//     this.element.src = imgSrc;
//     this.element.style.position = "absolute";
//     this.element.style.width = `${width}px`;
//     this.element.style.height = `${height}px`;
//     this.element.style.left = `${left}px`;
//     this.element.style.top = `${top}px`;
//     this.gameScreen.appendChild(this.element);

//     this.velocityY = 0;
//     this.gravity = 0.3;
//     this.jumpStrength = -10;
//     this.isJumping = false;
//   }

//   handlePlatformCollision(platform) {
//     this.top = platform.top - this.height;
//     this.velocityY = 5;
//     this.isJumping = false;
//   }

//   decelerateX(direction) {
//     const deceleration = 0.2;
//     const oppositeDirection = (direction === "left") ? "right" : "left";

//     if (this.directionX !== 0 && this.directionX !== this.getDirectionMultiplier(direction)) {
//       this.directionX -= deceleration * this.getDirectionMultiplier(oppositeDirection);
//     } else {
//       this.directionX = 0;
//     }
//   }

//   getDirectionMultiplier(direction) {
//     return (direction === "left") ? -1 : 1;
//   }

//   move(deltaTime) {
//     this.velocityY += this.gravity;

//     if (this.isJumping) {
//       if (this.directionX < 0) {
//         this.imageSrc = "./images/player-left-jump.png"; // jumping left image source
//       } else if (this.directionX > 0) {
//         this.imageSrc = "./images/player-right-jump.png"; // jumping right image source
//       }
//     } else {
//       if (this.directionX < 0) {
//         this.imageSrc = "./images/player-left.png"; // left-facing image source
//       } else if (this.directionX > 0) {
//         this.imageSrc = "./images/player-right.png"; // right-facing image source
//       }
//     }

//     this.top += this.velocityY;

//     if (this.top > this.gameScreen.offsetHeight - this.height) {
//       this.top = this.gameScreen.offsetHeight - this.height;
//       this.velocityY = 0;
//       this.isJumping = false;
//     }

//     const expectedFrameTime = 1 / 60;
//     const frameMultiplier = deltaTime ? (deltaTime / expectedFrameTime) : 1;
//     this.left += this.directionX * frameMultiplier;
//     this.top += this.directionY;

//     this.left = Math.max(30, Math.min(this.gameScreen.offsetWidth - this.width - 30, this.left));
//     // this.top = Math.min(this.gameScreen.offsetHeight - this.height - 20, this.top);

//     this.updatePosition();
//   }

//   updatePosition() {
//     this.element.src = this.imageSrc;
//     this.element.style.left = `${this.left}px`;
//     this.element.style.top = `${this.top}px`;
//   }

//   isCollidingWith(platform) {
//     let playerLeft = this.left;
//     let playerRight = this.left + this.width;
//     let playerTop = this.top;
//     let playerBottom = this.top + this.height;

//     const platformLeft = platform.left;
//     const platformRight = platform.left + platform.width;
//     const platformTop = platform.top;
//     const platformBottom = platform.top + platform.height;

//     if (
//       playerLeft < platformRight &&
//       playerRight > platformLeft &&
//       playerTop < platformBottom &&
//       playerBottom > platformTop
//     ) {
//       const overlapLeft = playerRight - platformLeft;
//       const overlapRight = platformRight - playerLeft;
//       const overlapTop = playerBottom - platformTop;
//       const overlapBottom = platformBottom - playerTop;

//       const minOverlap = Math.min(
//         overlapLeft,
//         overlapRight,
//         overlapTop,
//         overlapBottom
//       );

//       if (minOverlap === overlapLeft) {
//         this.left -= overlapLeft;
//         if (this.velocityY > 0) {
//           this.velocityY = 0;
//           this.isJumping = false;
//         }
//       } else if (minOverlap === overlapRight) {
//         this.left += overlapRight;
//         if (this.velocityY > 0) {
//           this.velocityY = 0;
//           this.isJumping = false;
//         }
//       } else if (minOverlap === overlapTop) {
//         this.top -= overlapTop;
//         if (this.velocityY > 0) {
//           this.velocityY = 0;
//           this.isJumping = false;
//         }
//       } else if (minOverlap === overlapBottom) {
//         this.top += overlapBottom;
//         if (this.velocityY < 0) {
//           this.velocityY = 0;
//         }
//       }
//       return true;
//     }
//     return false;
//   }
// }

// player.js - Fixed version with proper delta time implementation
class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.gameScreen = gameScreen;
    this.imageSrc = imgSrc;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);

    // Physics constants - these should remain frame-rate independent
    this.velocityY = 0;
    this.velocityX = 0;
    this.gravity = 600; // pixels per second squared (increased for proper scaling)
    this.jumpStrength = -400; // pixels per second (increased for proper scaling)
    this.moveSpeed = 240; // pixels per second (increased for proper scaling)
    this.isJumping = false;
    this.onGround = false;
  }

  handlePlatformCollision(platform) {
    this.top = platform.top - this.height;
    this.velocityY = 0;
    this.isJumping = false;
    this.onGround = true;
  }

  move(deltaTime) {
    // Apply gravity (frame-rate independent)
    this.velocityY += this.gravity * deltaTime;

    // Handle horizontal movement based on input direction
    if (this.directionX !== 0) {
      this.velocityX = this.directionX * this.moveSpeed;
    } else {
      // Apply friction when no input
      this.velocityX *= 0.8; // You can adjust this for different friction feel
    }

    // Update sprite based on movement state
    if (this.isJumping) {
      if (this.velocityX < 0) {
        this.imageSrc = "./images/player-left-jump.png";
      } else if (this.velocityX > 0) {
        this.imageSrc = "./images/player-right-jump.png";
      }
    } else {
      if (this.velocityX < 0) {
        this.imageSrc = "./images/player-left.png";
      } else if (this.velocityX > 0) {
        this.imageSrc = "./images/player-right.png";
      }
    }

    // Apply velocities with delta time scaling
    this.left += this.velocityX * deltaTime;
    this.top += this.velocityY * deltaTime;

    // Ground collision (simple floor check)
    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
      this.onGround = true;
    }

    // Keep player within screen bounds
    this.left = Math.max(30, Math.min(this.gameScreen.offsetWidth - this.width - 30, this.left));

    this.updatePosition();
  }

  jump() {
    if (!this.isJumping && this.onGround) {
      this.velocityY = this.jumpStrength;
      this.isJumping = true;
      this.onGround = false;
    }
  }

  updatePosition() {
    this.element.src = this.imageSrc;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  isCollidingWith(platform) {
    let playerLeft = this.left;
    let playerRight = this.left + this.width;
    let playerTop = this.top;
    let playerBottom = this.top + this.height;

    const platformLeft = platform.left;
    const platformRight = platform.left + platform.width;
    const platformTop = platform.top;
    const platformBottom = platform.top + platform.height;

    if (
      playerLeft < platformRight &&
      playerRight > platformLeft &&
      playerTop < platformBottom &&
      playerBottom > platformTop
    ) {
      const overlapLeft = playerRight - platformLeft;
      const overlapRight = platformRight - playerLeft;
      const overlapTop = playerBottom - platformTop;
      const overlapBottom = platformBottom - playerTop;

      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      if (minOverlap === overlapTop && this.velocityY > 0) {
        // Landing on top of platform
        this.top = platformTop - this.height;
        this.velocityY = 0;
        this.isJumping = false;
        this.onGround = true;
      } else if (minOverlap === overlapBottom && this.velocityY < 0) {
        // Hitting platform from below
        this.top = platformBottom;
        this.velocityY = 0;
      } else if (minOverlap === overlapLeft) {
        // Hitting from the right
        this.left = platformLeft - this.width;
        this.velocityX = 0;
      } else if (minOverlap === overlapRight) {
        // Hitting from the left
        this.left = platformRight;
        this.velocityX = 0;
      }
      
      return true;
    }
    return false;
  }
}