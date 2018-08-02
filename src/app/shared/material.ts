import {MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule],
  exports: [MatButtonModule, MatSnackBarModule, MatIconModule, MatSnackBarModule, MatTooltipModule],
})

export class MaterialModule {

}
