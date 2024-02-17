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
    this.imageSrc = imgSrc; // player facing left image
    this.element = document.createElement("img"); //HTML image element
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);

    //jump related properties
    this.velocityY = 0; // initial vertical velocity
    this.gravity = 0.3; // gravity strength
    this.jumpStrength = -8; // initial jump velocity (negative for upward movement)
    this.isJumping = false;
  }

  handlePlatformCollision(platform) {
    this.top = platform.top - this.height;
    this.velocityY = 5;
    this.isJumping = false;
  }
  // TEST CODE
  decelerateX(direction) {
    const deceleration = 0.2;
    const oppositeDirection = (direction === "left") ? "right" : "left";

    if (this.directionX !== 0 && this.directionX !== this.getDirectionMultiplier(direction)) {
      this.directionX -= deceleration * this.getDirectionMultiplier(oppositeDirection);
    } else {
      this.directionX = 0;
    }
  }

  getDirectionMultiplier(direction) {
    return (direction === "left") ? -1 : 1;
  }
  // TEST CODE END

  move() {
    this.velocityY += this.gravity;  // to apply gravity

    if (this.isJumping) {
      if (this.directionX < 0) {
        this.imageSrc = "./images/player-left-jump.png"; // jumping left image source
      } else if (this.directionX > 0) {
        this.imageSrc = "./images/player-right-jump.png"; // jumping right image source
      }
    } else {
      if (this.directionX < 0) {
        this.imageSrc = "./images/player-left.png"; // left-facing image source
      } else if (this.directionX > 0) {
        this.imageSrc = "./images/player-right.png"; // right-facing image source
      }
    }

    this.top += this.velocityY; // to update vertical position based on velocity

    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    this.left += this.directionX;
    this.top += this.directionY;
    // game screen borders
    this.left = Math.max(30, Math.min(this.gameScreen.offsetWidth - this.width - 30, this.left)); // game screen borders to keep the player inside
    this.top = Math.min(this.gameScreen.offsetHeight - this.height - 20, this.top);

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

    // to check if there's a collision
    if (
      playerLeft < platformRight &&
      playerRight > platformLeft &&
      playerTop < platformBottom &&
      playerBottom > platformTop
    ) {
      // to calculate the overlap in each direction
      const overlapLeft = playerRight - platformLeft;
      const overlapRight = platformRight - playerLeft;
      const overlapTop = playerBottom - platformTop;
      const overlapBottom = platformBottom - playerTop;

      // to find the direction with the smallest overlap
      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      // adjusting the player's position based on the direction with the smallest overlap
      if (minOverlap === overlapLeft) {
        this.left -= overlapLeft;
        if (this.velocityY > 0) {
          this.velocityY = 0; // to stop vertical movement when hitting from the left
          this.isJumping = false; // reset jump state
        }
      } else if (minOverlap === overlapRight) {
        this.left += overlapRight;
        if (this.velocityY > 0) {
          this.velocityY = 0; // to stop vertical movement when hitting from the right
          this.isJumping = false;
        }
      } else if (minOverlap === overlapTop) {
        this.top -= overlapTop;
        if (this.velocityY > 0) {
          this.velocityY = 0; // to stop vertical movement when hitting from the top
          this.isJumping = false;
        }
      } else if (minOverlap === overlapBottom) {
        this.top += overlapBottom;
        if (this.velocityY > 0) {
          this.velocityY = 0; // to stop vertical movement when hitting from the bottom
          this.isJumping = false;
        }
      }
      return true;
    }
    return false;
  }
}