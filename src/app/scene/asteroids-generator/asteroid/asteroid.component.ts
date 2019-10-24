import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SpaceshipService} from "../../spaceship/spaceship.service";
import {Asteroid} from "./asteroid.model";
import {Spaceship} from "../../spaceship/spaceship.model";
import {GameStatus, Scene, SceneService} from "../../scene.service";
import {interval, Subscription} from "rxjs";
import {BlasterService} from "../../spaceship/blaster/blaster.service";
import {Blaster} from "../../spaceship/blaster/blaster.model";

interface ElementPosition {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
}

export interface Coords {
  x: number;
  y: number;
}

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit {
  @Output() deleteAsteroid = new EventEmitter();
  @Input() id;
  scene: Scene;
  asteroid: Asteroid;
  spaceship: Spaceship;
  intervalMotionSub: Subscription;
  startPos: Coords;
  blastersPos: Blaster[] = [];

  constructor(
    private spaceshipService: SpaceshipService,
    private sceneService: SceneService,
    private blasterService: BlasterService,
  ) {}

  ngOnInit() {
    this.scene = this.sceneService.getSceneSize();
    this.spaceship = this.spaceshipService.getSpaceship();
    this.blastersPos = this.blasterService.getBlasters();
    this.blasterService.blasterChangesEvent.subscribe(blaster => {
      this.blastersPos = blaster;
    });
    this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Run) {
        this.startAsteroid();
      } else {
        this.stopAsteroid();
      }
    });
    this.initAsteroid();
  }

  initAsteroid() {
    const sizeLevel = this.randomMinMaxInteger(2,4);
    this.startPos = this.getAsteroidPosition();
    const size = sizeLevel * 15;
    this.asteroid = new Asteroid(this.startPos.x, this.startPos.y, size);
    this.startAsteroid();
  }

  startAsteroid() {
    const speedLevel = this.randomMinMaxInteger(1,4);
    const intervalMotion = interval(speedLevel * 5);
    const moveCoord: Coords = this.generateAsteroidSpawnPlace();

    this.intervalMotionSub = intervalMotion.subscribe(() => {
      this.asteroid.positionX += moveCoord.x;
      this.asteroid.positionY += moveCoord.y;

      this.checkIfAsteroidHitsSpaceship();
      if (this.asteroid.positionY < -200
      || this.asteroid.positionY > this.scene.height + 200
      || this.asteroid.positionX > this.scene.width + 200
      || this.asteroid.positionX < -200) {
        this.deleteAsteroid.emit(this.id);
        this.stopAsteroid();
      }
    });
  }

  stopAsteroid() {
    this.intervalMotionSub.unsubscribe();
  }

  generateAsteroidSpawnPlace(): Coords {
    let moveX;
    let moveY;

    if ((this.startPos.x < this.scene.width / 3)
      && (this.startPos.y < this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(1,2);
      moveY = this.randomMinMaxInteger(0,1);
    }

    if ((this.startPos.x > this.scene.width / 3)
      && (this.startPos.x < 2 * this.scene.width / 3)
      && (this.startPos.y < this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(-1,1);
      moveY = this.randomMinMaxInteger(0,1);
    }

    if ((this.startPos.x > 2 * this.scene.width / 3)
      && (this.startPos.y < this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(-2, -1);
      moveY = this.randomMinMaxInteger(0,1);
    }

    if ((this.startPos.x < this.scene.width / 3)
      && (this.startPos.y < 2 * this.scene.height / 3)
      && (this.startPos.y > this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(1,2);
      moveY = this.randomMinMaxInteger(-1,1);
    }

    if ((this.startPos.x > 2 * this.scene.width / 3)
      && (this.startPos.y < 2 * this.scene.height / 3)
      && (this.startPos.y > this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(-2, -1);
      moveY = this.randomMinMaxInteger(-1,1);
    }

    if ((this.startPos.x < this.scene.width / 3)
      && (this.startPos.y > 2 * this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(1,2);
      moveY = this.randomMinMaxInteger(-1,0);
    }

    if ((this.startPos.x > this.scene.width / 3)
      && (this.startPos.x < 2 * this.scene.width / 3)
      && (this.startPos.y > 2 * this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(-1,1);
      moveY = this.randomMinMaxInteger(-1, 0);
    }

    if ((this.startPos.x > 2 * this.scene.width / 3)
      && (this.startPos.y > 2 * this.scene.height / 3)) {
      moveX = this.randomMinMaxInteger(-2, -1);
      moveY = this.randomMinMaxInteger(-1,0);
    }

    return {x: moveX, y: moveY};
  }

  private randomMinMaxInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  private getAsteroidPosition(): Coords {
    const side = this.randomMinMaxInteger(1,4);
    switch (side) {
      case 1:
        return {
          x: this.scene.width + 100,
          y: this.randomMinMaxInteger(50, this.scene.height - 50)
        };
      case 2:
        return {
          x: - 100,
          y: this.randomMinMaxInteger(50, this.scene.height - 50)
        };
      case 3:
        return {
          x: this.randomMinMaxInteger(50, this.scene.width - 50),
          y: this.scene.height + 100
        };
      case 4:
        return {
          x: this.randomMinMaxInteger(50, this.scene.width - 50),
          y: - 100
        };
      default: break;
    }
  }

  checkIfAsteroidHitsSpaceship() {
    const spaceshipBodyCoords: ElementPosition = {
      fromX: this.spaceship.positionX,
      toX: this.spaceship.positionX + this.spaceship.size - 28,
      fromY: this.spaceship.positionY + 36,
      toY: this.spaceship.positionY + 64
    };

    const spaceshipWingsCoords: ElementPosition = {
      fromX: this.spaceship.positionX + 15,
      toX: this.spaceship.positionX + 30,
      fromY: this.spaceship.positionY,
      toY: this.spaceship.positionY + this.spaceship.size
    };

    const spaceshipBowCoords: ElementPosition = {
      fromX: this.spaceship.positionX + this.spaceship.size - 28,
      toX: this.spaceship.positionX + this.spaceship.size,
      fromY: this.spaceship.positionY + 45,
      toY: this.spaceship.positionY + 55
    };

    const asteroidCoords: ElementPosition = {
      fromX: this.asteroid.positionX,
      toX: this.asteroid.positionX + this.asteroid.size,
      fromY: this.scene.height - this.asteroid.positionY,
      toY: this.scene.height - this.asteroid.positionY - this.asteroid.size
    };

    if (this.blastersPos && this.blastersPos.length > 0) {
      this.blastersPos.forEach((blaster: Blaster) => {
        const blasterCoords: ElementPosition = {
          fromX: blaster.x,
          toX: blaster.x + 10,
          fromY: blaster.y,
          toY: blaster.y - 2
        };
        if (this.checkIntersectionOfElements(blasterCoords, asteroidCoords)) {
          this.deleteAsteroid.emit(this.id);
          this.stopAsteroid();
          this.blasterService.deleteBlaster(blaster.id);
          this.blastersPos = this.blasterService.getBlasters();
        }
      });
    }

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
