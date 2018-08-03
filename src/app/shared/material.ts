import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import {NgModule} from "@angular/core";


@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatSlideToggleModule],
})

export class MaterialModule {

}
