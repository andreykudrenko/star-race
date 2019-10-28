import {Component, OnDestroy, OnInit} from "@angular/core";
import {ScoreService} from "./score.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  score: number = 0;
  scoreSub: Subscription;
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.score = this.scoreService.getScore();
    this.scoreSub = this.scoreService.scoreChanges.subscribe((score: number) => {
      this.score = score;
    })
  }

  ngOnDestroy() {
    this.scoreSub.unsubscribe();
  }
}
