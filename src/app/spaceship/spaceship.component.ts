import {Component, HostListener, OnInit} from "@angular/core";
import {Spaceship} from "./spaceship.model";
import {SpaceshipService} from "./spaceship.service";

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent implements OnInit {
  spaceship: Spaceship = null;
  sceneWith: number = 600;
  sceneHeight: number = 600;

  constructor(private spaceshipService: SpaceshipService) {}

  ngOnInit() {
    this.spaceship = new Spaceship(0,0,false, 50, 100);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyD':
        this.onMoveRight();
        this.onUpdateSpaceship();
        break;
      case 'KeyS':
        this.onMoveBottom();
        this.onUpdateSpaceship();
        break;
      case 'KeyA':
        this.onMoveLeft();
        this.onUpdateSpaceship();
        break;
      case 'KeyW':
        this.onMoveTop();
        this.onUpdateSpaceship();
        break;
      default:
        break;
    }
  }

  onMoveRight() {
    if (this.spaceship.positionX >= this.sceneWith - this.spaceship.size) {
      this.spaceship.positionX = this.sceneWith - this.spaceship.size;
    } else {
      this.spaceship.positionX += this.spaceship.movingParam;
    }
  }
  onMoveLeft() {
    if (this.spaceship.positionX <= 0) {
      this.spaceship.positionX = 0;
    } else {
      this.spaceship.positionX -= this.spaceship.movingParam;
    }
  }
  onMoveTop() {
    if (this.spaceship.positionY >= this.sceneHeight - this.spaceship.size) {
      this.spaceship.positionY = this.sceneHeight - this.spaceship.size;
    } else {
      this.spaceship.positionY += this.spaceship.movingParam;
    }
  }
  onMoveBottom() {
    if (this.spaceship.positionY <= 0) {
      this.spaceship.positionY = 0;
    } else {
      this.spaceship.positionY -= this.spaceship.movingParam;
    }
  }

  onUpdateSpaceship() {
    this.spaceshipService.updateSpaceship(this.spaceship);
  }
}
