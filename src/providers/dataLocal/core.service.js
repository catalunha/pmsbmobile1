var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
var CoreServiceLocal = /** @class */ (function () {
    function CoreServiceLocal(storage) {
        this.storage = storage;
        this.keyUser = "usuario_atual_PMSB";
    }
    // Browser
    CoreServiceLocal.prototype.saveLocalStorage = function (key, objeto) {
        localStorage.setItem(key + "/" + this.getUserToken(), objeto);
    };
    // Browser
    CoreServiceLocal.prototype.removeItemLocalStorage = function (key) {
        localStorage.removeItem(key + "/" + this.getUserToken());
    };
    // Browser
    CoreServiceLocal.prototype.getLocalStorage = function (key) {
        return localStorage.getItem(key + "/" + this.getUserToken());
    };
    // Device
    CoreServiceLocal.prototype.saveStorage = function (key, objeto) {
        return this.storage.set(key + "/" + this.getUserToken(), objeto);
    };
    // Device
    CoreServiceLocal.prototype.removeItemStorage = function (key) {
        this.storage.remove(key + "/" + this.getUserToken());
    };
    // Device
    CoreServiceLocal.prototype.getStorage = function (key) {
        return this.storage.get(key + "/" + this.getUserToken());
    };
    // ---------------------------------------
    // Browser
    CoreServiceLocal.prototype.saveLocalStorageUser = function (key, objeto) {
        localStorage.setItem(key, objeto);
    };
    // Browser
    CoreServiceLocal.prototype.removeItemLocalStorageUser = function (key) {
        localStorage.removeItem(key);
    };
    // Browser
    CoreServiceLocal.prototype.getLocalStorageUser = function (key) {
        return localStorage.getItem(key);
    };
    // Device
    CoreServiceLocal.prototype.saveStorageUser = function (key, objeto) {
        return this.storage.set(key, objeto);
    };
    // Device
    CoreServiceLocal.prototype.removeItemStorageUser = function (key) {
        this.storage.remove(key);
    };
    // Device
    CoreServiceLocal.prototype.getStorageUser = function (key) {
        return this.storage.get(key);
    };
    CoreServiceLocal.prototype.getUserToken = function () {
        var usuario_atual_PMSB = JSON.parse(localStorage.getItem(this.keyUser));
        if (usuario_atual_PMSB)
            return usuario_atual_PMSB["token"];
        return "";
    };
    CoreServiceLocal = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], CoreServiceLocal);
    return CoreServiceLocal;
}());
export { CoreServiceLocal };
//# sourceMappingURL=core.service.js.map