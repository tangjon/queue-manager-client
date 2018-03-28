import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings/settings.component";
import {AboutComponent} from "./about/about.component";
import {RccDashboardComponent} from "./rcc-dashboard/rcc-dashboard.component";
import {TeamDashboardComponent} from "./team-dashboard/team-dashboard.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'qm/NW',
    pathMatch: 'full'
  },
  {path: 'home', redirectTo: 'qm/NW'},
  {path: 'manage', component: TeamDashboardComponent},
  {path: 'rcc', component: RccDashboardComponent},
  // {path: 'qm/:id', component: QueueDashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'dashboard', component: DashboardComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
