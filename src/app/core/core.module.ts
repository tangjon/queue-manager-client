import {NgModule} from '@angular/core';
import {LoginService} from "./login.service";
import {RoleSetService} from "./role-set.service";
import {UserSetService} from "./user-set.service";
import {UserService} from "./user.service";
import {LogService} from "./log.service";
import {IncidentSetService} from "./incident-set.service";
import {AngularFireAuthModule} from "angularfire2/auth";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {ProductService} from "./product.service";

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService, IncidentSetService, RoleSetService, UserSetService, LoginService, LogService, ProductService]
})
export class CoreModule {
}
