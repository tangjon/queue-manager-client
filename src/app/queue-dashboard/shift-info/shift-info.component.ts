import {Component, OnInit} from '@angular/core';
import {WorkShift} from "../../model/work_shift";

@Component({
  selector: 'app-shift-info',
  templateUrl: './shift-info.component.html',
  styleUrls: ['./shift-info.component.css']
})
export class ShiftInfoComponent implements OnInit {

  SHIFT_WEST = new WorkShift('West', new Date(820425600000), new Date(820425600000));
  SHIFT_EAST = new WorkShift('East', new Date(820414800000), new Date(820447200000));
  SHIFTS = [this.SHIFT_EAST, this.SHIFT_WEST];

  // SHIFT_BRAZIL = new WorkShift();

  constructor() {
  }

  ngOnInit() {
    // this.SHIFT_WEST.start = new Date('December 31, 1995 05:00:00');
    console.log(new Date('December 31, 1995 17:00:00').getTime())
  }


}
