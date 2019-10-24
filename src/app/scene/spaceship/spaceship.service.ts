import {Spaceship} from "./spaceship.model";
import {SceneService} from "../scene.service";

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
}
