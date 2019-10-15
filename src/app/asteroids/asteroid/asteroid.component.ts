import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {SpaceshipService} from "../../spaceship/spaceship.service";
import {Subscription} from "rxjs";
import {Asteroid} from "./asteroid.model";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit, OnDestroy {
  @Output() deleteAsteroid = new EventEmitter();
  screenHeight: number;
  spaceShipSub: Subscription;
  asteroid: Asteroid = null;
  interval: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
  }

  constructor(private spaceshipService: SpaceshipService) {
    this.onResize();
  }

  ngOnInit() {
    this.startAsteroid();
    this.spaceShipSub = this.spaceshipService.spaceShipChanges.subscribe(spaceship => {
      this.isAsteroidHitSpaceship(spaceship.positionX, spaceship.positionY, spaceship.size);
      // console.log(spaceship);
    });
  }

  startAsteroid() {
    const initPositionX = 550 * Math.random();
    this.asteroid = new Asteroid(initPositionX, -100, 50);
    this.interval = setInterval(() => {
      this.moveAsteroid();
    }, 250);
  }

  moveAsteroid() {
    this.asteroid.positionY += 25;
    if (this.screenHeight - this.asteroid.positionY < -this.asteroid.size) {
      this.deleteAsteroid.emit();
      clearInterval(this.interval);
    }
  }

  ngOnDestroy() {
    this.spaceShipSub.unsubscribe();
  }

  isAsteroidHitSpaceship(spaceshipPosX: number, spaceshipPosy: number, spaceshipSize: number) {
    // Y cord
    const spaceShpFromY = spaceshipPosX;
    const spaceShpToY = spaceshipPosX + spaceshipSize;
    const asteroidFromY = this.asteroid.positionX;
    const asteroidToY = this.asteroid.positionX + this.asteroid.size;

    // X cord
    const spaceShpFromX = spaceshipPosX;
    const spaceShpToX = spaceshipPosX + spaceshipSize;
    const asteroidFromX = this.asteroid.positionX;
    const asteroidToX = this.asteroid.positionX + this.asteroid.size;

    // console.log(this.screenHeight - (this.asteroid.positionY + this.asteroid.size) + this.asteroid.size);

    if (((asteroidFromX > spaceShpFromX && asteroidFromX < spaceShpToX) || (asteroidToX < spaceShpToX && asteroidToX > spaceShpFromX)) && (this.screenHeight - (this.asteroid.positionY + this.asteroid.size) < 100)) {
        console.log('Spaceship: ' + spaceShpFromX + ' - ' + spaceShpToX);
        console.log('Asteroid: ' + asteroidFromX + ' - ' + asteroidToX);
        console.log('damaged!');
    }

    // if ((spaceShpFromX < asteroidShpToX && spaceShpFromX > asteroidFromX) || ())


    // if (spaceshipPosX < this.asteroid.positionX + this.asteroid.size && spaceshipPosX > this.asteroid.positionX && this.asteroid.positionY < 200) {
    //   console.log('Spaceship: ' + spaceShpFromX + ' - ' + spaceShpToX);
    //   console.log('Asteroid: ' + asteroidFromX + ' - ' + asteroidShpToX);
    //   console.log('damaged!');
    // }
    // if (spaceshipPosX + spaceshipSize < this.asteroid.positionX && spaceshipPosX > this.asteroid.positionX) {
    //   console.log('damaged!');
    // }
    // console.log('Spaceship x: ' + spaceshipPosX + '; Asteroid x: ' + this.asteroid.positionX);
  }
}
