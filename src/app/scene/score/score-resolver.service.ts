import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ScoreService} from "./score.service";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Injectable()
export class ScoreResolverService implements Resolve<number>{
  constructor(private scoreService: ScoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    const bestScore = this.scoreService.getBestScore();
    if (bestScore !== 0) {
      return bestScore;
    } else {
    return this.scoreService.fetchBestScore().pipe(
      take(1));
    }
  };
}
