import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/user.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {IncidentBookService} from "../../core/incident-book.service";
import {User} from "../../model/user";
import {ProductService} from "../../core/product.service";
import {MatSnackBar} from "@angular/material";
import {LogService} from "../../core/log.service";
import {ArchiveService} from "../../core/archive.service";

@Component({
  selector: 'app-application-settings',
  templateUrl: './application-settings.component.html',
  styleUrls: ['./application-settings.component.css']
})
export class ApplicationSettingsComponent implements OnInit {

  showSpinner = false;

  constructor(public userSerivce: UserService, public incidentBook: IncidentBookService,
              public productService: ProductService, public snackbar: MatSnackBar, public logService: LogService,
              public archiveService: ArchiveService) {
  }


  ngOnInit() {
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
        this.snackbar.open('Queue Days Reset', 'Close', {duration: 1000});
      })
    }

  }

  clearEntryLogs() {

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
        this.showSpinner = false;
        this.snackbar.open('Incidents Reset', 'Close', {duration: 1000});
      })
    }

  }

  archiveAndReset() {

    forkJoin([this.userSerivce.getUsers(), this.logService.getLogs()]).map(t => {
      console.log(t);
      return t;
    }).subscribe(data => {
      console.log(data);
    })

  }

}
