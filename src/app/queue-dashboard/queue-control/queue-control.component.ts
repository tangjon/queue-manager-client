import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import {UserService} from '../../core/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})
export class QueueControlComponent implements OnInit {
  users: Observable<any[]>;

  id$: Observable<string>;
  paramId: string;
  totalIncidents: number;
  totalIncidentsCtx: number;
  _userListAll: Array<User>;
  _userListCtx: Array<User>;
  _userListBusy: Array<User>;
  _userListAvailable: Array<User>;

  users$: Observable<User[]>;

  errorMessage: string;

  showSpinner = true;

  constructor(public db: AngularFireDatabase,
              private route: ActivatedRoute,
              public userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUserBHO().pipe(tap(() => this.showSpinner = false));

    // Get Param :id in url
    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      // this.showSpinner = true;
      this.paramId = value;

      // this.userService.getUsers().subscribe((users: Array<User>) => {
      //     this.showSpinner = false;
      //     this._userListAll = users;
      //     this._userListCtx = users.filter((t: User) => {
      //       return t.support.areas[this.paramId] == true;
      //     });
      //
      //     this.prepareAvailable();
      //     this.prepareBusy();
      //     this.updateSummary();
      //   },
      //   (error) => {
      //     this.errorHandler(error)
      //   });
    });
  }



  getAssignmentCount(user) {
    return this.userService.logService.getAssignmentCount(user);
  }

  toggleStatus(user: User) {
    const bool = user.isAvailable;
    user.setStatus(!bool);
    this.userService.updateAvailability(user, !bool).subscribe(() => {
      // this.refreshLists();
    });
  }

  refreshLists() {
    this.prepareAvailable();
    this.prepareBusy();

  }

  incIncidentAmount(user: User) {
    const amount = 1;
    const currAmount = user.incidentBook.data[this.paramId];
    const prompt = window.prompt(`Adding +${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          this.snackBar.open('Incident Added', 'Close', {duration: 1000});
          user.incidentBook.data[this.paramId]++;
          this.updateSummary();
          this.refreshLists();
        },
        error => {

          this.errorHandler(error)
        }
      );
    }
  }

  decIncidentAmount(user) {
    const amount = -1;
    const currAmount = user.incidentBook.data[this.paramId];
    const prompt = window.prompt(`Removing ${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          this.snackBar.open('Incident Removed', 'Close', {duration: 1000});
          user.incidentBook.data[this.paramId]--;
          this.updateSummary();
          this.refreshLists();
        }, error => {
        this.errorHandler(error)
        }
      );
    }

  }

  logIt(msg) {
    console.log(msg);
  }

  updateSummary() {
    let totalA = 0;
    this._userListAll.forEach(user => {
      totalA += user.getIncidentTotal();
    });
    this.totalIncidents = totalA;

    let totalB = 0;
    this._userListCtx.forEach(element => {
      totalB += element.incidentBook.data[this.paramId];
    });
    this.totalIncidentsCtx = totalB;
  }

  private prepareBusy() {
    this._userListBusy = this._userListCtx.filter((t: User) => {
      return t.isAvailable == false;
    });

    this._userListBusy.sort(
      function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
  }

  private prepareAvailable() {
    this._userListAvailable = this._userListCtx.filter((t: User) => {
      return t.isAvailable == true;
    });
    this._userListAvailable
      .sort(
      function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .sort(
        function (a, b) {
          if (a.getAverageQDay() < b.getAverageQDay()) {
            return -1;
          }
          if (a.getAverageQDay() > b.getAverageQDay()) {
            return 1;
          }
          return 0;
        });
  }

  private errorHandler(error) {
    this.errorMessage = `Received an error: ${error.message}\nConsider the following:\n1.Are you using Chrome?\n2.Please Restart the Database`;
    this.snackBar.open(error.message, 'Close');
  }


}
