webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div#qClipboard {\r\n    padding-bottom: 20px;\r\n    width: 30%;\r\n    margin: auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<div class=\"container\">\r\n    <app-login></app-login>\r\n    <div *ngIf=\"afAuth.authState | async as user\">\r\n        <div class=\"text-center\" id=\"qClipboard\">\r\n            <p>click to copy</p>\r\n            <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"clipBoardText\" #inputTarget>\r\n                <span class=\"input-group-btn\">\r\n                    <button class=\"btn btn-default\" [class.btn-success]=\"isCopied2\" type=\"button\" [ngxClipboard]=\"inputTarget\" (cbOnSuccess)=\"isCopied2 = true\">copy</button>\r\n                </span>\r\n            </div>\r\n        </div>\r\n\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(db, afAuth) {
        this.afAuth = afAuth;
        this.title = 'app';
        this.clipBoardText = "MICKEYMOUSE";
    }
    AppComponent.prototype.copyToClipboard = function () {
        console.log(this);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_navbar_navbar_component__ = __webpack_require__("../../../../../src/app/shared/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_footer_footer_component__ = __webpack_require__("../../../../../src/app/shared/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__queue_control_queue_control_component__ = __webpack_require__("../../../../../src/app/queue-control/queue-control.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__team_manager_team_manager_component__ = __webpack_require__("../../../../../src/app/team-manager/team-manager.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__rcc_management_rcc_management_component__ = __webpack_require__("../../../../../src/app/rcc-management/rcc-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__group_detail_group_detail_component__ = __webpack_require__("../../../../../src/app/group-detail/group-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_clipboard__ = __webpack_require__("../../../../ngx-clipboard/dist/ngx-clipboard.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var appRoutes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_10__queue_control_queue_control_component__["a" /* QueueControlComponent */] },
    { path: 'manage', component: __WEBPACK_IMPORTED_MODULE_11__team_manager_team_manager_component__["a" /* TeamManagerComponent */] },
    { path: 'rcc', component: __WEBPACK_IMPORTED_MODULE_14__rcc_management_rcc_management_component__["a" /* RccManagementComponent */] },
    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_15__group_detail_group_detail_component__["a" /* GroupDetailComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__shared_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__shared_footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_10__queue_control_queue_control_component__["a" /* QueueControlComponent */],
                __WEBPACK_IMPORTED_MODULE_11__team_manager_team_manager_component__["a" /* TeamManagerComponent */],
                __WEBPACK_IMPORTED_MODULE_14__rcc_management_rcc_management_component__["a" /* RccManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_15__group_detail_group_detail_component__["a" /* GroupDetailComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_16_ngx_clipboard__["a" /* ClipboardModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_router__["c" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 class=\"qTable-title\">{{ subgroup }}</h2>\r\n"

/***/ }),

/***/ "../../../../../src/app/group-detail/group-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupDetailComponent = /** @class */ (function () {
    function GroupDetailComponent(route, router) {
        this.route = route;
        this.router = router;
        this.subgroup = this.route.snapshot.paramMap.get('id');
    }
    GroupDetailComponent.prototype.ngOnInit = function () {
        var test = this.route.snapshot.paramMap.get('id');
        console.log(test);
    };
    GroupDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-group-detail',
            template: __webpack_require__("../../../../../src/app/group-detail/group-detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/group-detail/group-detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], GroupDetailComponent);
    return GroupDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#login-form {\r\n    margin-left: 30%;\r\n    margin-right: 30%;\r\n    margin-top: 3%;\r\n    padding: 50px;\r\n    color: white;\r\n    background-color: #343a40;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"afAuth.authState | async as user; else showLogin\">\r\n</div>\r\n<ng-template #showLogin>\r\n  <div id=\"login-form\" bclass=\"text-center\">\r\n    <div class=\"logo\">Login</div>\r\n    <!-- Main Form -->\r\n    <div class=\"form-group\">\r\n      <label for=\"exampleInputEmail1\">Username</label>\r\n      <input #useremail type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"exampleInputPassword1\">Password</label>\r\n      <input #userpass type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\r\n    </div>\r\n\r\n    <button (click)=\"login(useremail.value,userpass.value)\">Login</button>\r\n\r\n    <div *ngIf=\"authFlag == false\" class=\"alert alert-danger\" role=\"alert\">\r\n      {{ authMessage }}\r\n    </div>\r\n  </div>\r\n\r\n\r\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = /** @class */ (function () {
    function LoginComponent(afAuth) {
        this.afAuth = afAuth;
        this.authFlag = true;
        this.authMessage = "";
    }
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        // Todo this is work around
        username += "@scout33.org";
        this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(username, password)
            .catch(function (err) { return _this.handleError(err); });
    };
    LoginComponent.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    LoginComponent.prototype.handleError = function (err) {
        this.authFlag = false;
        this.authMessage = err.code;
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/model/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User(iNumber, name, key) {
        this.iNumber = iNumber;
        this.name = name;
        this.key = key;
        this.isAvailable = true;
        this.totalIncident = 0;
        this.currentQDays = 0;
        this.usagePercent = 1.0;
    }
    User.prototype.checkAvailable = function () {
        return this.isAvailable;
    };
    User.prototype.setAvailable = function (bool) {
        this.isAvailable = bool;
    };
    User.prototype.setUsage = function (percent) {
        this.usagePercent = percent;
    };
    return User;
}());



/***/ }),

/***/ "../../../../../src/app/queue-control/queue-control.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/queue-control/queue-control.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive shadow\">\r\n  <h1 class=\"qTable-title\">Queue Management</h1>\r\n  <table class=\"table qTable\">\r\n    <thead>\r\n      <tr>\r\n        <th colspan=\"1\" scope=\"col\"></th>\r\n        <th colspan=\"3\" scope=\"col\">\r\n          {{ (users | async)?.length }} Employees in EPM-BPC team</th>\r\n        <th colspan=\"5\" scope=\"col\">Something here</th>\r\n      </tr>\r\n      <tr>\r\n        <th scope=\"col\">#</th>\r\n        <th scope=\"col\">Name</th>\r\n        <th scope=\"col\">Assign</th>\r\n        <th scope=\"col\">Remove</th>\r\n        <th scope=\"col\">Amount</th>\r\n        <th scope=\"col\">Total</th>\r\n        <th scope=\"col\">AVG Q-DAY</th>\r\n        <th scope=\"col\">Status</th>\r\n        <th scope=\"col\">Actions</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let user of users | async; let i = index\">\r\n        <th scope=\"row\">{{i + 1}}</th>\r\n        <td>{{user.name + \"(\" + user.iNumber + \")\"}}</td>\r\n        <td>x</td>\r\n        <td>x</td>\r\n        <td>x</td>\r\n        <td>x</td>\r\n        <td>x</td>\r\n        <td>{{ user.isAvailable }}</td>\r\n        <td>\r\n          <button (click)=\"toggleAvailability(user.key, !user.isAvailable)\">Toggle</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/queue-control/queue-control.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueueControlComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QueueControlComponent = /** @class */ (function () {
    function QueueControlComponent(db) {
        this.db = db;
        this.itemsRef = db.list('users', function (ref) { return ref.orderByChild('name'); });
        this.users = this.itemsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    }
    QueueControlComponent.prototype.toggleAvailability = function (key, bool) {
        this.itemRef = this.db.object('users/' + key);
        this.itemRef.update({ isAvailable: bool });
    };
    QueueControlComponent.prototype.logIt = function (msg) {
        console.log(msg);
    };
    QueueControlComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-queue-control',
            template: __webpack_require__("../../../../../src/app/queue-control/queue-control.component.html"),
            styles: [__webpack_require__("../../../../../src/app/queue-control/queue-control.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], QueueControlComponent);
    return QueueControlComponent;
}());



/***/ }),

/***/ "../../../../../src/app/rcc-management/rcc-management.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "tbody tr:hover {\r\n    background-color: rgb(202, 202, 202);\r\n}\r\n\r\ndiv#rcc-form {\r\n    background-color: #ffffff;\r\n    padding: 42px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rcc-management/rcc-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive shadow\">\r\n    <h1 class=\"qTable-title\">RCC Data</h1>\r\n\r\n    <table class=\"table qTable\">\r\n        <thead>\r\n            <tr>\r\n                <th scope=\"col\">Name</th>\r\n                <th scope=\"col\">Current Queue Days</th>\r\n                <th scope=\"col\">% Usage</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr *ngFor=\"let user of users | async; let i = index\" (click)=\"selectUser(user)\">\r\n                <td>{{user.name + \"(\" + user.iNumber + \")\"}}</td>\r\n                <td>{{user.currentQDays}}</td>\r\n                <td>x</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n<p class=\"instruction\">Click user to edit RCC information</p>\r\n<div id=\"rcc-form\" class=\"row\">\r\n    <div class=\"col-4\">\r\n        <b>Selected User:</b>\r\n        <span *ngIf=\"selectedUser\"> {{selectedUser.name + \" (\" + selectedUser.iNumber + \")\"}} </span>\r\n    </div>\r\n    <div class=\"col-4\">\r\n        <b>Value:</b>\r\n        <input #inputValue type=\"number\" placeholder=\"Value\">\r\n    </div>\r\n    <div class=\"col-1\">\r\n        <button class=\"btn btn-success\" (click)=\"updateRCC(selectedUser, inputValue.value)\" type=\"button\"> Update</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/rcc-management/rcc-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RccManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RccManagementComponent = /** @class */ (function () {
    function RccManagementComponent(db) {
        this.db = db;
        this.itemsRef = db.list('users');
        this.users = this.itemsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    }
    RccManagementComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
        console.log(user);
    };
    RccManagementComponent.prototype.updateRCC = function (user, val) {
        this.db.object('users/' + user.key).update({ currentQDays: val });
    };
    RccManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-rcc-management',
            template: __webpack_require__("../../../../../src/app/rcc-management/rcc-management.component.html"),
            styles: [__webpack_require__("../../../../../src/app/rcc-management/rcc-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], RccManagementComponent);
    return RccManagementComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\r\n  <div class=\"container\">\r\n    <span class=\"text-muted\">Place sticky footer content here.</span>\r\n  </div>\r\n</footer>"

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#component-menu {\r\n    border-style: solid;\r\n    border-width: 2px;\r\n    margin-bottom: 15px;\r\n    background-color: #465b77;\r\n}\r\n\r\n#component-menu .col {\r\n    background-color: #262f3d;\r\n}\r\n\r\n#component-menu a {\r\n    color: white;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: 500;\r\n}\r\n\r\n#component-menu .col{\r\n    border-width: 2px;\r\n    border-style: solid;\r\n}\r\n\r\n#component-title{\r\n    color: black;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: 500;\r\n}\r\n\r\n#qNavBar {\r\n    background-color: #262f3d;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n#qNavBar a {\r\n    color: white;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: 500;\r\n}\r\n\r\n#qNavBar a:hover {\r\n    background-color: #465b77\r\n}\r\n\r\na.navbar-brand {\r\n    background-color: #c32c2c;\r\n    padding: 9px 9px;\r\n}\r\n\r\na.nav-link.active{\r\n    background-color: #465b77;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav id=\"qNavBar\" class=\"navbar navbar-expand-sm bg-inverse navbar-inverse\">\r\n  <a class=\"navbar-brand\" href=\"#\">Queue Managerv2.0</a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\"\r\n    aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" routerLink=\"/home\" routerLinkActive=\"active\">\r\n          Home\r\n        </a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" routerLink=\"/manage\" routerLinkActive=\"active\">\r\n          Manage Team\r\n        </a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" routerLink=\"/rcc\" routerLinkActive=\"active\">\r\n          RCC\r\n        </a>\r\n      </li>\r\n\r\n    </ul>\r\n    <div *ngIf=\"afAuth.authState | async as user\">\r\n      <span style=\"color:white\">Welcome Queue Manager!</span>\r\n      <button (click)=\"logout()\">Logout</button>\r\n    </div>\r\n  </div>\r\n</nav>\r\n\r\n<div *ngIf=\"afAuth.authState | async as user\">\r\n  <h2 id=\"component-title\" class=\"text-center\">Other Components</h2>\r\n  <div id=\"component-menu\" class=\"container text-center\">\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/MS\">MS </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/SA\">SA </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/SM\">SM </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/FC-EA-IC-FIM\">FC/EA/IC/FIM </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/DSM\">DSM </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/PCM\">PCM </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/RTC\">RTC </a>\r\n      </div>\r\n      <div class=\"col\">\r\n        <a class=\"nav-link\" href=\"/LOD-ANA-PL\">LOD-ANA-PL</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- <div class=\"row\">\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/MS\" routerLinkActive=\"active\">MS </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/SA\" routerLinkActive=\"active\">SA </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/SM\" routerLinkActive=\"active\">SM </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/FC-EA-IC-FIM\" routerLinkActive=\"active\">FC/EA/IC/FIM </a>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/DSM\" routerLinkActive=\"active\">DSM </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/PCM\" routerLinkActive=\"active\">PCM </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/RTC\" routerLinkActive=\"active\">RTC </a>\r\n    </div>\r\n    <div class=\"col\">\r\n      <a class=\"nav-link\" routerLink=\"/LOD-ANA-PL\" routerLinkActive=\"active\">LOD-ANA-PL</a>\r\n    </div>\r\n  </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/shared/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(afAuth) {
        this.afAuth = afAuth;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        // $(".nav-item").on("click", function () {
        //   $(".nav").find(".active").removeClass("active");
        //   $(this).parent().addClass("active");
        // });
    };
    NavbarComponent.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-navbar',
            template: __webpack_require__("../../../../../src/app/shared/navbar/navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "../../../../../src/app/team-manager/team-manager.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div#add-user-form {\r\n    background-color: white;\r\n    padding: 16px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/team-manager/team-manager.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive shadow\">\r\n  <h1 class=\"qTable-title\">Team Management</h1>\r\n  <table class=\"table qTable\">\r\n    <thead>\r\n      <tr>\r\n        <th scope=\"col\">#</th>\r\n        <th scope=\"col\">Name</th>\r\n        <th scope=\"col\">INumber</th>\r\n        <th scope=\"col\">% Usage</th>\r\n        <th scope=\"col\">Actions</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let user of users | async; let i = index\">\r\n        <th scope=\"row\">{{i + 1}}</th>\r\n        <td>\r\n          <input type=\"text\" #updateName [value]=\"user.name\" />\r\n        </td>\r\n        <td>\r\n          <input type=\"text\" #updateiNumber [value]=\"user.iNumber\" />\r\n        </td>\r\n        <td>\r\n          <input type=\"number\" #updateUsage [value]=\"user.usagePercent\" />\r\n        </td>\r\n        <td>\r\n          <button (click)=\"updateItem(user.key, updateName.value, updateiNumber.value,updateUsage.value )\">Update</button>\r\n          <button (click)=\"deleteItem(user.key)\">Delete</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n\r\n<div id=\"add-user-form\">\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"form-group\">\r\n        <label>Name</label>\r\n        <input [(ngModel)]=\"inputName\" [value]=\"inputName\" type=\"text\" class=\"form-control\" id=\"inputName\" placeholder=\"Enter First Name\">\r\n      </div>\r\n    </div>\r\n    <div class=\"col\">\r\n      <div class=\"form-group\">\r\n        <label>iNumber</label>\r\n        <input [(ngModel)]=\"inputiNumber\" [value]=\"inputiNumber\" type=\"text\" class=\"form-control\" id=\"inputINumber\" placeholder=\"iNumber\">\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"addItem(inputName,inputiNumber)\">Add User</button>\r\n  <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteEverything()\">Remove All</button>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/team-manager/team-manager.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamManagerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__("../../../../../src/app/model/user.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamManagerComponent = /** @class */ (function () {
    function TeamManagerComponent(db) {
        this.db = db;
        this.itemsRef = db.list('users');
        this.users = this.itemsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
        // Start with clear form
        this.inputiNumber = "";
        this.inputName = "";
    }
    // TODO Create user model
    TeamManagerComponent.prototype.addItem = function (fName, iNumber) {
        if (fName && iNumber) {
            this.newUser = new __WEBPACK_IMPORTED_MODULE_2__model_user__["a" /* User */](iNumber, fName, this.db.createPushId());
            this.db.object('users/' + this.newUser.key).set(this.newUser);
            console.log(this.newUser);
        }
        // clear form
        this.inputName = "";
        this.inputiNumber = "";
    };
    TeamManagerComponent.prototype.updateItem = function (key, fName, iNumber, usage) {
        this.itemsRef.update(key, {
            name: fName,
            iNumber: iNumber,
            usagePercent: usage
        });
    };
    TeamManagerComponent.prototype.deleteItem = function (key) {
        this.itemsRef.remove(key);
    };
    TeamManagerComponent.prototype.deleteEverything = function () {
        this.itemsRef.remove();
    };
    TeamManagerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-team-manager',
            template: __webpack_require__("../../../../../src/app/team-manager/team-manager.component.html"),
            styles: [__webpack_require__("../../../../../src/app/team-manager/team-manager.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], TeamManagerComponent);
    return TeamManagerComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCoesP_YkwMmpJaGWO3PO7A9VgjnrrmlxQ",
        authDomain: "queue-manager-fb-ajs.firebaseapp.com",
        databaseURL: "https://queue-manager-fb-ajs.firebaseio.com",
        projectId: "queue-manager-fb-ajs",
        storageBucket: "queue-manager-fb-ajs.appspot.com",
        messagingSenderId: "1044152156042"
    }
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map