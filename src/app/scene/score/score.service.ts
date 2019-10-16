import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class ScoreService {
  score: number = 0;
  scoreChanges = new Subject<number>();
  setScore(newScore) {
    this.score = newScore;
    this.scoreChanges.next(newScore);
  }
  getScore(): number {
    return this.score;
  }
}
