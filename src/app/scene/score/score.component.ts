import {Component, OnInit} from "@angular/core";
import {ScoreService} from "./score.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  score: number = 0;
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.score = this.scoreService.getScore();
    this.scoreService.scoreChanges.subscribe((score: number) => {
      this.score = score;
    })
  }
}
