import {Component, OnInit} from "@angular/core";
import {ScoreService} from "../../scene/score/score.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bestScore: number = 0;
  constructor(private scoreService: ScoreService) {}
  ngOnInit() {
    this.bestScore = this.scoreService.getBestScore();
  }
}
