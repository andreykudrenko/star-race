import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {interval, Subscription} from "rxjs";
import {SceneService} from "../../scene.service";
import {BlasterService} from "./blaster.service";
import {Blaster} from "./blaster.model";

@Component({
  selector: 'app-blaster',
  templateUrl: './blaster.component.html',
  styleUrls: ['./blaster.component.scss']
})
export class BlasterComponent implements OnInit, OnDestroy {
  @Input() blaster: Blaster;
  blasterInterval: Subscription;


  constructor(
    private sceneService: SceneService,
    private blasterService: BlasterService) {}

  ngOnInit() {
    console.log(this.blaster);
    this.blasterInterval = interval(10).subscribe(() => {
      this.blaster.x += 5;
      const sceneWidth = this.sceneService.getSceneSize().width;
      if (this.blaster.x > sceneWidth + 200) {
        this.blasterService.deleteBlaster(this.blaster.id);
      }
    })
  }

  ngOnDestroy() {
    this.blasterInterval.unsubscribe();
  }
}
