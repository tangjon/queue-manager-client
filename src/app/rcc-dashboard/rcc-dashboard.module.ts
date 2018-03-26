import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RccDashboardComponent} from "./rcc-dashboard.component";
import {RccManagementComponent} from "./rcc-management/rcc-management.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [RccDashboardComponent, RccManagementComponent]
})
export class RccDashboardModule {
}
