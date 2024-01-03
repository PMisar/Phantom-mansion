// platform.js
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