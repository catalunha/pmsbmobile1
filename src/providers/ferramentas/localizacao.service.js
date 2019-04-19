var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
var LocalizacaoService = /** @class */ (function () {
    function LocalizacaoService(geolocation, zone) {
        this.geolocation = geolocation;
        this.zone = zone;
    }
    LocalizacaoService.prototype.startGPS = function (coordenadas) {
        var _this = this;
        var options = {
            frequency: 2000,
            enableHighAccuracy: true
        };
        this.watch = this.geolocation.watchPosition(options).filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            _this.zone.run(function () {
                coordenadas.latitude = position.coords.latitude;
                coordenadas.longitude = position.coords.longitude;
            });
        });
    };
    LocalizacaoService.prototype.stopGPS = function () {
        this.watch.unsubscribe();
    };
    LocalizacaoService.prototype.getLocalizacao = function (latitude, longitude) {
        return "Latitude: " + latitude + "\n" + "Longitude: " + longitude;
    };
    LocalizacaoService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Geolocation,
            NgZone])
    ], LocalizacaoService);
    return LocalizacaoService;
}());
export { LocalizacaoService };
//# sourceMappingURL=localizacao.service.js.map