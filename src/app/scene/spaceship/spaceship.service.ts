import {Spaceship} from "./spaceship.model";
import {SceneService} from "../scene.service";
import {Coords} from "../asteroids-generator/asteroid/asteroid.component";

export class SpaceshipService {
  spaceship: Spaceship;

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

  getSpaceshipCoords(): Coords {
    return {
      x: this.spaceship.positionX,
      y: this.spaceship.positionY,
    }
  }

  getSpaceshipSize(): number {
    return this.spaceship.size;
  }

  getSpaceshipStatus(): boolean {
    return this.spaceship.isDamaged;
  }
}
