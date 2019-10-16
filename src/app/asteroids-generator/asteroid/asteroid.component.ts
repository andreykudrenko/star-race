import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {SpaceshipService} from "../../spaceship/spaceship.service";
import {Subscription} from "rxjs";
import {Asteroid} from "./asteroid.model";
import {Spaceship} from "../../spaceship/spaceship.model";
import {GameStatus, SceneService} from "../../scene/scene.service";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit, OnDestroy {
  @Output() deleteAsteroid = new EventEmitter();
  interval: any;
  asteroid: Asteroid;
  spaceship: Spaceship;
  screenHeight: number;
  subscriptions: Subscription[] = [];

  constructor(
    private spaceshipService: SpaceshipService,
    private sceneService: SceneService
  ) {}

  ngOnInit() {
    this.initAsteroid();
    this.spaceship = this.spaceshipService.getSpaceship();
    this.screenHeight = this.sceneService.getScreenHeight();
    this.initSubscriptions();
  }

  initSubscriptions() {
    const spaceShipSub = this.spaceshipService.spaceShipChanges.subscribe(spaceship => {
      this.spaceship = spaceship;
    });
    const gameStatusSub = this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Pause || status === GameStatus.Over) {
        this.stopAsteroid();
      } else {
       this.startAsteroid();
      }
    });
    const screenHeightSub = this.sceneService.screenHeightChanges.subscribe(screenHeight => {
      this.screenHeight = screenHeight;
    });
    this.subscriptions.push(spaceShipSub, gameStatusSub, screenHeightSub);
  }

  initAsteroid() {
    const initPositionX = 550 * Math.random();
    this.asteroid = new Asteroid(initPositionX, -100, 50);
    this.startAsteroid();
  }

  startAsteroid() {
    this.interval = setInterval(() => {
      this.moveAsteroid();
    }, 10);
  }

  stopAsteroid() {
    clearInterval(this.interval);
  }

  moveAsteroid() {
    this.asteroid.positionY += 1;
    this.doesAsteroidHitSpaceship();
    if (this.screenHeight - this.asteroid.positionY < -this.asteroid.size) {
      this.deleteAsteroid.emit();
      this.stopAsteroid();
    }
  }

  doesAsteroidHitSpaceship() {
    // Y cord
    const spaceshpFromY = this.spaceship.positionY + this.spaceship.size;
    const spaceshpToY = this.spaceship.positionY;
    const asteroidFromY = this.screenHeight - this.asteroid.positionY;
    const asteroidToY = asteroidFromY - this.asteroid.size;
    // X cord
    const spaceshpFromX = this.spaceship.positionX;
    const spaceshpToX = this.spaceship.positionX + this.spaceship.size;
    const asteroidFromX = this.asteroid.positionX;
    const asteroidToX = this.asteroid.positionX + this.asteroid.size;

    if (((asteroidFromX > spaceshpFromX && asteroidFromX < spaceshpToX) || (asteroidToX < spaceshpToX && asteroidToX > spaceshpFromX))
      && ((asteroidFromY < spaceshpFromY && asteroidFromY > spaceshpToY) || (asteroidToY > spaceshpToY && asteroidToY < spaceshpFromY))) {
        if (this.spaceship.isDamaged === false) {
          this.spaceshipService.setDamage();
        }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
