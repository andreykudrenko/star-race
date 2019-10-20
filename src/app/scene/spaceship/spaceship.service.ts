import {Spaceship} from "./spaceship.model";
import {Scene, SceneService} from "../scene.service";

export class SpaceshipService {
  spaceship: Spaceship;
  sceneSize: Scene;

  constructor(private sceneService: SceneService) {}

  setDamage() {
    this.spaceship.isDamaged = true;
    this.sceneService.gameOver();
  }

  setSpaceship(spaceship: Spaceship) {
    this.spaceship = spaceship;
  }

  getSpaceship() {
    return this.spaceship;
  }

  spaceshipControl(keyCode) {
    this.sceneSize = this.sceneService.getSceneSize();
    if (!this.spaceship.isDamaged) {
      switch (keyCode) {
        case 'KeyD':
          this.onMoveRight();
          break;
        case 'KeyS':
          this.onMoveBottom();
          break;
        case 'KeyA':
          this.onMoveLeft();
          break;
        case 'KeyW':
          this.onMoveTop();
          break;
        default:
          break;
      }
    }
  }

  onMoveRight() {
    if (this.spaceship.positionX >= this.sceneSize.width - this.spaceship.size) {
      this.spaceship.positionX = this.sceneSize.width - this.spaceship.size;
    } else {
      this.spaceship.positionX += this.spaceship.movingParam;
    }
  }

  onMoveLeft() {
    if (this.spaceship.positionX <= 0) {
      this.spaceship.positionX = 0;
    } else {
      this.spaceship.positionX -= this.spaceship.movingParam;
    }
  }

  onMoveTop() {
    if (this.spaceship.positionY >= this.sceneSize.height - this.spaceship.size) {
      this.spaceship.positionY = this.sceneSize.height - this.spaceship.size;
    } else {
      this.spaceship.positionY += this.spaceship.movingParam;
    }
  }

  onMoveBottom() {
    if (this.spaceship.positionY <= 0) {
      this.spaceship.positionY = 0;
    } else {
      this.spaceship.positionY -= this.spaceship.movingParam;
    }
  }
}
