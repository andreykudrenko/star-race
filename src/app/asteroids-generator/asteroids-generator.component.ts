import {Component, OnInit} from "@angular/core";
import {GameStatus, SceneService} from "../scene/scene.service";

@Component({
  selector: 'app-asteroids-generator',
  templateUrl: './asteroids-generator.component.html',
  styleUrls: ['./asteroids-generator.component.scss']
})
export class AsteroidsGeneratorComponent implements OnInit {
  asteroids: number[] = [];
  index: number = 0;
  interval: any;

  constructor(private sceneService: SceneService) {}

  ngOnInit() {
    this.startGenerateAsteroids();
    this.sceneService.gameStatusChanges.subscribe(status => {
      if (status === GameStatus.Pause || status === GameStatus.Over) {
        this.stopGenerateAsteroids();
      } else {
        this.startGenerateAsteroids();
      }
    });
  }

  startGenerateAsteroids() {
    this.interval = setInterval(() => {
      this.index += 1;
      this.asteroids.push(this.index);
    }, 2000);
  }

  stopGenerateAsteroids() {
    clearInterval(this.interval);
  }

  onDeleteAsteroid() {
    this.asteroids.splice(0,1);
  }
}
