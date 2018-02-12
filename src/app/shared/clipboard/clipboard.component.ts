import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {
  clipBoardText = "[EPM_QM_ASSIGNED]"
  constructor() { }

  ngOnInit() {
  }

}
