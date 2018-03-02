import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-component-bar',
  templateUrl: './component-bar.component.html',
  styleUrls: ['./component-bar.component.css']
})
export class ComponentBarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

}
