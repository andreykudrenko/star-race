import {ChangeDetectorRef, Component, HostListener, OnInit} from "@angular/core";
import {Spaceship} from "./spaceship.model";
import {SpaceshipService} from "./spaceship.service";
import {GameStatus, Scene, SceneService} from "../scene.service";
import {BlasterService} from "./blaster/blaster.service";
import {Blaster} from "./blaster/blaster.model";


@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent implements OnInit {
  spaceship: Spaceship = null;
  gameStatus: GameStatus;
  fireBlaster: Blaster[] = [];
  blusterId: number = 0;
  sceneSize: Scene;

  constructor(
    private spaceshipService: SpaceshipService,
    private blasterService: BlasterService,
    private cdr: ChangeDetectorRef,
    private sceneService: SceneService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.gameStatus === GameStatus.Run) {
      this.spaceshipControl(event.code);
    }
  }

  ngOnInit() {
    this.initSpaceship();
    this.sceneService.gameStatusChanges.subscribe(status => {
      this.gameStatus = status;
    });
    this.sceneService.gameRestart.subscribe(() => this.initSpaceship());
    this.blasterService.blasterChangesEvent.subscribe((blasters: Blaster[]) => {
      this.fireBlaster = blasters;
    })
  }

  initSpaceship() {
    const size = 100;
    const posX = (this.sceneService.getSceneSize().width / 2) - (size / 2);
    const posY = (this.sceneService.getSceneSize().height / 2) - (size / 2);
    const isDamaged = false;
    const movingParam = 20;
    this.spaceship = new Spaceship(posX,posY,isDamaged, movingParam, size);
    this.spaceshipService.setSpaceship(this.spaceship);
  }

  spaceshipControl(keyCode) {
    this.sceneSize = this.sceneService.getSceneSize();
    if (!this.spaceship.isDamaged) {
      switch (keyCode) {
        case 'KeyD':
          this.onMoveRight();
          break;
        case 'KeyS':
          this.onMoveBottom();
          break;
        case 'KeyA':
          this.onMoveLeft();
          break;
        case 'KeyW':
          this.onMoveTop();
          break;
        case 'Space':
          this.onFire();
          this.cdr.detectChanges();
          break;
        default:
          break;
      }
    }
  }

  onMoveRight() {
    if (this.spaceship.positionX >= this.sceneSize.width - this.spaceship.size) {
      this.spaceship.positionX = this.sceneSize.width - this.spaceship.size;
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
    if (this.spaceship.positionY >= this.sceneSize.height - this.spaceship.size) {
      this.spaceship.positionY = this.sceneSize.height - this.spaceship.size;
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

  onFire() {
    this.blusterId += 1;
    const blaster = new Blaster(
      this.blusterId,
      this.spaceship.positionX + this.spaceship.size,
      this.spaceship.positionY + this.spaceship.size / 2);
    this.blasterService.setBlaster(blaster);
  }
}
