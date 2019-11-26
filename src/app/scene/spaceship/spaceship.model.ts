export class Spaceship {
  positionX: number;
  positionY: number;
  isDamaged: boolean;
  movingParam: number;
  size: number;
  constructor(positionX: number, positionY: number, isDamaged: boolean, movingParam: number, size: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.isDamaged = isDamaged;
    this.movingParam = movingParam;
    this.size = size;
  }

  setDamage() {
    this.isDamaged = true;
  }

  changePositionX(x: number) {
    this.positionX = x;
  }

  changePositionY(y: number) {
    this.positionY = y;
  }
}
