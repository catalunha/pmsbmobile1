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
import { QuestionarioDisponivelLocalService } from './../../providers/dataLocal/questionario_disponivel.service';
import { ObservacaoLocalService } from './../../providers/dataLocal/observacao.service';
import { AlertController } from 'ionic-angular';
import { QuestionarioService } from '../../providers/dataServer/questionario.service';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { ModalController } from 'ionic-angular';
import { SelecionarAreaPage } from '../selecionar-area/selecionar-area';
var QuestionariosPage = /** @class */ (function () {
    function QuestionariosPage(navCtrl, modalCtrl, navParams, alertCtrl, questionarioDisponivelLocalService, setorCensitarioDisponivelService, ferramentas) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.questionarioDisponivelLocalService = questionarioDisponivelLocalService;
        this.setorCensitarioDisponivelService = setorCensitarioDisponivelService;
        this.ferramentas = ferramentas;
        this.getQuestionariosLocal();
        this.setorCensitarioOpts = {
            title: 'Setor Centitário',
            subTitle: 'Para poder iniciar um questionário é preciso selecionar um setor'
        };
    }
    QuestionariosPage.prototype.ngOnInit = function () {
        var _this = this;
        var atualizarQuestionarios = function (questionarioDisponivel) { return _this.questionariosDisponiveis = questionarioDisponivel; };
        this.questionarioDisponivelLocalService.eventoUpdateQuestionarioDisponivel
            .subscribe(atualizarQuestionarios);
        var atualizarSetores = function (setoresDisponiveis) { return _this.setoresDisponiveis = setoresDisponiveis; };
        this.setorCensitarioDisponivelService.eventoUpdateSetorCensitario
            .subscribe(atualizarSetores);
    };
    QuestionariosPage.prototype.ionViewWillEnter = function () {
        //this.getSetoresLocal()
        this.getQuestionariosLocal();
    };
    QuestionariosPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //await this.getQuestionariosLocal();
                    return [4 /*yield*/, this.getSetoresLocal()];
                    case 1:
                        //await this.getQuestionariosLocal();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionariosPage.prototype.getQuestionariosLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sucess = function (questionariosDisponiveis) {
                            _this.questionariosDisponiveis = questionariosDisponiveis;
                        };
                        error = function (error) { return console.log(error); };
                        return [4 /*yield*/, this.questionarioDisponivelLocalService.getQuestionariosDisponiveis()
                                .then(sucess)
                                .catch(error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionariosPage.prototype.getSetoresLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sucess = function (setoresDisponiveis) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.setoresDisponiveis = setoresDisponiveis;
                                        return [4 /*yield*/, this.setorCensitarioDisponivelService.getSetoresOffline().forEach(function (setor) { _this.setoresDisponiveis.setoresCensitarios.push(setor); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        error = function (error) { return console.log(error); };
                        return [4 /*yield*/, this.setorCensitarioDisponivelService.getSetoresCensitariosDisponiveis()
                                .then(sucess)
                                .catch(error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionariosPage.prototype.$escolherSetor = function (questionario) {
        return __awaiter(this, void 0, void 0, function () {
            var profileModal;
            var _this = this;
            return __generator(this, function (_a) {
                profileModal = this.modalCtrl.create(SelecionarAreaPage, { nenhumVisible: false });
                profileModal.present();
                profileModal.onDidDismiss(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!data.cancelado) {
                            console.log(data.area);
                            if (data.area) {
                                questionario['setor_censitario'] = data.area;
                                this.$iniciarQuestionario(questionario);
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    QuestionariosPage.prototype.$iniciarQuestionario = function (questionario) {
        var _this = this;
        if (questionario.setor_censitario) {
            questionario.iniciado_em = new Date().toISOString();
            questionario.atualizado_em = new Date().toISOString();
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirmar Ação',
                message: "Voc\u00EA deseja iniciar uma nova resolu\u00E7\u00E3o para este question\u00E1rio na \u00E1rea " + this.setorCensitarioDisponivelService.getSetorNome(questionario.setor_censitario, this.setoresDisponiveis),
                buttons: [
                    {
                        text: 'Não',
                        handler: function () {
                            console.log('Ação Cancelada');
                        }
                    },
                    {
                        text: 'Sim',
                        handler: function () {
                            _this.questionarioDisponivelLocalService.adicionarNovoQuestionarioIniciado(questionario);
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.ferramentas.showAlert("Atenção", "Para iniciar este questionário, primeiro é necessário selecionar um SETOR CENSITÁRIO.");
        }
    };
    QuestionariosPage.prototype.stpSelect = function () {
        console.log('STP selected');
    };
    QuestionariosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-questionarios',
            templateUrl: 'questionarios.html',
            providers: [QuestionarioDisponivelLocalService, QuestionarioService,
                ObservacaoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams,
            AlertController,
            QuestionarioDisponivelLocalService,
            SetorCensitarioLocalService,
            FerramentasProvider])
    ], QuestionariosPage);
    return QuestionariosPage;
}());
export { QuestionariosPage };
//# sourceMappingURL=questionarios.js.map