import {MatButtonModule, MatSnackBarModule} from '@angular/material';
import {NgModule} from "@angular/core";


@NgModule({
  imports: [MatButtonModule, MatSnackBarModule],
  exports: [MatButtonModule, MatSnackBarModule],
})

export class MaterialModule {

}
