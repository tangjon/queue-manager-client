import {Component} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {UserService} from '../core/user.service';
import {NgForm} from '@angular/forms'
import {ProductService} from "../core/product.service";

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent {
  showSpinner: boolean = true;
  itemsRef: AngularFireList<any>;
  users: Observable<any[]>;
  userList: Array<User>;
  errorMessage: string;

  productList: string[];

  constructor(public db: AngularFireDatabase, public userService: UserService, public productService: ProductService) {
    this.fetchProducts();
    // Get Users
    this.users = userService.getUsers();
    this.users.subscribe(r => {
      this.showSpinner = false;
      this.userList = r.sort(
        function (a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
    }, error => {
      this.errorMessage = error;
    })
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(r => {
      this.productList = r;
    })
  }

  addUser(fName: string, iNumber: string) {
    if (fName && iNumber) {
      this.userService.addUser(fName, iNumber).subscribe((user: User) => {
        this.userList.push(user);
      })
    }
  }

  updateItem(user: User, fName: string, iNumber: string, usage: string) {
    if (user && fName && iNumber && usage) {
      let iUsage = parseFloat(usage);
      user.name = fName;
      user.iNumber = iNumber;
      user.usagePercent = iUsage;
      this.userService.updateUser(user).subscribe(r => {
      });
    }

  }

  deleteItem(user: User) {
    let prompt = window.confirm("Are you sure you want to delete: " + user.name + "(" + user.iNumber + ")" + "?");
    if (prompt) {
      this.userService.deleteUser(user.key).subscribe(res => {
        if (res) {
          this.userList = this.userList.filter(function (el) {
            return el.key !== user.key;
          })
        }
      })
    }
  }

  deleteEverything() {
    this.userService.deleteEverything();
  }

  toggleRole(user: User, role: string) {
    let currBool = user.hasRole(role);
    this.userService.updateSupport(user, role, !currBool).subscribe(t => {
      user.support.areas[role] = !user.hasRole(role);
    })
  }

  onAddUser(f: NgForm) {
    if (f.valid) {
      this.userService.addUser(f.value.name, f.value.iNumber).subscribe((user: User) => {
        this.userList.push(user);
      })
    }
  }
}
