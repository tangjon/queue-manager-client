import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import {UserService} from '../../core/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from "../../shared/model/user";
import {environment} from "../../../environments/environment";
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalConfirmComponent} from "../../shared/components/modals/modal-confirm/modal-confirm.component";
import {ModalInterface} from "../../shared/components/modals/modal-interface";

@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})

// Extends Event for click events
// export interface Event {
//   target: { className: string }
// }

export class QueueControlComponent implements OnInit {
  // alert variable

  // users
  users: Observable<any[]>;
  _userList: Array<User> = [];

  // Info variables
  errorMessage: string;
  showSpinner = true;
  id$: Observable<string>;
  paramId: string;
  totalIncidents: number;
  totalIncidentsCtx: number;
  // Refresh Button Variables
  isFirstCallBack;
  applicationChangeFlag;

  // Fireball
  MAX_INCIDENTS = 3;

  // Tool Tip Definitions
  TIP_TOTAL_INCIDENTS = "Displays number of incidents assigned today";
  TIP_FIREBALL = `User is on fire and has taken more than ${this.MAX_INCIDENTS} incidents`;
  TIP_BUSY = 'Should ask user before assigning more';
  TIP_AVAILABLE = 'Ready for incident assignment';
  TIP_ADD_INCIDENT = 'Assign user an incident';
  TIP_REMOVE_INCIDENT = 'Remove an incident from user';
  TIP_REFRESH = "Green check mark is up to date. Orange is out sync";

  constructor(public db: AngularFireDatabase,
              private route: ActivatedRoute,
              public userService: UserService,
              public snackBar: MatSnackBar,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.isFirstCallBack = true; // we want to ignore the first callback
    this.applicationChangeFlag = false;
    // listen to application changes
    this.db.object(environment.firebaseRootUrl + '/log-last-change').valueChanges().subscribe((r: any) => {
      // Ignore first call back and changes are not from local user
      if (!this.isFirstCallBack && atob(this.userService.logService.getCachedINumber()) !== r.user) {
        this.applicationChangeFlag = true;
      } else {
        this.isFirstCallBack = false;
      }
    });

    this.id$ = this.route.params.pluck('id');
    this.id$.subscribe(value => {
      this.paramId = value;
      this.showSpinner = true;
      this.userService.getUsers().subscribe((users: Array<User>) => {
          console.log(users);
          this.showSpinner = false;
          this._userList = users;
          this.updateSummary();
        },
        (error) => {
          this.errorHandler(error)
        });
    });
  }

  onAddIncident(user: User) {
    let amount = 1;
    let bsModalRef: ModalInterface = this.modalService.show(ModalConfirmComponent);
    bsModalRef.content.title = "Incident Assignment";
    bsModalRef.content.message = `You are assigning +${amount} incident(s) to ${user.name}(${user.iNumber})`;
    bsModalRef.content.onCancel.subscribe(() => {
    });
    bsModalRef.content.onConfirm.subscribe(() => {
      const currAmount = user.incidentCounts[this.paramId];
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          // this.showSpinner = false;
          this.snackBar.open('Incident Added', 'Close', {duration: 1000});
          user.incidentCounts[this.paramId]++;
          this.updateSummary();
        },
        error => {
          this.errorHandler(error)
        }
      );
    });
  }

  onRemoveIncident(user: User) {
    let amount = -1;
    let bsModalRef: ModalInterface = this.modalService.show(ModalConfirmComponent);
    bsModalRef.content.title = "Incident Removal";
    bsModalRef.content.message = `You are removing ${amount} incident(s) from ${user.name}(${user.iNumber})`;
    bsModalRef.content.onCancel.subscribe(() => {
    });
    bsModalRef.content.onConfirm.subscribe(() => {
      const currAmount = user.incidentCounts[this.paramId];
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          this.snackBar.open('Incident Removed', 'Close', {duration: 1000});
          user.incidentCounts[this.paramId]--;
          this.updateSummary();
        }, error => {
          this.errorHandler(error)
        }
      );
    });
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

  incIncidentAmount(user: User) {
    const amount = 1;
    const currAmount = user.incidentCounts[this.paramId];
    const prompt = window.prompt(`Adding +${amount} Incident to ${user.name}(${user.iNumber})`, user.iNumber);
    if (prompt) {
      // this.showSpinner = true;
      this.userService.updateIncident(user, this.paramId, currAmount + amount).subscribe(() => {
          // this.showSpinner = false;
          this.snackBar.open('Incident Added', 'Close', {duration: 1000});
          user.incidentCounts[this.paramId]++;
          this.updateSummary();
        },
        error => {
          this.errorHandler(error)
        }
      );
    }
  }

  simulate() {
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

  toggleStatus(user: User, event) {
    // Prevent double click toggle
    let target = <HTMLSelectElement> event.target;
    target.disabled = true;
    // Send toggle
    this.userService.updateAvailability(user, !user.isAvailable).subscribe(() => {
      user.setStatus(!user.isAvailable);
    });
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
      totalB += element.incidentCounts[this.paramId];
    });
    this.totalIncidentsCtx = totalB;
  }

  onRefresh() {
    this.ngOnInit();
    this.userService.logService.refresh()
  }

  private errorHandler(error) {
    this.errorMessage = `Received an error: ${error.message}\nConsider the following:\n1.Are you using Chrome?\n2.Please Restart the Database`;
    this.snackBar.open(error.message, 'Close');
  }


}
