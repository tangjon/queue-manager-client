import {
  MatButtonModule, MatIconModule, MatSlideToggleModule, MatSnackBarModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";


@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatSlideToggleModule, MatToolbarModule],
  exports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatSlideToggleModule, MatToolbarModule],
})

export class MaterialModule {

}
