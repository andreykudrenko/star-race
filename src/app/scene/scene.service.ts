import {HostListener, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Blaster} from "./spaceship/blaster/blaster.model";
import {SpaceshipService} from "./spaceship/spaceship.service";
import {Coords} from "./asteroids-generator/asteroid/asteroid.component";
import {BlasterService} from "./spaceship/blaster/blaster.service";

export enum GameStatus {
  Run = 'run',
  Stop = 'stop',
  GameOver = 'over',
}

export interface Scene {
  width: number;
  height: number;
}

@Injectable()
export class SceneService {
  scene: Scene = null;
  gameStatusChanges = new Subject<GameStatus>();
  gameRestart = new Subject();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.scene = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  constructor() {
    this.onResize();
  }

  getSceneSize(): Scene {
    return this.scene;
  }

  startGame() {
    this.gameStatusChanges.next(GameStatus.Run);
  }

  stopGame() {
    this.gameStatusChanges.next(GameStatus.Stop);
  }

  gameOver() {
    this.gameStatusChanges.next(GameStatus.GameOver);
  }

  restartGame() {
    this.gameStatusChanges.next(GameStatus.Run);
    this.gameRestart.next();
  }
}
