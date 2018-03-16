import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../core/product.service";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../core/user.service";

@Component({
  selector: 'app-component-settings',
  templateUrl: './component-settings.component.html',
  styleUrls: ['./component-settings.component.css']
})
export class ComponentSettingsComponent implements OnInit {
  showSpinner = true;
  productList = [];

  constructor(public productService: ProductService, public snackBar: MatSnackBar, public userService: UserService) {
  }


  ngOnInit() {
    this.productService.getProducts().map((data: string[]) => {
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
    }).subscribe(products => {
      this.productList = products;
      this.showSpinner = false;
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      let productId = f.value.name;
      this.addProduct(productId);
      f.resetForm();
    }
  }

  removeProduct(productId) {
    if (window.confirm(`Are you sure you want to remove component '${productId}'`)) {
      this.showSpinner = true;
      this.userService.removeComponent(productId).subscribe(() => {
        this.showSpinner = false;
        this.snackBar.open(`Removed Support Product '${productId}'`, 'Close', {duration: 1000});
        this.productList.splice(this.productList.indexOf(productId), 1);
      })
    }
  }

  addProduct(productId) {
    this.showSpinner = true;
    this.userService.addComponent(productId).subscribe(() => {
      this.showSpinner = false;
      this.snackBar.open(`Added New Support Product '${productId}'`, 'Close', {duration: 1000});
      this.productList.push(productId);
    })
  }
}