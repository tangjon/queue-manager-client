
import {of as observableOf, forkJoin, Observable} from 'rxjs';

import {switchMap, tap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/user.service";
import {User} from "../../shared/model/user";
import {ProductService} from "../../core/product.service";
import {MatSnackBar} from "@angular/material";
import {LogService} from "../../core/log.service";
import {ArchiveService} from "../../core/archive.service";
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

  constructor(public userSerivce: UserService,
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
      forkJoin(
        this.userSerivce.resetAllUser().pipe(tap(() => {
          this.progressMessage = "Clearing Queue & Incidents...";
        })),
        this.logService.purgeLogs().pipe(tap(() => {
          this.progressMessage = "Purging Logs...";
        }))
      ).subscribe(() => {
        this.showSpinner = false;
        this.snackbar.open('One Click Reset Complete!', 'Close');
      }, err => {
        this.snackbar.open(`An error has occurred ${err.message}`, 'Close')
      })
    }
  }

  /** @deprecated  */
  archive() {
    if (window.confirm("Are you sure you want to archive everything?\nThis will take a while!!!!")) {
      this.showSpinner = true;
      this.progressMessage = "Archiving...";
    }
  }

  resetUsers() {
    if (window.confirm("Are you sure you want to reset all users?")) {
      this.showSpinner = true;
      this.progressMessage = "Clearing Queue Days and Incidents...";
      this.userSerivce.resetAllUser().subscribe(() => {
        this.showSpinner = false;
        this.resetProgressArr[1] = true;
        this.snackbar.open('Queue Days and incidents reset', 'Close', {duration: 1000});
      })
    }

  }

  clearActionEntryLogs() {
    if (window.confirm("Are you sure you want to purge entry logs?")) {
      this.showSpinner = true;
      this.progressMessage = "Clearing Entry Logs...";
      this.logService.purgeLogs().subscribe(() => {
        this.snackbar.open('Logs were purged successfully', 'Close', {duration: 1000});
        this.showSpinner = false;
        this.resetProgressArr[3] = true;
      })
    }
  }
  /** @deprecated  */
  download(filename, text) {
    // let btnRef = document.getElementById('btn-download');
    // let element = document.createElement('a');
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    // element.setAttribute('download', filename + '.txt');
    // element.setAttribute('id', 'dd');
    // element.style.display = 'none';
    // document.body.appendChild(element);
    // element.click();
    // // $('#dd').ready
    // document.body.removeChild(element);
  }
}
