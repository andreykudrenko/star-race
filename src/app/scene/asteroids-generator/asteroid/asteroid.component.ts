import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Asteroid} from "./asteroid.model";
import {GameStatus, Scene, SceneService} from "../../scene.service";
import {interval, Subscription} from "rxjs";
import {AsteroidService} from "./asteroid.service";
import {Coords} from "../../scene.component";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit, OnDestroy {
  @Input() id;
  scene: Scene;
  asteroid: Asteroid;
  startPos: Coords;
  intervalMotionSub: Subscription;
  sceneSub: Subscription;

  constructor(
    private asteroidService: AsteroidService,
    private sceneService: SceneService,
  ) {}

  ngOnInit() {
    this.scene = this.sceneService.getSceneSize();
    this.sceneSub = this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Run) {
        this.startAsteroid();
      } else {
        this.stopAsteroid();
      }
    });
    this.initAsteroid();
  }

  ngOnDestroy() {
    this.stopAsteroid();
    this.sceneSub.unsubscribe();
  }

  initAsteroid() {
    const sizeLevel = this.randomMinMaxInteger(2,4);
    this.startPos = this.getStartAsteroidPosition();
    const size = sizeLevel * 15;
    this.asteroid = new Asteroid(this.id, this.startPos.x, this.startPos.y, size);
    this.asteroidService.addAsteroid(this.asteroid);
    this.startAsteroid();
  }

  startAsteroid() {
    const speedLevel = this.randomMinMaxInteger(1,4);
    const intervalMotion = interval(speedLevel * 5);
    const moveCoord: Coords = this.generateAsteroidSpawnPlace();

    this.intervalMotionSub = intervalMotion.subscribe(() => {
      this.asteroid.changePositionX(this.asteroid.positionX + moveCoord.x);
      this.asteroid.changePositionY(this.asteroid.positionY + moveCoord.y);
      this.asteroidService.updateAsteroid(this.asteroid);

      if (this.asteroid.positionY < -200
      || this.asteroid.positionY > this.scene.height + 200
      || this.asteroid.positionX > this.scene.width + 200
      || this.asteroid.positionX < -200) {
        this.asteroidService.deleteAsteroid(this.id);
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

  private getStartAsteroidPosition(): Coords {
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
}
