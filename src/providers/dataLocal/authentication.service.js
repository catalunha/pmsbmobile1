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
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';
var AuthenticationServiceLocal = /** @class */ (function (_super) {
    __extends(AuthenticationServiceLocal, _super);
    function AuthenticationServiceLocal(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.key = "usuario_atual_PMSB";
        _this.key_info = "usuario_atual_PMSB_info";
        return _this;
    }
    AuthenticationServiceLocal.prototype.saveAuthentication = function (resposta) {
        _super.prototype.saveLocalStorageUser.call(this, this.key, JSON.stringify(resposta));
        _super.prototype.saveStorageUser.call(this, this.key, JSON.stringify(resposta));
    };
    AuthenticationServiceLocal.prototype.saveUserInfo = function (resposta) {
        _super.prototype.saveStorage.call(this, this.key_info, JSON.stringify(resposta));
    };
    // USADO Para logout
    AuthenticationServiceLocal.prototype.clearAuthentication = function () {
        _super.prototype.removeItemLocalStorageUser.call(this, this.key);
    };
    AuthenticationServiceLocal.prototype.getAuthentication = function () {
        return _super.prototype.getLocalStorageUser.call(this, this.key);
    };
    AuthenticationServiceLocal = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], AuthenticationServiceLocal);
    return AuthenticationServiceLocal;
}(CoreServiceLocal));
export { AuthenticationServiceLocal };
//# sourceMappingURL=authentication.service.js.map