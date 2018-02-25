import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { RouteReuseStrategy } from '@angular/router';
import { UserService } from '../services/user.service';
import { QmUser } from '../model/qmuser';
import { ActivityBook } from '../model/activitybook';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})
export class QueueControlComponent implements OnInit {

  allUsers: Observable<any[]>;
  users: Observable<any[]>;

  id$: Observable<string>;
  paramId: string;
  totalIncidents: number;
  totalIncidentsCtx: number;
  _userListAll: Array<User>;
  _userListCtx: Array<User>;
  _userListBusy: Array<User>;
  _userListAvailable: Array<User>;

  errorMessage: string;

  showSpinner: boolean = true;

  qmUser: QmUser;

  constructor(public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    // Get Param :id in url
    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      this.showSpinner = true;
      this.paramId = value;

      this.userService.getUsers().subscribe(r => {
        this.showSpinner = false;

        this._userListAll = r;

        this._userListCtx = r.filter((t: User) => {
          return t.role[this.paramId] == true;
        });

        this._userListCtx.sort(
          function (a, b) {
            if (a.getAverageQDay() < b.getAverageQDay())
              return -1;
            if (a.getAverageQDay() > b.getAverageQDay())
              return 1;
            return 0;
          })

        this._userListAvailable = this._userListCtx.filter((t: User) => {
          return t.isAvailable == true;
        });
        this._userListBusy = this._userListCtx.filter((t: User) => {
          return t.isAvailable == false;
        });

        this.updateSummary();
      },
        error => {
          this.errorMessage = error;
        })
    });
  }

  getAssignmentCount(user) {
    let hours = 24;
    let count = this.userService.logService.getAssignmentCount(user);
    return count;
  }

  toggleStatus(user: User) {
    let index;
    let bool = user.isAvailable;
    user.setStatus(!bool);
    this.userService.updateAvailability(user, !bool).subscribe(r => {
      this.refreshLists();
    })
  }

  refreshLists() {
    this._userListCtx.sort(function (a, b) {
      if (a.getAverageQDay() < b.getAverageQDay())
        return -1;
      if (a.getAverageQDay() > b.getAverageQDay())
        return 1;
      return 0;
    })
    this._userListAvailable = this._userListCtx.filter(v => {
      return v.isAvailable == true;
    })
    this._userListBusy = this._userListCtx.filter(v => {
      return v.isAvailable == false;
    })
  }

  incIncidentAmount(user: User) {
    let amount = 1;
    let currAmount = user.incidents[this.paramId];
    let prompt = window.prompt(`Adding +${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(r => {
        this.snackBar.open('Incident Added', 'Close', { duration: 1000 });
        user.incidents[this.paramId]++;
        this.updateSummary();
        this.refreshLists();
      })
    }
  }

  decIncidentAmount(user) {
    let amount = -1;
    let currAmount = user.incidents[this.paramId];
    let prompt = window.prompt(`Removing ${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(r => {
        this.snackBar.open('Incident Removed', 'Close', { duration: 1000 });
        user.incidents[this.paramId]--;
        this.updateSummary();
        this.refreshLists();
      });
    }

  }

  logIt(msg) {
    console.log(msg)
  }

  updateSummary() {
    let totalA = 0;
    this._userListAll.forEach(user => {
      totalA += user.getIncidentTotal();
    });
    this.totalIncidents = totalA;

    let totalB = 0;
    this._userListCtx.forEach(element => {
      totalB += element.incidents[this.paramId]
    });
    this.totalIncidentsCtx = totalB;
  }


}