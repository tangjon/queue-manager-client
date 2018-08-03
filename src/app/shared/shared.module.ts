import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationComponent} from "./components/notification/notification.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AppRoutingModule} from "../app-routing.module";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ModalConfirmComponent} from './components/modals/modal-confirm/modal-confirm.component';
import {ModalInfoComponent} from './components/modals/modal-info/modal-info.component';
import {ModalInputComponent} from './components/modals/modal-input/modal-input.component';
import {ModalServerErrorComponent} from './components/modals/modal-server-error/modal-server-error.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatTooltipModule} from '@angular/material';
import {MaterialModule} from "./material";
/*
* entryComponents: Modal components need to be here or they won't work
* */

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    // TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    SidebarComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent,
    ModalConfirmComponent,
    ModalInfoComponent,
    ModalInputComponent,
    ModalServerErrorComponent,
  ],
  exports: [
    SidebarComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent,
    // TooltipModule,
    MaterialModule
  ],
  entryComponents:[
    ModalConfirmComponent,
    ModalInfoComponent,
    ModalInputComponent,
    ModalServerErrorComponent
  ]
})
export class SharedModule { }
