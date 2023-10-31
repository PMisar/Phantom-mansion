class Platform {
  constructor(gameScreen, left, top, width, height) {
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
// function createPlatforms(gameScreen, level) {
//   const platforms = [];
  
//   let platformPositions;

//   // Define platform positions for each level
//   if (level === 0) {
//     platformPositions = [
//       { left: 600, top: 600 },
//       { left: 700, top: 400 },
//       { left: 100, top: 200 },
//       // ... Define platform positions for level 0
//     ];
//   } else if (level === 1) {
//     platformPositions = [
//       { left: 200, top: 600 },
//       { left: 300, top: 400 },
//       { left: 100, top: 200 },
//       // ... Define platform positions for level 1
//     ];
//   } else if (level === 2) {
//     platformPositions = [
//       { left: 800, top: 600 },
//       { left: 600, top: 400 },
//       { left: 200, top: 200 },
//       // ... Define platform positions for level 2
//     ];
//   } else if (level === 3) {
//     platformPositions = [
//       { left: 400, top: 600 },
//       { left: 300, top: 400 },
//       { left: 800, top: 200 },
//       // ... Define platform positions for level 3
//     ];
//   }

//   platformPositions.forEach((position) => {
//     platforms.push(new Platform(gameScreen, position.left, position.top, 100, 25));
//   });

//   return platforms;
// }