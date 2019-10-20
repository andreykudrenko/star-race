import {HostListener, Injectable} from "@angular/core";
import {Subject} from "rxjs";

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
      width: 600,
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









  // getGameStatus() {
  //   return this.gameStatus;
  // }
  //
  // getScreenHeight() {
  //   return this.screenHeight;
  // }
  //
  // gameOver() {
  //   this.gameStatusChanges.next(GameStatus.Over);
  //   this.gameStatus = GameStatus.Over;
  //   this.isGameOver = true;
  // }
  //
  // pauseGame() {
  //   if (!this.isGameOver) {
  //     this.gameStatusChanges.next(GameStatus.Pause);
  //     this.gameStatus = GameStatus.Pause;
  //   }
  // }
  //
  // startGame() {
  //   if (!this.isGameOver) {
  //     this.gameStatusChanges.next(GameStatus.Run);
  //     this.gameStatus = GameStatus.Run;
  //   }
  // }
}
