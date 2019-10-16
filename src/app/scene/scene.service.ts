import {HostListener, Injectable} from "@angular/core";
import {Subject} from "rxjs";

export enum GameStatus {
  Run = 'run',
  Over = 'over',
  Pause = 'pause'
}

@Injectable()
export class SceneService {
  private gameStatus: GameStatus;
  gameStatusChanges = new Subject<GameStatus>();
  screenHeightChanges = new Subject<number>();
  screenHeight: number;
  private isGameOver = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenHeightChanges.next(window.innerHeight);
  }

  constructor() {
    this.onResize();
    window.addEventListener('focus', event => {
      this.startGame();
    });
    window.addEventListener('blur', event => {
      this.pauseGame();
    });
  }

  getScreenHeight() {
    return this.screenHeight;
  }

  gameOver() {
    this.gameStatusChanges.next(GameStatus.Over);
    this.gameStatus = GameStatus.Over;
    this.isGameOver = true;
  }

  pauseGame() {
    if (!this.isGameOver) {
      this.gameStatusChanges.next(GameStatus.Pause);
      this.gameStatus = GameStatus.Pause;
    }
  }

  startGame() {
    if (!this.isGameOver) {
      this.gameStatusChanges.next(GameStatus.Run);
      this.gameStatus = GameStatus.Run;
    }
  }
}
