import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/user.service";
import {forkJoin} from 'rxjs/observable/forkJoin';
import {IncidentBookService} from "../../core/incident-book.service";
import {User} from "../../shared/model/user";
import {ProductService} from "../../core/product.service";
import {MatSnackBar} from "@angular/material";
import {LogService} from "../../core/log.service";
import {ArchiveService} from "../../core/archive.service";
import {tap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

// import * as $ from 'jquery'
@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.css']
})
export class ApplicationSettingsComponent implements OnInit {

  showSpinner = false;
  // 1 - Archive 2 -  Reset Queue3 -Reset Incidents  Days 4 - Reset Log
  resetProgressArr = [false, false, false, false]; // me being lazy

  showAdvanceSettings: boolean = false;
  progressMessage;

  constructor(public userSerivce: UserService, public incidentBook: IncidentBookService,
              public productService: ProductService, public snackbar: MatSnackBar, public logService: LogService,
              public archiveService: ArchiveService,
              private sanitizer: DomSanitizer,) {
  }


  ngOnInit() {
  }

  toggleAdvancedSettings() {
    this.showAdvanceSettings = !this.showAdvanceSettings;
  }

  oneClickReset() {
    if (window.confirm("Are you sure you want to Archive and Reset Queue Days and Reset Incident Counts?\nThis will take a while!!!!")){
      this.showSpinner = true;
      this.progressMessage = "Archiving...";
      this.initiateArchive().switchMap(() => {
        return forkJoin(
          this.initiateClearIncidents().pipe(tap(() => {
            this.progressMessage = "Clearing Incidents..."
          })),
          this.initiateClearQueueDays().pipe(tap(() => {
            this.progressMessage = "Clearing Queue...";
          })),
          this.logService.purgeLogs().pipe(tap(() => {
            this.progressMessage = "Purging Logs...";
          }))
        )
      }).subscribe(() => {
        this.showSpinner = false;
        this.snackbar.open('One Click Reset Complete!', 'Close');
      }, err => {
        this.snackbar.open(`An error has occurred ${err.message}`, 'Close')
      })
    }



  }

  archive() {
    if (window.confirm("Are you sure you want to archive everything?\nThis will take a while!!!!")) {
      this.showSpinner = true;
      this.progressMessage = "Archiving...";
      this.initiateArchive().subscribe(resp => {
          this.resetProgressArr[0] = true;
          this.showSpinner = false;
          this.snackbar.open('Application Archive Success!', 'Close');
        },
        err => {
          this.snackbar.open(`An error has occurred ${err.message}`, 'Close')
        })
    }
  }

  clearQueueDays() {
    if (window.confirm("Are you sure you want to reset queue days?")) {
      this.showSpinner = true;
      this.progressMessage = "Clearing Queue Days...";
      this.initiateClearQueueDays().subscribe(() => {
        this.showSpinner = false;
        this.resetProgressArr[1] = true;
        this.snackbar.open('Queue Days Reset', 'Close', {duration: 1000});
      })
    }

  }

  clearEntryLogs() {
    if (window.confirm("Are you sure you want to purge enty logs?")) {
      this.showSpinner = true;
      this.progressMessage = "Clearing Entry Logs...";
      this.logService.purgeLogs().subscribe(() => {
        this.snackbar.open('Logs were purged succesfully', 'Close', {duration: 1000});
        this.showSpinner = false;
        this.resetProgressArr[3] = true;
      })
    }
  }

  clearIncidents() {
    if (window.confirm("Are you sure you want to reset incident counts to 0?")) {
      this.showSpinner = true;
      this.progressMessage = "Clearing Incidents...";
      this.initiateClearIncidents().subscribe(() => {
        this.resetProgressArr[2] = true;
        this.showSpinner = false;
        this.snackbar.open('Incidents Reset', 'Close', {duration: 1000});
      })
    }

  }

  download(filename, text) {
    let btnRef = document.getElementById('btn-download');
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename + '.txt');
    element.setAttribute('id', 'dd');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    // $('#dd').ready
    document.body.removeChild(element);
  }

  private initiateArchive() {
    return forkJoin([this.userSerivce.getUsers(), this.logService.getLogs()]).switchMap(data => {
      return this.archiveService.add(data[1], data[0]).pipe(tap(() => {
        let d = new Date();
        this.download(`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}_QMTOOL_BACKUP`, JSON.stringify({
          users: data[0],
          logs: data[1]
        }));
      }));
    });
  }

  private initiateClearQueueDays() {
    return this.userSerivce.getUsers().switchMap(users => {
      let batchCall = [];
      users.forEach((user: User) => {
        batchCall.push(this.userSerivce.restQueueDays(user).pipe(tap(() => user.currentQDays = 0)));
      });
      return forkJoin(batchCall);
    })
  }

  private initiateClearIncidents() {
    return forkJoin([this.userSerivce.getUsers(), this.productService.getProducts()]).switchMap(data => {
      let users = data[0];
      let products = data[1];
      let batchCall = [];
      users.forEach((user: User) => {
        products.forEach(product => {
          batchCall.push(this.incidentBook.set(user.key, product, 0));
        })
      });
      return forkJoin(batchCall);
    })
  }
}
