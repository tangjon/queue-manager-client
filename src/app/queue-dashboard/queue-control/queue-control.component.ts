import {map, pluck, tap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../core/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from "../../shared/model/user";
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalConfirmComponent} from "../../shared/components/modals/modal-confirm/modal-confirm.component";
import {ModalInterface} from "../../shared/components/modals/modal-interface";
import {Helper} from "../../shared/helper/helper";
import {QueueStateService} from "../../core/queuestate.service";

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
  applicationChangeFlag = false;

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

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private modalService: BsModalService,
    private queueStateService: QueueStateService) {
  }

  ngOnInit(): void {
    this.applicationChangeFlag = false;

    // Listen to changes from other clients
    // this.webSocketService.connect().subscribe((data)=>{
    //   if(data.socket_id !== this.webSocketService.socketId) {
    //     this.applicationChangeFlag = true;
    //   }
    // });

    this.queueStateService.state.subscribe(data => {
      if (data.socket_id !== this.queueStateService.webSocketAbstractService.socket.id) {
        this.applicationChangeFlag = true;
      }
    });

    this.id$ = this.route.params.pipe(pluck('id'));
    this.id$.subscribe(value => {
      this.paramId = value;
      this.showSpinner = true;
      this.userService.getUsers().pipe(
        tap((users: Array<User>) => {
          users.forEach(user => {
            this.populateTodayIncident(user);
          });
        })
      ).subscribe((users: Array<User>) => {
          this.showSpinner = false;
          this._userList = users;
          this.updateSummary();
        },
        (error) => {
          this.errorHandler(error);
        });
    });
  }

  populateTodayIncident(user: User) {
    return this.userService.getUserIncidents(user.iNumber).pipe(map((t: any) => {

      return t.data.filter(i => {
        return Helper.dateWithin(new Date(i.timestamp), 'day');
      });
    })).subscribe(res => this.todayUserIncidentDict[user.iNumber] = res);
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
          this.queueStateService.modifyQueue();

        },
        error => {
          this.errorHandler(error);
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
          this.queueStateService.modifyQueue();

        }, error => {
          this.errorHandler(error);
        }
      );
    });
  }

  toggleAvailability(user: User, event) {
    // Send toggle
    this.userService.updateAvailability(user, !user.isAvailable).subscribe(() => {
      this.queueStateService.modifyQueue();
      user.setStatus(!user.isAvailable);
      this.snackBar.open("Toggle Successful", "Close", {duration: 1000});
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
        totalB += element.incidentCounts[this.paramId];
      }
    });
    this.totalIncidentsCtx = totalB;
  }

  hardRefresh() {
    this.ngOnInit();
    this.userService.logService.refresh();
    this.snackBar.open("Refreshing...", "Close", {duration: 3000});
  }

  private errorHandler(error) {
    this.errorMessage = `Received an error: ${error.message}\nConsider the following:\n1.Are you using Chrome?\n2.Please Restart the Database`;
    this.snackBar.open(error.message, 'Close');
  }
}
