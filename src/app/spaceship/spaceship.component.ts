import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {Spaceship} from "./spaceship.model";
import {SpaceshipService} from "./spaceship.service";
import {Subscription} from "rxjs";
import {SceneService} from "../scene/scene.service";

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent implements OnInit, OnDestroy {
  spaceship: Spaceship = null;
  sceneWith: number = 600;
  sceneHeight: number;
  sceneHeightSub: Subscription;
  damageStatusSub: Subscription;

  constructor(private spaceshipService: SpaceshipService, private sceneService: SceneService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.spaceShipControl(event.code);
  }

  ngOnInit() {
    this.initSpaceship();
    this.getScreenHeight();
  }

  getScreenHeight() {
    this.sceneHeight = this.sceneService.getScreenHeight();
    this.sceneHeightSub = this.sceneService.screenHeightChanges.subscribe(screenHeight => {
      this.sceneHeight = screenHeight;
    })
  }

  initSpaceship() {
    const posX = 0;
    const posY = 0;
    const isDamaged = false;
    const movingParam = 20;
    const size = 100;
    this.spaceship = new Spaceship(posX,posY,isDamaged, movingParam, size);
    this.onUpdateSpaceship();
  }

  spaceShipControl(keyCode) {
    if (!this.spaceship.isDamaged) {
      switch (keyCode) {
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

  ngOnDestroy() {
    this.damageStatusSub.unsubscribe();
    this.sceneHeightSub.unsubscribe();
  }
}
