import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationComponent} from "./notification/notification.component";

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    NotificationComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
