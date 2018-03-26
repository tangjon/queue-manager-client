import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {ActivityLogComponent} from './shared/activity-log/activity-log.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QueueDashboardModule} from './queue-dashboard/queue-dashboard.module';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {NoticeBoardComponent} from './notice-board/notice-board.component';
import {SettingsModule} from "./settings/settings.module";
import {AboutComponent} from './about/about.component';
import {RccDashboardModule} from "./rcc-dashboard/rcc-dashboard.module";
import {TeamDashboardModule} from "./team-dashboard/team-dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SidebarComponent,
    ActivityLogComponent,
    NoticeBoardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    QueueDashboardModule,
    RccDashboardModule,
    TeamDashboardModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    SettingsModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
