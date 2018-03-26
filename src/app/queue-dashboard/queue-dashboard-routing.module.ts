import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {QueueDashboardComponent} from "./queue-dashboard.component";

const routes: Routes = [
  {path: 'qm/:id', component: QueueDashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QueueDashboardRoutingModule {
}
