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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { ViewController } from 'ionic-angular';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
/**
 * Generated class for the SelecionarAreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelecionarAreaPage = /** @class */ (function () {
    function SelecionarAreaPage(ferramentas, viewCtrl, navCtrl, navParams, setorCensitario) {
        this.ferramentas = ferramentas;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.setorCensitario = setorCensitario;
        this.area = null;
        this.Nenhum = null;
    }
    SelecionarAreaPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, error;
            var _this = this;
            return __generator(this, function (_a) {
                this.nenhumVisible = this.navParams.get('nenhumVisible');
                this.setoresDisponiveis = null;
                sucess = function (setoresDisponiveis) {
                    _this.setoresDisponiveis = setoresDisponiveis;
                    console.log(_this.setoresDisponiveis.setoresCensitarios);
                    _this.setorCensitario.getSetoresOffline().forEach(function (setor) { _this.setoresDisponiveis.setoresCensitarios.push(setor); });
                };
                error = function (error) { return console.log(error); };
                this.setorCensitario.getSetoresCensitariosDisponiveis()
                    .then(sucess)
                    .catch(error);
                return [2 /*return*/];
            });
        });
    };
    SelecionarAreaPage.prototype.getSetorSuperior = function (setor_superior) {
        return this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == setor_superior; }); //.nome
    };
    SelecionarAreaPage.prototype.getSetorNome = function (setor) {
        if (setor.setor_superior) {
            return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome;
        }
        return setor.nome;
    };
    SelecionarAreaPage.prototype.adicionarNovaArea = function () {
        var _this = this;
        if (!this.area) {
            this.ferramentas.showAlert('Para continuar escolha uma das áreas listadas.', "");
            return;
        }
        var area = this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == _this.area; });
        this.viewCtrl.dismiss({ area: area, cancelado: false });
    };
    SelecionarAreaPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss({ area: null, cancelado: true });
    };
    SelecionarAreaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-selecionar-area',
            templateUrl: 'selecionar-area.html',
            providers: [SetorCensitarioLocalService, SetorCensitarioService]
        }),
        __metadata("design:paramtypes", [FerramentasProvider, ViewController, NavController, NavParams, SetorCensitarioLocalService])
    ], SelecionarAreaPage);
    return SelecionarAreaPage;
}());
export { SelecionarAreaPage };
//# sourceMappingURL=selecionar-area.js.map