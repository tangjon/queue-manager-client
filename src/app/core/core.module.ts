import {NgModule} from '@angular/core';
import {LoginService} from "./login.service";
import {UserSetService} from "./user-set.service";
import {UserService} from "./user.service";
import {LogService} from "./log.service";
import {AngularFireAuthModule} from "angularfire2/auth";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {ProductService} from "./product.service";
import {SupportBookService} from "./support-book.service";
import {IncidentBookService} from "./incident-book.service";

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService, UserSetService, LoginService, LogService, ProductService, SupportBookService, IncidentBookService]
})
export class CoreModule {
}
