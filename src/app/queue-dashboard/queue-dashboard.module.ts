import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueDashboardComponent} from './queue-dashboard.component';
import {ClipboardComponent} from './clipboard/clipboard.component';
import {QueueControlComponent} from './queue-control/queue-control.component';
import {ClipboardModule} from 'ngx-clipboard';
import {SharedModule} from "../shared/shared.module";
import {ShiftInfoComponent} from './shift-info/shift-info.component';

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    SharedModule
  ],
  declarations: [
    QueueDashboardComponent,
    ClipboardComponent,
    QueueControlComponent,
    ShiftInfoComponent,
  ]
})
export class QueueDashboardModule {
}
