import {Injectable} from "@angular/core";
import {Blaster} from "./spaceship/blaster/blaster.model";
import {SpaceshipService} from "./spaceship/spaceship.service";
import {BlasterService} from "./spaceship/blaster/blaster.service";
import {SceneService} from "./scene.service";
import {Asteroid} from "./asteroids-generator/asteroid/asteroid.model";
import {AsteroidService} from "./asteroids-generator/asteroid/asteroid.service";
import {ScoreService} from "./score/score.service";
import {Subscription} from "rxjs";


interface ElementPosition {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
}

@Injectable()
export class PhysicsService {
  asteroidChangesSub: Subscription;

  constructor(
    private spaceshipService: SpaceshipService,
    private blasterService: BlasterService,
    private sceneService: SceneService,
    private scoreService: ScoreService,
    private asteroidService: AsteroidService,
  ) {}

  initGamePhysics() {
    this.asteroidChangesSub = this.asteroidService.asteroidsChanges.subscribe((asteroids: Asteroid[]) => {
      asteroids.forEach(asteroid => {
        this.checkIfAsteroidHitsSpaceship(asteroid);
      })
    });
  }

  destroyGamePhysics() {
    this.asteroidChangesSub.unsubscribe();
  }

  checkIfAsteroidHitsSpaceship(asteroid: Asteroid) {
    const scene = this.sceneService.getSceneSize();
    const blastersPos = this.blasterService.getBlasters();
    const spaceshipCoords = this.spaceshipService.getSpaceshipCoords();
    const spaceshipSize = this.spaceshipService.getSpaceshipSize();

    const spaceshipBodyCoords: ElementPosition = {
      fromX: spaceshipCoords.x,
      toX: spaceshipCoords.x + spaceshipSize - 28,
      fromY: spaceshipCoords.y + 36,
      toY: spaceshipCoords.y + 64
    };

    const spaceshipWingsCoords: ElementPosition = {
      fromX: spaceshipCoords.x + 15,
      toX: spaceshipCoords.x + 30,
      fromY: spaceshipCoords.y,
      toY: spaceshipCoords.y + spaceshipSize
    };

    const spaceshipBowCoords: ElementPosition = {
      fromX: spaceshipCoords.x + spaceshipSize - 28,
      toX: spaceshipCoords.x + spaceshipSize,
      fromY: spaceshipCoords.y + 45,
      toY: spaceshipCoords.y + 55
    };

    const asteroidCoords: ElementPosition = {
      fromX: asteroid.positionX,
      toX: asteroid.positionX + asteroid.size,
      fromY: scene.height - asteroid.positionY,
      toY: scene.height - asteroid.positionY - asteroid.size
    };

    if (blastersPos && blastersPos.length > 0) {
      blastersPos.forEach((blaster: Blaster) => {
        const blasterCoords: ElementPosition = {
          fromX: blaster.x,
          toX: blaster.x + 10,
          fromY: blaster.y,
          toY: blaster.y - 2
        };
        if (this.checkIntersectionOfElements(blasterCoords, asteroidCoords)) {
          this.asteroidService.deleteAsteroid(asteroid.id);
          this.blasterService.deleteBlaster(blaster.id);
          this.scoreService.addScore(asteroid.size);
        }
      });
    }

    if (
      (this.checkIntersectionOfElements(spaceshipBodyCoords, asteroidCoords)
        || this.checkIntersectionOfElements(spaceshipWingsCoords, asteroidCoords)
        || this.checkIntersectionOfElements(spaceshipBowCoords, asteroidCoords))
      && this.spaceshipService.getSpaceshipStatus() === false) {
      console.log(asteroidCoords);
      this.spaceshipService.setDamage();
      this.sceneService.gameOver();
    }
  }

  checkIntersectionOfElements(firstEl: ElementPosition, secondEl: ElementPosition): boolean {
    return (
      (
        (firstEl.fromX < secondEl.fromX && firstEl.toX > secondEl.fromX)
        || (firstEl.fromX < secondEl.toX && firstEl.toX > secondEl.toX)
        || (firstEl.fromX > secondEl.fromX && firstEl.fromX < secondEl.toX)
        || (firstEl.toX > secondEl.fromX && firstEl.toX < secondEl.toX)
      )
      &&
      (
        (firstEl.toY < secondEl.fromY && firstEl.toY > secondEl.toY)
        || (firstEl.fromY > secondEl.fromY && firstEl.toY < secondEl.toY)
        || (firstEl.fromY < secondEl.fromY && firstEl.fromY >secondEl.toY)
        || (firstEl.fromY < secondEl.fromY && firstEl.toY > secondEl.toY)
      )
    )
  }
}
