import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class AsteroidService {
  deleteAsteroidEvent = new Subject<number>();

  deleteAsteroid(id) {
    this.deleteAsteroidEvent.next(id);
  }
}
