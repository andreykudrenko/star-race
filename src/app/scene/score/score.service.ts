import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable()
export class ScoreService {
  score: number = 0;
  bestScore: number = 0;
  scoreChanges = new Subject<number>();

  constructor(private http: HttpClient) {}

  runCountScore() {
    this.score++;
    this.scoreChanges.next(this.score);
  }

  addScore(score) {
    this.score += score;
    this.scoreChanges.next(this.score);
  }

  setScore(newScore) {
    this.score = newScore;
    this.scoreChanges.next(newScore);
  }

  getScore(): number {
    return this.score;
  }

  saveScore(): Observable<number> {
    this.setBestScore(this.score);
    const url = 'https://star-race.firebaseio.com/score.json';
    return this.http.put<number>(url, this.score);
  }

  fetchBestScore(): Observable<number> {
    const url = 'https://star-race.firebaseio.com/score.json';
    return this.http.get<number>(url).pipe(tap(bestScore => this.bestScore = bestScore));
  }

  getBestScore(): number {
    return this.bestScore;
  }

  setBestScore(score: number) {
    this.bestScore = score;
  }
}
