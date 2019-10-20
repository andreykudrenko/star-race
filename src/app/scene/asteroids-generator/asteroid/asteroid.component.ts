import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {SpaceshipService} from "../../spaceship/spaceship.service";
import {Asteroid} from "./asteroid.model";
import {Spaceship} from "../../spaceship/spaceship.model";
import {GameStatus, Scene, SceneService} from "../../scene.service";

interface ElementPosition {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
}

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit {
  @Output() deleteAsteroid = new EventEmitter();
  scene: Scene;
  asteroid: Asteroid;
  spaceship: Spaceship;
  interval: any;

  constructor(
    private spaceshipService: SpaceshipService,
    private sceneService: SceneService
  ) {}

  ngOnInit() {
    this.initAsteroid();
    this.scene = this.sceneService.getSceneSize();
    this.spaceship = this.spaceshipService.getSpaceship();
    this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Run) {
        this.startAsteroid();
      } else {
        this.stopAsteroid();
      }
    });
    this.sceneService.gameRestart.subscribe(() => this.initAsteroid());
  }

  initAsteroid() {
    const startPos = -100;
    const size = 30;
    const initPositionX = 550 * Math.random();
    this.asteroid = new Asteroid(initPositionX, startPos, size);
    this.startAsteroid();
  }

  startAsteroid() {
    this.interval = setInterval(() => {
      this.asteroid.positionY += 1;
      this.checkIfAsteroidHitsSpaceship();
      if (this.scene.height - this.asteroid.positionY < -this.asteroid.size) {
        this.deleteAsteroid.emit();
        this.stopAsteroid();
      }
    }, 10);
  }

  stopAsteroid() {
    clearInterval(this.interval);
  }

  checkIfAsteroidHitsSpaceship() {
    const spaceshipBodyCoords: ElementPosition = {
      fromX: this.spaceship.positionX + 36,
      toX: this.spaceship.positionX + 64,
      fromY: this.spaceship.positionY + this.spaceship.size - 28,
      toY: this.spaceship.positionY
    };

    const spaceshipWingsCoords: ElementPosition = {
      fromX: this.spaceship.positionX,
      toX: this.spaceship.positionX + this.spaceship.size,
      fromY: this.spaceship.positionY + 30,
      toY: this.spaceship.positionY + 15
    };

    const spaceshipBowCoords: ElementPosition = {
      fromX: this.spaceship.positionX + 45,
      toX: this.spaceship.positionX + 55,
      fromY: this.spaceship.positionY + this.spaceship.size,
      toY: this.spaceship.positionY + this.spaceship.size - 28
    };

    const asteroidCoords: ElementPosition = {
      fromX: this.asteroid.positionX,
      toX: this.asteroid.positionX + this.asteroid.size,
      fromY: this.scene.height - this.asteroid.positionY,
      toY: this.scene.height - this.asteroid.positionY - this.asteroid.size
    };

    if (
      (this.checkIntersectionOfElements(spaceshipBodyCoords, asteroidCoords)
        || this.checkIntersectionOfElements(spaceshipWingsCoords, asteroidCoords)
        || this.checkIntersectionOfElements(spaceshipBowCoords, asteroidCoords))
      && this.spaceship.isDamaged === false) {
      this.spaceshipService.setDamage();
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
