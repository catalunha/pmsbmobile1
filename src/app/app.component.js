var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthenticationServiceLocal } from './../providers/dataLocal/authentication.service';
import { VersaoAppService } from '../providers/dataServer/versao_app.service';
import { FerramentasProvider } from '../providers/ferramentas/ferramentas';
import { AppVersion } from '@ionic-native/app-version';
import { AtualizacaoPage } from '../pages/atualizacao/atualizacao';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, authenticarion_local, ferramenta, appVersion, versaoApp_service) {
        this.authenticarion_local = authenticarion_local;
        this.ferramenta = ferramenta;
        this.appVersion = appVersion;
        this.versaoApp_service = versaoApp_service;
        this.versaoApp_service.verificaVesaoOnline();
        this.iniciar();
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.iniciar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.versaoApp_service.verificaVesaoOnline()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.verificaVersaoAtualizadaNoStorage()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.determinarRootPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuario_atual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authenticarion_local.getAuthentication()];
                    case 1:
                        usuario_atual = _a.sent();
                        if (usuario_atual) {
                            this.rootPage = TabsPage;
                        }
                        else {
                            this.rootPage = LoginPage;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.appAtualizationVerification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.versaoApp_service.verificarVersaoEstaAtualizada().then(function (result) {
                    _this.ferramenta.showAlert(JSON.stringify(result), "");
                    _this.versionVerification = result;
                });
                return [2 /*return*/];
            });
        });
    };
    MyApp.prototype.verificaVersaoAtualizadaNoStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var versao;
            return __generator(this, function (_a) {
                versao = this.versaoApp_service.getVersaoStorage();
                if (versao) {
                    if (versao.atualizado) {
                        this.determinarRootPage();
                    }
                    else {
                        this.rootPage = AtualizacaoPage;
                    }
                }
                else {
                    this.determinarRootPage();
                }
                return [2 /*return*/];
            });
        });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
            providers: [AuthenticationServiceLocal]
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            AuthenticationServiceLocal,
            FerramentasProvider,
            AppVersion,
            VersaoAppService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map