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
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
var FerramentasProvider = /** @class */ (function () {
    function FerramentasProvider(alertCtrl, toastCtrl, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    FerramentasProvider.prototype.showAlert = function (main_text, sub_text) {
        var alert = this.alertCtrl.create({
            title: main_text,
            subTitle: sub_text,
            buttons: ["OK"]
        });
        alert.present();
    };
    FerramentasProvider.prototype.presentToast = function (texto) {
        var toast = this.toastCtrl.create({
            message: texto,
            duration: 4000
        });
        toast.present();
    };
    FerramentasProvider.prototype.presentLoading = function (texto) {
        var loader = this.loadingCtrl.create({
            content: texto,
            duration: 4000
        });
        loader.present();
    };
    FerramentasProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController,
            ToastController,
            LoadingController])
    ], FerramentasProvider);
    return FerramentasProvider;
}());
export { FerramentasProvider };
//# sourceMappingURL=ferramentas.js.map