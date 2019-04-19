import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  constructor(
    public  userService: UserService,
    public  matSnackBar: MatSnackBar,
    public db: AngularFireDatabase) {
  }

  ngOnInit() {
  }
}
