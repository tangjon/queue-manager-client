import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamDashboardComponent} from "./team-dashboard.component";
import {TeamManagerComponent} from "./team-manager/team-manager.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AddUserFormComponent} from './add-user-form/add-user-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [TeamDashboardComponent, TeamManagerComponent, AddUserFormComponent]
})
export class TeamDashboardModule {
}
