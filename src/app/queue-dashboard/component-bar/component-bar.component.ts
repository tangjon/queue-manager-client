import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {ProductService} from "../../core/product.service";

@Component({
  selector: 'app-component-bar',
  templateUrl: './component-bar.component.html',
  styleUrls: ['./component-bar.component.css']
})
export class ComponentBarComponent implements OnInit {

  productListGrouped: string[];

  constructor(public afAuth: AngularFireAuth, public productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(arrProductList => {
      this.productListGrouped = this.formatComponentRows(arrProductList);
    })
  }

  formatComponentRows(arr) {
    let groupIndex = 0;
    let numOfGroups = Math.ceil(arr.length / 4);
    let newArr = [];
    for (let i = 0; i < numOfGroups; i++) {
      newArr[i] = [];
    }
    for (let i = 0; i < arr.length; i++) {
      newArr[groupIndex][i % 4] = arr[i];
      if ((i + 1) % 4 == 0) {
        groupIndex = groupIndex + 1;
      }
    }
    return newArr;
  }

  getRouterLink(componentId) {
    return `/qm/${componentId}`
  }

}
