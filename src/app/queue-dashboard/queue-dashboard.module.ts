import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueDashboardComponent} from './queue-dashboard.component';
import {ClipboardComponent} from './clipboard/clipboard.component';
import {QueueControlComponent} from './queue-control/queue-control.component';
import {ClipboardModule} from 'ngx-clipboard';
import {QmInfoComponent} from './qm-info/qm-info.component';
import {SharedModule} from "../shared/shared.module";
import {ComponentBarComponent} from "./component-bar/component-bar.component";
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    ComponentBarComponent,
    QueueDashboardComponent,
    ClipboardComponent,
    QueueControlComponent,
    QmInfoComponent
  ]
})
export class QueueDashboardModule {
}
