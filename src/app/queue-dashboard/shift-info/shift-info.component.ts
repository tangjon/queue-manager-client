import {Component, OnInit} from '@angular/core';
import {WorkShift} from "../../shared/model/work_shift";

@Component({
  selector: 'app-shift-info',
  templateUrl: './shift-info.component.html',
  styleUrls: ['./shift-info.component.css']
})
export class ShiftInfoComponent implements OnInit {

  SHIFT_WEST = new WorkShift('West', new Date('December 31, 1995 08:00:00'), new Date('December 31, 1995 17:00:00'));
  SHIFT_EAST = new WorkShift('East', new Date('December 31, 1995 06:00:00'), new Date('December 31, 1995 15:00:00'));
  SHIFT_BRAZIL = new WorkShift('Brazil', new Date('December 31, 1995 04:30:00'), new Date('December 31, 1995 14:00:00'));

  SHIFTS = [this.SHIFT_EAST, this.SHIFT_WEST, this.SHIFT_BRAZIL];

  // SHIFT_BRAZIL = new WorkShift();

  constructor() {
  }

  ngOnInit() {
    // this.SHIFT_WEST.start = new Date('December 31, 1995 05:00:00');
    // console.log(new Date('December 31, 1995 17:00:00').getTime())
  }


}
