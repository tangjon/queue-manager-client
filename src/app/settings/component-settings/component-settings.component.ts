import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../core/product.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-component-settings',
  templateUrl: './component-settings.component.html',
  styleUrls: ['./component-settings.component.css']
})
export class ComponentSettingsComponent implements OnInit {
  products$;

  constructor(public productService: ProductService) {
  }


  ngOnInit() {
    this.products$ = this.productService.getProducts().map((data: string[]) => {
      return data.sort(function (b, a) {
        if (a > b) {
          return -1;
        }
        if (a < b) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      let name = f.value.name;
      f.resetForm();
      console.log(name);
    }
  }
}
