class Player 
{
  constructor(gameScreen, left, top, width, height, imgSrc) 
  {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.gameScreen = gameScreen;
    this.imageSrc = imgSrc; // player facing left image
    this.element = document.createElement("img");
    
    // this.element.id = "player"; // line for levitating if needed

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
    //jumping
    this.velocityY = 3; // initial vertical velocity
    this.gravity = 0.3; // gravity strength
    this.jumpStrength = -6; // initial jump velocity (negative for upward movement)
    this.isJumping = false;
  }

  move() 
  {
    //jumping
    this.velocityY += this.gravity;
    this.top += this.velocityY;

    if (this.top > this.gameScreen.offsetHeight - this.height) {
      this.top = this.gameScreen.offsetHeight - this.height;
      this.velocityY = 0;
      this.isJumping = false;
    }

    this.left += this.directionX;
    this.top += this.directionY;

    //added to change levels
    // this.element.style.left = `${this.posX}px`;
    // this.element.style.top = `${this.posY}px`;

    if (this.directionX < 0) 
    {
      this.imageSrc = "./images/player-left.png"; // left-facing image source
    } else if (this.directionX > 0) 
    {
      this.imageSrc = "./images/player-right.png"; // right-facing image source
    }

    this.left = Math.max(10, Math.min(this.gameScreen.offsetWidth - this.width - 10, this.left));
    // this.top = Math.max(10, Math.min(this.gameScreen.offsetHeight - this.height - 10, this.top)); //for border at the top
    this.top = Math.min(this.gameScreen.offsetHeight - this.height - 0, this.top);

    this.updatePosition();
  }

  //added to change levels
  // setPosition(x, y) {
  //   this.posX = x;
  //   this.posY = y;
  //   this.element.style.left = `${this.posX}px`;
  //   this.element.style.top = `${this.posY}px`;
  // }

  updatePosition() 
  {
    this.element.src = this.imageSrc; // player facing left image
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  // isCollidingWith(platform) 
  // {
  //   // Calculate the edges of the player and the platform
  //   const playerLeft = this.left;
  //   const playerRight = this.left + this.width;
  //   const playerTop = this.top;
  //   const playerBottom = this.top + this.height;

  //   const platformLeft = platform.left;
  //   const platformRight = platform.left + platform.width;
  //   const platformTop = platform.top;
  //   const platformBottom = platform.top + platform.height;

  //   // Check for collision
  //   return (
  //     playerRight > platformLeft &&
  //     playerLeft < platformRight &&
  //     playerBottom > platformTop &&
  //     playerTop < platformBottom
  //   );
  // }

}
