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
import { SetorCensitario } from '../../models/setor_censitario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { AlertController, Platform } from 'ionic-angular';
import * as uuid from 'uuid';
import { ModalController } from 'ionic-angular';
import { SelecionarAreaPage } from '../selecionar-area/selecionar-area';
/**
 * Generated class for the AreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AreaPage = /** @class */ (function () {
    function AreaPage(navCtrl, modalCtrl, plt, alertCtrl, navParams, setorCensitario, ferramentas) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.plt = plt;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.setorCensitario = setorCensitario;
        this.ferramentas = ferramentas;
        this.area_nova = "";
    }
    AreaPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ferramentas.presentLoading(" Aguarde ! Atualizando a pagina. ");
                        return [4 /*yield*/, this.atualizarListaSetores()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getSetoresLocal()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AreaPage.prototype.ionViewDidEnter = function () {
        //this.atualizarListaSetores()
        this.getSetoresLocal();
    };
    AreaPage.prototype.getSetoresLocal = function () {
        var _this = this;
        this.setoresDisponiveis = null;
        var sucess = function (setoresDisponiveis) {
            _this.setoresDisponiveis = setoresDisponiveis;
            console.log(_this.setoresDisponiveis.setoresCensitarios);
            _this.setorCensitario.getSetoresOffline().forEach(function (setor) { _this.setoresDisponiveis.setoresCensitarios.push(setor); });
        };
        var error = function (error) { return console.log(error); };
        this.setorCensitario.getSetoresCensitariosDisponiveis()
            .then(sucess)
            .catch(error);
    };
    AreaPage.prototype.getSetorSuperior = function (setor_superior) {
        return this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == setor_superior; }); //.nome
    };
    AreaPage.prototype.getSetorNome = function (setor) {
        if (setor.setor_superior) {
            return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome;
        }
        return setor.nome;
    };
    AreaPage.prototype.adicionarNovaArea = function () {
        var _this = this;
        if (this.area_nova.length == 0) {
            this.ferramentas.showAlert("O campo nova área está vazio !", "Insira um nome valido no campo nova área.");
            return;
        }
        var profileModal = this.modalCtrl.create(SelecionarAreaPage, { nenhumVisible: true });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            if (!data.cancelado) {
                console.log(data.area);
                if (data.area) {
                    _this.salvarNovaAreaServidor(data.area.id);
                }
                else {
                    _this.salvarNovaAreaServidor(null);
                }
            }
        });
    };
    AreaPage.prototype.gerarNovaInstanciaSetor = function (areasup) {
        var novo_setor = new SetorCensitario();
        novo_setor.fake_deletado = false;
        novo_setor.fake_deletado_em = null;
        novo_setor.nome = this.area_nova;
        novo_setor.setor_superior = areasup;
        novo_setor.id = null;
        return novo_setor;
    };
    AreaPage.prototype.salvarNovaAreaServidor = function (areasup) {
        return __awaiter(this, void 0, void 0, function () {
            var novo_setor;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        novo_setor = this.gerarNovaInstanciaSetor(areasup);
                        return [4 /*yield*/, this.setorCensitario.postSetorSencitario(novo_setor).then(function (resposta) {
                                _this.ferramentas.presentToast("A \u00E1rea " + _this.area_nova + " foi cadastrada com suceso !");
                                _this.atualizarListaSetores();
                            }).catch(function (error) { _this.tratarErrorSetor(error, novo_setor); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AreaPage.prototype.tratarErrorSetor = function (error, novo_setor) {
        return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        err = error.error.json();
                        console.log(error.error.status);
                        if (!(error.error.status == 400)) return [3 /*break*/, 1];
                        this.ferramentas.showAlert(err.nome, "");
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(error.error.status == 0)) return [3 /*break*/, 6];
                        if (!this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.nome == novo_setor.nome; })) return [3 /*break*/, 2];
                        this.ferramentas.showAlert("setor censitario com esse nome já existe.", "");
                        return [3 /*break*/, 6];
                    case 2:
                        novo_setor.id = uuid.v4();
                        //await this.setoresDisponiveis.setoresCensitarios.push(novo_setor)
                        return [4 /*yield*/, this.setorCensitario.salvarSetorOffline(novo_setor)
                            //await this.setorCensitario.adicionarSetorCensitarios(this.setoresDisponiveis.setoresCensitarios)
                        ];
                    case 3:
                        //await this.setoresDisponiveis.setoresCensitarios.push(novo_setor)
                        _a.sent();
                        //await this.setorCensitario.adicionarSetorCensitarios(this.setoresDisponiveis.setoresCensitarios)
                        return [4 /*yield*/, this.ferramentas.presentLoading(" Aguarde ! Atualizando a pagina. ")];
                    case 4:
                        //await this.setorCensitario.adicionarSetorCensitarios(this.setoresDisponiveis.setoresCensitarios)
                        _a.sent();
                        return [4 /*yield*/, this.atualizarListaSetores()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AreaPage.prototype.atualizarListaSetores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.area_nova = "";
                        return [4 /*yield*/, this.setorCensitario.getSetoresCensitariosServidor()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.getSetoresLocal();
                                    return [2 /*return*/];
                                });
                            }); }, 3000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AreaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-area',
            templateUrl: 'area.html',
            providers: [SetorCensitarioLocalService, SetorCensitarioService]
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            Platform,
            AlertController,
            NavParams,
            SetorCensitarioLocalService,
            FerramentasProvider])
    ], AreaPage);
    return AreaPage;
}());
export { AreaPage };
//# sourceMappingURL=area.js.map