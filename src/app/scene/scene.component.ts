import {Component, OnDestroy, OnInit} from "@angular/core";
import {GameStatus, SceneService} from "./scene.service";
import {Subscription} from "rxjs";
import {ScoreService} from "./score/score.service";
import {PhysicsService} from "./physics.service";

export interface Coords {
  x: number;
  y: number;
}

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
  score: number = 0;
  isTutorialShown = true;

  constructor(
    private sceneService: SceneService,
    private physicsService: PhysicsService,
    private scoreService: ScoreService) {}

  ngOnInit() {
    this.physicsService.initGamePhysics();
    this.gameStatusSub = this.sceneService.gameStatusChanges.subscribe((status: GameStatus) => {
      this.checkStatusGame(status);
    });
  }

  checkStatusGame(status: GameStatus) {
    switch (status) {
      case GameStatus.Run:
        this.runGame();
        break;
      case GameStatus.Stop:
        this.stopGame();
        break;
      case GameStatus.GameOver:
        this.gameOver();
        break;
      default:
        this.stopGame();
    }
  }

  onStartGame() {
      this.isTutorialShown = false;
      this.sceneService.startGame();
  }

  onRestartGame() {
    this.sceneService.restartGame();
    this.bgPosition = 0;
    this.score = 0;
    this.scoreService.setScore(0);
  }

  runGame() {
    this.isGameOver = false;
    this.interval = setInterval(() => {
      this.bgPosition += 1;
      this.scoreService.runCountScore();
      },50);
  }

  stopGame() {
    clearInterval(this.interval);
  }

  gameOver() {
    this.stopGame();
    this.isGameOver = true;
    const bestScore = this.scoreService.getBestScore();
    this.score = this.scoreService.getScore();
    if (this.score > bestScore) {
      this.scoreService.saveScore().subscribe(resp => {
      });
    }
  }

  ngOnDestroy() {
    this.scoreService.setScore(0);
    this.gameStatusSub.unsubscribe();
    this.physicsService.destroyGamePhysics();
  }
}
