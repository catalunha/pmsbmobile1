var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ObservacaoLocalService } from '../../providers/dataLocal/observacao.service';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { LoginPage } from './../login/login';
var ObservacaoPage = /** @class */ (function () {
    function ObservacaoPage(navCtrl, authentication_local, app, observacaoService) {
        this.navCtrl = navCtrl;
        this.authentication_local = authentication_local;
        this.app = app;
        this.observacaoService = observacaoService;
    }
    ObservacaoPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.observacaoService.getListObservacoes().then(function (listaObservacao) {
            if (listaObservacao) {
                _this.listaObservacao = listaObservacao;
            }
        }).catch();
    };
    ObservacaoPage.prototype.limpar = function () {
        this.observacaoService.removeObservacoesAll();
        this.listaObservacao = null;
    };
    // Sair do sistema
    ObservacaoPage.prototype.logout = function () {
        this.authentication_local.clearAuthentication();
        this.app.getRootNav().setRoot(LoginPage);
    };
    ObservacaoPage = __decorate([
        Component({
            selector: 'page-observacao',
            templateUrl: 'observacoes.html',
            providers: [ObservacaoLocalService, AuthenticationServiceLocal]
        }),
        __metadata("design:paramtypes", [NavController,
            AuthenticationServiceLocal,
            App,
            ObservacaoLocalService])
    ], ObservacaoPage);
    return ObservacaoPage;
}());
export { ObservacaoPage };
//# sourceMappingURL=observacoes.js.map