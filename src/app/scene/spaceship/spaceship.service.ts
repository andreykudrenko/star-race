import {Spaceship} from "./spaceship.model";
import {Coords} from "../scene.component";

export class SpaceshipService {
  spaceship: Spaceship;

  setDamage() {
    this.spaceship.setDamage();
  }

  setSpaceship(spaceship: Spaceship) {
    this.spaceship = spaceship;
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
