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
import {Helper} from "../../shared/helper/helper";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-queue-control',
  templateUrl: './queue-control.component.html',
  styleUrls: ['./queue-control.component.css']
})
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

  todayUserIncidentDict: object = {};
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
      this.userService.getUsers().pipe(
        tap((users: Array<User>) => {
          users.forEach(user => {
            this.populateTodayIncident(user)
          })
        })
      ).subscribe((users: Array<User>) => {
          this.showSpinner = false;
          this._userList = users;
          this.updateSummary();
        },
        (error) => {
          this.errorHandler(error)
        });
    });
  }

  populateTodayIncident(user: User) {
    return this.userService.getUserIncidents(user.iNumber).map((t: any) => {
      t.data.filter(i => {
        return Helper.dateWithin(new Date(i.timestamp), 'day');
      });
      return t.data;
    }).subscribe(res=>this.todayUserIncidentDict[user.iNumber] = res)
  }

  onAddIncident(user: User) {
    let amount = 1;
    let bsModalRef: ModalInterface = this.modalService.show(ModalConfirmComponent);
    bsModalRef.content.title = "Incident Assignment";
    bsModalRef.content.message = `You are assigning +${amount} incident(s) to ${user.name()}(${user.iNumber})`;
    bsModalRef.content.onCancel.subscribe(() => {
    });
    bsModalRef.content.onConfirm.subscribe(() => {
      this.userService.addIncident(user, this.paramId).subscribe(() => {
          this.snackBar.open('Incident Added', 'Close', {duration: 1000});
          user.incidentCounts[this.paramId]++;
          this.updateSummary();
          this.populateTodayIncident(user);
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
    bsModalRef.content.message = `You are removing ${amount} incident(s) from ${user.name()}(${user.iNumber})`;
    bsModalRef.content.onCancel.subscribe(() => {
    });
    bsModalRef.content.onConfirm.subscribe(() => {
      this.userService.removeIncident(user, this.paramId).subscribe(() => {
          this.snackBar.open('Incident Removed', 'Close', {duration: 1000});
          user.incidentCounts[this.paramId]--;
          this.updateSummary();
          this.populateTodayIncident(user);
        }, error => {
          this.errorHandler(error)
        }
      );
    });
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

  toggleAvailability(user: User, event) {
    // Prevent double click toggle
    let target = <HTMLSelectElement> event.target;
    target.disabled = true;
    // Send toggle
    this.userService.updateAvailability(user, !user.isAvailable).subscribe(() => {
      user.setStatus(!user.isAvailable);
      this.snackBar.open("Toggle Succesful", "Close", {duration: 1000})
    }, (error) => alert(error.message));
  }

  updateSummary() {
    // total of all products
    let totalA = 0;
    this._userList.forEach(user => {
      totalA += user.getIncidentTotal();
    });
    this.totalIncidents = totalA;

    // total of product
    let totalB = 0;
    this._userList.forEach(element => {
      if (element.incidentCounts[this.paramId]) {
        totalB += element.incidentCounts[this.paramId]
      }
    });
    this.totalIncidentsCtx = totalB;
  }

  hardRefresh() {
    this.ngOnInit();
    this.userService.logService.refresh()
  }

  private errorHandler(error) {
    this.errorMessage = `Received an error: ${error.message}\nConsider the following:\n1.Are you using Chrome?\n2.Please Restart the Database`;
    this.snackBar.open(error.message, 'Close');
  }


}
