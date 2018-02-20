import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/pluck';
import { RouteReuseStrategy } from '@angular/router';
import { UserService } from '../services/user.service';
import { QmUser } from '../model/qmuser';
import { ActivityBookService } from '../services/activity-book.service';
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

  activityBook: ActivityBook;
  constructor(public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public activityBookSerivce: ActivityBookService,
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

    this.activityBookSerivce.getBook().subscribe(book => {
      // console.log(book)
      this.activityBook = book;
    })
  }

  getAssignmentCount(user) {
    let hours = 24;
    let count = this.activityBookSerivce.getAssignmentCount(user);
    // console.log(count);
    return count;
  }

  toggleStatus(user: User) {
    let index;
    let bool = user.isAvailable;
    user.setStatus(!bool);
    this.userService.updateUser(user).subscribe(r => {
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
    let prompt = window.prompt("Adding " + "+" + amount + " to " + user.name, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, amount).subscribe(r => {
        this.updateSummary();
        this.refreshLists();
      })
    }
  }

  decIncidentAmount(user) {
    let amount = -1;
    let prompt = window.prompt("Removing " + amount + " to " + user.name, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, amount).subscribe(r => {
        this.updateSummary();
        this.refreshLists();
      });
    }

  }

  logIt(msg) {
    // console.log(msg)
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