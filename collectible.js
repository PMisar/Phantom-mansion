class Collectible {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
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
    }
}