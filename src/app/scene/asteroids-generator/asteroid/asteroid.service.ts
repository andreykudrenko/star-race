import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Asteroid} from "./asteroid.model";

@Injectable()
export class AsteroidService {
  asteroids: Asteroid[] = [];
  asteroidsChanges = new Subject<Asteroid[]>();
  deleteAsteroidEvent = new Subject<number>();

  addAsteroid(asteroid: Asteroid) {
    this.asteroids.push(asteroid);
    this.asteroidsChanges.next(this.asteroids);
  }

  updateAsteroid(searchedAsteroid: Asteroid) {
    this.asteroids = this.asteroids.map((currentAsteroid: Asteroid) => {
      return searchedAsteroid.id === currentAsteroid.id ? searchedAsteroid : currentAsteroid;
    });
    this.asteroidsChanges.next(this.asteroids);
  }

  deleteAsteroid(id) {
    this.deleteAsteroidEvent.next(id);
    this.asteroids = this.asteroids.reduce((acc, asteroid) => {
      if (asteroid.id !== id) {
        acc.push(asteroid)
      }
      return acc;
    }, []);
    this.asteroidsChanges.next(this.asteroids);
  }

  clearAsteroids() {
    this.asteroids = [];
    this.asteroidsChanges.next(this.asteroids);
  }
}
