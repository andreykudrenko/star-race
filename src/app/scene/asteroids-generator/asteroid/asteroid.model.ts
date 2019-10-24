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
}
