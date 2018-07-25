import {Component} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/model/user';
import {UserService} from '../../core/user.service';
import {NgForm} from '@angular/forms'
import {ProductService} from "../../core/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(public db: AngularFireDatabase, public userService: UserService, public productService: ProductService, public snackBar: MatSnackBar) {
    this.fetchProducts();
    // Get Users
    this.users = userService.getUsers();
    this.users.subscribe(r => {
      this.showSpinner = false;
      this.userList = r.sort(
        function (a, b) {
          if (a.firstName < b.firstName)
            return -1;
          if (a.firstName > b.firstName)
            return 1;
          return 0;
        });
    }, error => {
      this.errorMessage = error.message;
    })
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(r => {
      this.productList = r;
    })
  }

  updateUser(user: User, name: string, iNumber: string, usage: string, i_threshold: string) {
    if (user && name && iNumber && usage && i_threshold) {
      user.firstName = name;
      user.iNumber = iNumber;
      user.usagePercent = parseFloat(usage);
      user.iThreshold = parseInt(i_threshold);
      this.userService.updateUserMeta(user).subscribe(r => {
        this.snackBar.open("Update successful", "Close", {duration: 3000})
      });
    }

  }

  deleteItem(user: User) {
    let prompt = window.confirm("Are you sure you want to delete: " + user.name() + "(" + user.iNumber + ")" + "?");
    if (prompt) {
      this.userService.deleteUser(user.iNumber).subscribe(res => {
        if (res.code == 200) {
          this.userService.getUsers().subscribe(user => {
            this.userList = user;
          })
        }
      })
    }
  }

  toggleRole(user: User, role: string) {
    if (window.confirm(`Are you sure you want to toggle '${role}' for ${user.name()}`)) {
      let currBool = user.hasRole(role);
      this.userService.updateSupport(user, role, !currBool).subscribe(t => {
        user.supportedProducts[role] = !currBool;
      });
    }
  }

  onAddUser(f: NgForm) {
    if (f.valid && f.value.name.trim() && f.value.iNumber.trim()) {
      this.userService.addUser(f.value.name, f.value.iNumber).subscribe((user: User) => {
        this.userList.push(user);
        f.resetForm();
      }, error => {
        this.snackBar.open(error.message, "Close", {duration: 3000})
      })
    } else {
      this.snackBar.open("Please enter valid inputs", "Close", {duration: 3000})
    }
  }

}
