import {Component, OnDestroy, OnInit} from "@angular/core";
import {GameStatus, SceneService} from "../scene.service";
import {interval, Subscription} from "rxjs";
import {AsteroidService} from "./asteroid/asteroid.service";

interface AsteroidEl {
  id: number;
}

@Component({
  selector: 'app-asteroids-generator',
  templateUrl: './asteroids-generator.component.html',
  styleUrls: ['./asteroids-generator.component.scss']
})
export class AsteroidsGeneratorComponent implements OnInit, OnDestroy {
  asteroids: AsteroidEl[] = [];
  index: number = 0;
  intervalGeneratationSub: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private sceneService: SceneService,
    private asteroidService: AsteroidService
  ) {}

  ngOnInit() {
    const gameStatusSub = this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Run) {
        this.startGenerateAsteroids();
      } else {
        this.stopGenerateAsteroids();
      }
    });
    const restartGameSub = this.sceneService.gameRestart.subscribe(() => {
      this.asteroids = [];
      this.asteroidService.clearAsteroids();
    });
    const asteroidSub = this.asteroidService.deleteAsteroidEvent.subscribe((id: number) => {
      this.deleteAsteroid(id);
    });
    this.subscriptions = [gameStatusSub, restartGameSub, asteroidSub];
  }

  startGenerateAsteroids() {
    const intervalGeneratation = interval(750);
    this.intervalGeneratationSub = intervalGeneratation.subscribe(() => {
      this.index += 1;
      this.asteroids.push({id: this.index});
    });
  }

  stopGenerateAsteroids() {
    this.intervalGeneratationSub.unsubscribe();
  }

  deleteAsteroid(id) {
    this.asteroids = this.asteroids.reduce((acc, asteroid) => {
      if (asteroid.id !== id) {
        acc.push(asteroid);
      }
      return acc;
    }, []);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
