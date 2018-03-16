import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/user.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {IncidentBookService} from "../../core/incident-book.service";
import {User} from "../../model/user";
import {ProductService} from "../../core/product.service";
import {MatSnackBar} from "@angular/material";
import {LogService} from "../../core/log.service";
import {ArchiveService} from "../../core/archive.service";
import {combineLatest} from "rxjs/observable/combineLatest";
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


  constructor(public userSerivce: UserService, public incidentBook: IncidentBookService,
              public productService: ProductService, public snackbar: MatSnackBar, public logService: LogService,
              public archiveService: ArchiveService,
              private sanitizer: DomSanitizer,) {
  }


  ngOnInit() {
  }

  archive() {
    if (window.confirm("Are you sure you want to Archive and Reset Queue Days and Reset Incident Counts?\nThis will take a while!!!!")) {
      this.showSpinner = true;
      combineLatest([this.userSerivce.getUsers(), this.logService.getLogs()]).switchMap(data => {
        return this.archiveService.add(data[1], data[0]).pipe(tap(() => {

          let d = new Date();
          this.download(`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}_QMTOOL_BACKUP`, JSON.stringify({users: data[0], logs: data[1]}));
        }));
      }).subscribe(resp => {
          this.resetProgressArr[0] = true;
          this.showSpinner = false;
          this.snackbar.open('Application Archive Reset Success!', 'Close', {duration: 1000});
        },
        err => {
          this.snackbar.open(`An error has occurred ${err.message}`, 'Close')
        })
    }
  }

  clearQueueDays() {
    if (window.confirm("Are you sure you want to reset Queue Days?")) {
      this.showSpinner = true;

      // this.userSerivce.getUsers().switchMap(users => {
      //   console.log(JSON.stringify(users))
      //   let batchCall = [];
      //   users.forEach((user: User) => {
      //       batchCall.push(this.userSerivce.updateQueueDays(user, 0));
      //   });
      //   return forkJoin(batchCall);
      // }).subscribe(() => {
      //   this.showSpinner = false;
      //   this.snackbar.open('Queue Days Reset', 'Close', {duration: 1000});
      // })

      this.userSerivce.getUsers().switchMap(users => {
        let batchCall = [];
        users.forEach((user: User) => {
          batchCall.push(this.userSerivce.resetRCC(user));
        });
        return forkJoin(batchCall);
      }).subscribe(() => {
        this.showSpinner = false;
        this.resetProgressArr[1] = true;
        this.snackbar.open('Queue Days Reset', 'Close', {duration: 1000});
      })
    }

  }

  clearEntryLogs() {
    if (window.confirm("Are you sure you want to purge enty logs?")) {
      this.showSpinner = true;
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
      forkJoin([this.userSerivce.getUsers(), this.productService.getProducts()]).switchMap(data => {
        let users = data[0];
        let products = data[1];
        let batchCall = [];
        users.forEach((user: User) => {
          products.forEach(product => {
            batchCall.push(this.incidentBook.setCount(user.key, product, 0));
          })
        });
        return forkJoin(batchCall);
      }).subscribe(() => {
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

  promptDownload() {
    this.download("", "HELLO WORLD")
  }
}
