import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueDashboardComponent} from './queue-dashboard.component';
import {ClipboardComponent} from './clipboard/clipboard.component';
import {QueueControlComponent} from './queue-control/queue-control.component';
import {ClipboardModule} from 'ngx-clipboard';
import {QmInfoComponent} from './qm-info/qm-info.component';
import {SharedModule} from "../shared/shared.module";

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
    QmInfoComponent
  ],
  exports: [
    QueueDashboardComponent
  ]
})
export class QueueDashboardModule {
}
