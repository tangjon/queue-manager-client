import {NgModule} from '@angular/core';
import {LoginService} from "./login.service";
import {UserService} from "./user.service";
import {LogService} from "./log.service";
import {AngularFireAuthModule} from "angularfire2/auth";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {ProductService} from "./product.service";
import {ArchiveService} from "./archive.service";

@NgModule({
  imports: [
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService, LoginService, LogService, ProductService, ArchiveService]
})
export class CoreModule {
}
