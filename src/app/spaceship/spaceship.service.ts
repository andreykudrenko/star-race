import {Spaceship} from "./spaceship.model";
import {Subject} from "rxjs";

export class SpaceshipService {
  spaceShipChanges = new Subject<Spaceship>();
  spaceship: Spaceship = null;

  updateSpaceship(spaceship) {
    this.spaceship = spaceship;
    this.spaceShipChanges.next(spaceship);
  }
}
