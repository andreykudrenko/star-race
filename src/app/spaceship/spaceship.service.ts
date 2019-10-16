import {Spaceship} from "./spaceship.model";
import {Subject} from "rxjs";
import {SceneService} from "../scene/scene.service";

export class SpaceshipService {
  spaceShipChanges = new Subject<Spaceship>();
  spaceship: Spaceship = null;

  constructor(private sceneService: SceneService) {}

  updateSpaceship(spaceship) {
    this.spaceship = spaceship;
    this.spaceShipChanges.next(spaceship);
  }

  setDamage() {
    console.log('damaged!');
    this.spaceship.isDamaged = true;
    this.spaceShipChanges.next(this.spaceship);
    this.sceneService.gameOver();
  }

  getSpaceship() {
    return this.spaceship;
  }
}
