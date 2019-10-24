import {Component, OnInit} from "@angular/core";
import {GameStatus, SceneService} from "../scene.service";
import {interval, Subscription} from "rxjs";

interface AsteroidEl {
  id: number;
}

@Component({
  selector: 'app-asteroids-generator',
  templateUrl: './asteroids-generator.component.html',
  styleUrls: ['./asteroids-generator.component.scss']
})
export class AsteroidsGeneratorComponent implements OnInit {
  asteroids: AsteroidEl[] = [];
  index: number = 0;
  intervalGeneratationSub: Subscription;

  constructor(private sceneService: SceneService) {}

  ngOnInit() {
    this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Run) {
        this.startGenerateAsteroids();
      } else {
        this.stopGenerateAsteroids();
      }
    });
    this.sceneService.gameRestart.subscribe(() => {
      this.asteroids = [];
    })
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

  onDeleteAsteroid(id) {
    this.asteroids = this.asteroids.reduce((acc, asteroid) => {
      if (asteroid.id !== id) {
        acc.push(asteroid);
      }
      return acc;
    }, []);
  }
}
