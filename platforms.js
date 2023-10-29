class Platform 
{
  constructor(gameScreen, left, top, width, height) 
  {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.gameScreen = gameScreen;
    this.element = document.createElement("div");

    this.element.classList.add("platform"); 

    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }
}

function createPlatforms(gameScreen) 
{
  const platforms = [];

  // platforms position (top left corner starting at 0)
  // left = direction  
  // top = direction Y
  const platformPositions = [
    { left: 600, top: 600 },
    { left: 700, top: 400 },
    { left: 100, top: 200 },
    { left: 500, top: 100 },
    { left: 100, top: 500 },
    { left: 500, top: 300 },
    { left: 600, top: 500 },
    { left: 700, top: 200 },
    { left: 400, top: 200 },
    { left: 300, top: 300 },
  ];

  platformPositions.forEach((position) => {
    platforms.push(new Platform(gameScreen, position.left, position.top, 100, 28));
  });
  return platforms;
}

const platforms = createPlatforms(document.querySelector("#game-screen"));
