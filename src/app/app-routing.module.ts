import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamManagerComponent} from "./team-manager/team-manager.component";
import {QueueDashboardComponent} from "./queue-dashboard/queue-dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {RccManagementComponent} from "./rcc-management/rcc-management.component";
import {SettingsComponent} from "./shared/settings/settings.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'qm/NW',
    pathMatch: 'full'
  },
  {path: 'home', redirectTo: 'qm/NW'},
  {path: 'manage', component: TeamManagerComponent},
  {path: 'rcc', component: RccManagementComponent},
  {path: 'qm/:id', component: QueueDashboardComponent},
  {path: 'settings', component: SettingsComponent}
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
