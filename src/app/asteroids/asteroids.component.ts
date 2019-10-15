import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.scss']
})
export class AsteroidsComponent implements OnInit {
  asteroids: number[] = [];
  index: number = 0;
  ngOnInit() {

    // this.index += 1;
    // this.asteroids.push(this.index);


    setInterval(() => {
      this.index += 1;
      this.asteroids.push(this.index);
    }, 2000);
  }

  onDeleteAsteroid() {
    this.asteroids.splice(0,1);
  }
}
