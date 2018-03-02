import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './login/login.component';
import {TeamManagerComponent} from './team-manager/team-manager.component';
import {FormsModule} from '@angular/forms';
import {RccManagementComponent} from './rcc-management/rcc-management.component';
import {ComponentBarComponent} from './shared/component-bar/component-bar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {SettingsComponent} from './shared/settings/settings.component';
import {ActivityLogComponent} from './shared/activity-log/activity-log.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QueueDashboardModule} from './queue-dashboard/queue-dashboard.module';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import { NoticeBoardComponent } from './notice-board/notice-board.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    TeamManagerComponent,
    RccManagementComponent,
    ComponentBarComponent,
    SidebarComponent,
    SettingsComponent,
    ActivityLogComponent,
    NoticeBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QueueDashboardModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
