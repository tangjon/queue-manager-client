import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueueDashboardComponent} from './queue-dashboard.component';
import {ClipboardComponent} from './clipboard/clipboard.component';
import {QueueControlComponent} from './queue-control/queue-control.component';
import {ClipboardModule} from 'ngx-clipboard';
import {SharedModule} from "../shared/shared.module";
import {ShiftInfoComponent} from './shift-info/shift-info.component';
import {ComponentBarComponent} from "./component-bar/component-bar.component";
import {QmInfoComponent} from "./qm-info/qm-info.component";
import {QueueDashboardRoutingModule} from "./queue-dashboard-routing.module";
import {FilterPipe, IsAvailable, SortByAlpha, SortByAVGQDay, SortByPriority} from './pipe/filter.pipe';

@NgModule({
  declarations: [
    ComponentBarComponent,
    QueueDashboardComponent,
    ClipboardComponent,
    QueueControlComponent,
    ShiftInfoComponent,
    QmInfoComponent,
    FilterPipe,
    IsAvailable,
    SortByAVGQDay,
    SortByAlpha,
    SortByPriority
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    SharedModule,
    QueueDashboardRoutingModule
  ]
})
export class QueueDashboardModule {
}
