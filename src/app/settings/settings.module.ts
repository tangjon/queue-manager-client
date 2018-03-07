import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoticeBoardSettingComponent} from './notice-board-setting/notice-board-setting.component';
import {ApplicationSettingsComponent} from './application-settings/application-settings.component';
import {ComponentSettingsComponent} from './component-settings/component-settings.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SettingsComponent, NoticeBoardSettingComponent, ApplicationSettingsComponent, ComponentSettingsComponent]
})
export class SettingsModule {
}
