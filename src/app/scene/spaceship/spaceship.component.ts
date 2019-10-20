import {Component, HostListener, OnInit} from "@angular/core";
import {Spaceship} from "./spaceship.model";
import {SpaceshipService} from "./spaceship.service";
import {GameStatus, SceneService} from "../scene.service";

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent implements OnInit {
  spaceship: Spaceship = null;
  gameStatus: GameStatus;

  constructor(private spaceshipService: SpaceshipService, private sceneService: SceneService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.gameStatus === GameStatus.Run) {
      this.spaceshipService.spaceshipControl(event.code);
    }
  }

  ngOnInit() {
    this.initSpaceship();
    this.sceneService.gameStatusChanges.subscribe(status => {
      this.gameStatus = status;
    });
    this.sceneService.gameRestart.subscribe(() => this.initSpaceship());
  }

  initSpaceship() {
    const posX = 0;
    const posY = 0;
    const isDamaged = false;
    const movingParam = 20;
    const size = 100;
    this.spaceship = new Spaceship(posX,posY,isDamaged, movingParam, size);
    this.spaceshipService.setSpaceship(this.spaceship);
  }
}
