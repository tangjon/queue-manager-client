import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationComponent} from "./components/notification/notification.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AppRoutingModule} from "../app-routing.module";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import { ModalConfirmComponent } from './components/modals/modal-confirm/modal-confirm.component';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { ModalInputComponent } from './components/modals/modal-input/modal-input.component';

/*
* entryComponents: Modal components need to be here or they won't work
* */

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
    ModalInfoComponent,
    ModalInputComponent,
  ],
  exports: [
    SidebarComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent
  ],
  entryComponents:[
    ModalConfirmComponent,
    ModalInfoComponent,
    ModalInputComponent
  ]
})
export class SharedModule { }
