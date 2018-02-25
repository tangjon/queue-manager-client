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
import { ClipboardModule } from 'ngx-clipboard'
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ClipboardComponent } from './shared/clipboard/clipboard.component';
import { ComponentBarComponent } from './shared/component-bar/component-bar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { ActivityLogComponent } from './shared/activity-log/activity-log.component';
import { ActivityBookService } from './services/activity-book.service';
import { QmInfoComponent } from './shared/qm-info/qm-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IncidentSetService } from './services/incident-set.service';
import { RoleSetService } from './services/role-set.service';
import { UserSetService } from './services/user-set.service';
import { LoginService } from './services/login.service';
import { LogService } from './services/log.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'qm/NW',
    pathMatch: 'full'
  },
  { path: 'home', redirectTo: 'qm/NW' },
  { path: 'manage', component: TeamManagerComponent },
  { path: 'rcc', component: RccManagementComponent },
  { path: 'qm/:id', component: QueueControlComponent },
  { path: 'settings', component: SettingsComponent }
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
    LoadingSpinnerComponent,
    ClipboardComponent,
    ComponentBarComponent,
    SidebarComponent,
    SettingsComponent,
    ActivityLogComponent,
    QmInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ClipboardModule,
    RouterModule.forRoot(
      appRoutes, { useHash: true }),
  ],
  providers: [UserService, ActivityBookService, IncidentSetService, RoleSetService, UserSetService, LoginService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
