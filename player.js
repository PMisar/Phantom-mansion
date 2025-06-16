// player.js 
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

    this.velocityY = 0;
    this.gravity = 0.4;
    this.jumpStrength = -10;
    this.isJumping = false;

    // Fixed: Use pixels per second instead of pixels per frame
    this.moveSpeed = 240; // pixels per second (equivalent to 4 pixels at 60fps)
  }

  handlePlatformCollision(platform) {
    this.top = platform.top - this.height;
    this.velocityY = 0;
    this.isJumping = false;
  }

  move(deltaTime) {
    // Fixed: Use actual deltaTime for all movement calculations
    const dt = deltaTime || (1 / 60); // Fallback to 60fps if deltaTime is 0

    this.velocityY += this.gravity;

    if (this.isJumping) {
      if (this.directionX < 0) {
        this.imageSrc = "./images/player-left-jump.png";
      } else if (this.directionX > 0) {
        this.imageSrc = "./images/player-right-jump.png";
      }
    } else {
      if (this.directionX < 0) {
        this.imageSrc = "./images/player-left.png";
      } else if (this.directionX > 0) {
        this.imageSrc = "./images/player-right.png";
      }
    }

    // Fixed: Apply gravity with deltaTime
    this.top += this.velocityY * dt * 60; // Scale gravity for consistent feel

    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // Fixed: Use moveSpeed with deltaTime for horizontal movement
    this.left += this.directionX * this.moveSpeed * dt;

    // Boundary checking
    this.left = Math.max(20, Math.min(this.gameScreen.offsetWidth - this.width - 20, this.left));

    this.updatePosition();
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

      if (minOverlap === overlapLeft) {
        this.left -= overlapLeft;
        if (this.velocityY > 0) {
          this.velocityY = 0;
          this.isJumping = false;
        }
      } else if (minOverlap === overlapRight) {
        this.left += overlapRight;
        if (this.velocityY > 0) {
          this.velocityY = 0;
          this.isJumping = false;
        }
      } else if (minOverlap === overlapTop) {
        this.top -= overlapTop;
        if (this.velocityY > 0) {
          this.velocityY = 0;
          this.isJumping = false;
        }
      } else if (minOverlap === overlapBottom) {
        this.top += overlapBottom;
        if (this.velocityY < 0) {
          this.velocityY = 0;
        }
      }
      return true;
    }
    return false;
  }
}