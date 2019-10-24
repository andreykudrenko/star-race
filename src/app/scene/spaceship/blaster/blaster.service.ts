import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Blaster} from "./blaster.model";

@Injectable()
export class BlasterService {
  blasters: Blaster[] = [];
  blasterChangesEvent = new Subject<Blaster[]>();

  setBlaster(blaster: Blaster) {
    this.blasters.push(blaster);
    this.blasterChangesEvent.next(this.blasters);
  }

  getBlasters(): Blaster[] {
    return this.blasters;
  }

  getBlasterById(id: number): Blaster {
    return <Blaster>this.blasters.reduce((prev, blaster) => {
      if (blaster.id === id) {
        return prev;
      }
    }, {});
  }

  deleteBlaster(id: number) {
    this.blasters = this.blasters.reduce((acc, blaster) => {
      if (blaster.id !== id) {
        acc.push(blaster);
      }
      return acc;
    }, []);
    this.blasterChangesEvent.next(this.blasters);
  }

  firedNewBlaster(blaster: Blaster) {
    console.log(blaster);
  }
}
