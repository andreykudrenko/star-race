export class Asteroid {
  id: number;
  positionX: number;
  positionY: number;
  size: number;
  constructor(id: number, positionX: number, positionY: number, size: number) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
  }

  changePositionX(x: number) {
    this.positionX = x;
  }

  changePositionY(y: number) {
    this.positionY = y;
  }
}
