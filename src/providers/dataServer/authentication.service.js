var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreService } from './core.service';
import 'rxjs/add/operator/map';
var AuthenticationService = /** @class */ (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService(http) {
        var _this = _super.call(this, http, '/api/auth/get-auth-token') || this;
        _this.http = http;
        return _this;
    }
    AuthenticationService.prototype.login = function (instance) {
        return _super.prototype.post.call(this, instance);
    };
    AuthenticationService.prototype.postUsuarioInformacoes = function (instance) {
        return _super.prototype.postUserInfo.call(this, instance, "/api/auth/jwt/auth-token/");
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], AuthenticationService);
    return AuthenticationService;
}(CoreService));
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map