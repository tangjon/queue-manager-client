import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  appVersion = environment.appVersion;
  appLastUpdate = environment.last_updated;
  qmdoclink = "https://queuemanagerdocumentation-p2000140239trial.dispatcher.hanatrial.ondemand.com/changelog.html";
  constructor() { }

  ngOnInit() {
  }

}
