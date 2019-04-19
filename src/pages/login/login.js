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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AppVersion } from '@ionic-native/app-version';
import { AuthenticationService } from './../../providers/dataServer/authentication.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { UsuarioService } from './../../providers/dataServer/usuario.service';
var LoginPage = /** @class */ (function () {
    //helper = new JwtHelperService();
    function LoginPage(navCtrl, navParams, loadingCtrl, authentication_service, authentication_local, ferramenta, appVersion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.authentication_service = authentication_service;
        this.authentication_local = authentication_local;
        this.ferramenta = ferramenta;
        this.appVersion = appVersion;
        this.blockApp = false;
        this.model = {
            username: "",
            password: ""
        };
        this.appVersionVerification();
    }
    LoginPage.prototype.appVersionVerification = function () {
        var _this = this;
        this.appVersion.getVersionNumber().then(function (versao) {
            _this.versionNumber = versao;
        }).catch(function (error) {
            _this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual do aplicativo, por favor atualize!");
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Efetuando login...'
        });
        loading.present();
        this.authentication_service.login(this.model).subscribe(function (resposta) {
            _this.authentication_local.saveAuthentication(resposta);
            _this.salvarInformacoesUsuario();
            _this.navCtrl.setRoot(TabsPage);
            loading.dismiss();
        }, function (error) {
            _this.ferramenta.showAlert("Falha no login!", "Verifique Usuário e Senha");
            loading.dismiss();
            console.log(" ERRO aqui ! ");
            console.error(JSON.stringify(error));
        });
    };
    LoginPage.prototype.salvarInformacoesUsuario = function () {
        var _this = this;
        this.authentication_service.postUsuarioInformacoes(this.model).subscribe(function (resposta) {
            _this.ferramenta.showAlert("resposta", JSON.parse(JSON.parse(resposta)).token);
            //this.authentication_local.saveAuthentication(resposta);
        }, function (erro) {
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            providers: [AuthenticationService, AuthenticationServiceLocal, UsuarioService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            AuthenticationService,
            AuthenticationServiceLocal,
            FerramentasProvider,
            AppVersion])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map