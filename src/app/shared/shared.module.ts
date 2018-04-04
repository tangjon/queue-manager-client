import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationComponent} from "./components/notification/notification.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AppRoutingModule} from "../app-routing.module";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  declarations: [
    SidebarComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent,
    ModalConfirmComponent,
    ModalInfoComponent
  ],
  exports: [
    SidebarComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent
  ],
  entryComponents:[
    ModalConfirmComponent,
    ModalInfoComponent
  ]
})
export class SharedModule { }
