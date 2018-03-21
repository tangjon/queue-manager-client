import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {TeamManagerComponent} from './team-manager/team-manager.component';
import {FormsModule} from '@angular/forms';
import {RccManagementComponent} from './rcc-management/rcc-management.component';
import {ComponentBarComponent} from './shared/component-bar/component-bar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {ActivityLogComponent} from './shared/activity-log/activity-log.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QueueDashboardModule} from './queue-dashboard/queue-dashboard.module';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {NoticeBoardComponent} from './notice-board/notice-board.component';
import {SettingsModule} from "./settings/settings.module";
import {QmInfoComponent} from "./shared/qm-info/qm-info.component";
import {AboutComponent} from './about/about.component';
import { NotificationComponent } from './notification/notification.component';
import {NotificationModule} from "./notification/notification.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QmInfoComponent,
    LoginComponent,
    TeamManagerComponent,
    RccManagementComponent,
    ComponentBarComponent,
    SidebarComponent,
    ActivityLogComponent,
    NoticeBoardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QueueDashboardModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    SettingsModule,
    NotificationModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
