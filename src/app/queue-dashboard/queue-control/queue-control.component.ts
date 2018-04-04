import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import {UserService} from '../../core/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from "../../shared/model/user";

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
  _userListBusy: Array<User>;
  _userListAvailable: Array<User>;

  _userList: Array<User> = [];
  _userListHeavy: Array<User> = [];

  errorMessage: string;

  showSpinner = true;

  constructor(public db: AngularFireDatabase,
              private route: ActivatedRoute,
              public userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log("hello");
    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      this.paramId = value;
      this.showSpinner = true;
      this.userService.getUsers().subscribe((users: Array<User>) => {
          this.showSpinner = false;
          this._userList = users;
          this.updateSummary();
        },
        (error) => {
          this.errorHandler(error)
        });
    });




  }

  simulate(){
    // setInterval(()=>{
    //   // console.log(this._userList);
    //   let user = this._userList[Math.floor(Math.random() * this._userList.length)];
    //
    //   const amount = 1;
    //   const currAmount = user.incidentBook.data[this.paramId];
    //   // const prompt = window.prompt(`Adding +${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    //
    //     // this.showSpinner = true;
    //     this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
    //         // this.showSpinner = false;
    //         this.snackBar.open('Incident Added', 'Close', {duration: 1000});
    //         user.incidentBook.data[this.paramId]++;
    //         this.updateSummary();
    //       },
    //       error => {
    //         this.errorHandler(error)
    //       }
    //     );
    //
    //   user = this._userList[Math.floor(Math.random() * this._userList.length)];
    //   this.toggleStatus(user);
    //
    // }, 5000)

  }


  getAssignmentCount(user) {
    return this.userService.logService.getAssignmentCount(user);
  }

  toggleStatus(user: User) {
    const bool = user.isAvailable;
    this.userService.updateAvailability(user, !bool).subscribe(() => {
      user.setStatus(!bool);
    });
  }

  incIncidentAmount(user: User) {
    const amount = 1;
    const currAmount = user.incidentBook.data[this.paramId];
    const prompt = window.prompt(`Adding +${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      // this.showSpinner = true;
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          // this.showSpinner = false;
          this.snackBar.open('Incident Added', 'Close', {duration: 1000});
          user.incidentBook.data[this.paramId]++;
          this.updateSummary();
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
    this._userList.forEach(user => {
      totalA += user.getIncidentTotal();
    });
    this.totalIncidents = totalA;

    let totalB = 0;
    this._userList.forEach(element => {
      totalB += element.incidentBook.data[this.paramId];
    });
    this.totalIncidentsCtx = totalB;
  }

  private errorHandler(error) {
    this.errorMessage = `Received an error: ${error.message}\nConsider the following:\n1.Are you using Chrome?\n2.Please Restart the Database`;
    this.snackBar.open(error.message, 'Close');
  }

  onRefresh(){
    this.ngOnInit();
  }


}
