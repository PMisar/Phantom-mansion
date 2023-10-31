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
  // left = direction X 
  // top = direction Y
  const platformPositions = [
    { left: 600, top: 600 },
    { left: 700, top: 400 },
    { left: 100, top: 200 },
    { left: 500, top: 100 },
    { left: 100, top: 500 },
    { left: 500, top: 300 },
    { left: 700, top: 200 },
    { left: 300, top: 300 },
  ];

  platformPositions.forEach((position) => {
    platforms.push(new Platform(gameScreen, position.left, position.top, 100, 25));
  });
  return platforms;
}

const platforms = createPlatforms(document.querySelector("#game-screen"));


// function createPlatforms(gameScreen, currentLevel) {
//   const platforms = [];

//   const platformPositions = [
//     // Level 0 platform positions
//     [
//           { left: 600, top: 600 },
//     { left: 700, top: 400 },
//     { left: 100, top: 200 },
//     { left: 500, top: 100 },
//     { left: 100, top: 500 },
//     { left: 500, top: 300 },
//     { left: 700, top: 200 },
//     { left: 300, top: 300 },
//     ],
//     // Level 1 platform positions
//     [
//       { left: 300, top: 600 },
//       { left: 400, top: 400 },
//       { left: 200, top: 200 },
//       { left: 600, top: 100 },
//     ],
//     // Level 2 platform positions
//     [
//       { left: 500, top: 600 },
//       { left: 200, top: 400 },
//       { left: 400, top: 200 },
//       { left: 700, top: 100 },
//     ],
//     // Level 3 platform positions
//     [
//       { left: 200, top: 600 },
//       { left: 600, top: 400 },
//       { left: 500, top: 200 },
//       { left: 100, top: 100 },
//     ],
//   ];

//   const selectedPositions = platformPositions[currentLevel] || []; // Use level-specific positions

//   selectedPositions.forEach((position) => {
//     platforms.push(new Platform(gameScreen, position.left, position.top, 100, 25));
//   });

//   return platforms;
// }

