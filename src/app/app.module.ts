import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { QueueControlComponent } from './queue-control/queue-control.component';
import { TeamManagerComponent } from './team-manager/team-manager.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RccManagementComponent } from './rcc-management/rcc-management.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const appRoutes: Routes = [
  { path: '', component: QueueControlComponent },
  { path: 'manage', component: TeamManagerComponent },
  { path: 'rcc', component: RccManagementComponent },
  { path: ':id', component: GroupDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    QueueControlComponent,
    TeamManagerComponent,
    RccManagementComponent,
    GroupDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule, 
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
