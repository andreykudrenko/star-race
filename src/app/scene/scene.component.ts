import {Component, OnDestroy, OnInit} from "@angular/core";
import {GameStatus, SceneService} from "./scene.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, OnDestroy {
  bgPosition = 0;
  interval: any;
  gameStatusSub: Subscription;
  isGameOver = false;
  isGamePause = false;

  constructor(private sceneService: SceneService) {}

  ngOnInit() {
    this.startMoveBg();
    this.gameStatusSub = this.sceneService.gameStatusChanges.subscribe((status: GameStatus) => {
      this.checkStatus(status);
    });
  }

  checkStatus(status: GameStatus) {
    switch (status) {
      case GameStatus.Over:
        this.isGameOver = true;
        this.isGamePause = false;
        this.stopMoveBg();
        break;
      case GameStatus.Pause:
        this.isGameOver = false;
        this.isGamePause = true;
        this.stopMoveBg();
        break;
      case GameStatus.Run:
        this.isGameOver = false;
        this.isGamePause = false;
        this.startMoveBg();
        break;
      default: return;
    }
  }

  startMoveBg() {
    this.interval = setInterval(() => {
      this.bgPosition += 1;
    },50);
  }

  stopMoveBg() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.gameStatusSub.unsubscribe();
  }
}
