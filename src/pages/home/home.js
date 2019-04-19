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
// Imports Nativos
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';
// Imports Pages
import { PendenciasPage } from './../pendencias/pendencias';
import { QuestionariosPage } from './../questionarios/questionarios';
import { PerguntaPage } from '../pergunta/pergunta';
import { VisualizarPage } from '../visualizar/visualizar';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
// Outros Imports
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
var HomePage = /** @class */ (function () {
    function HomePage(loadingCtrl, navCtrl, alertCtrl, questionarioIniciadoLocalService, actionSheetCtrl, ferramentas, setorCensitarioLocalService) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.questionarioIniciadoLocalService = questionarioIniciadoLocalService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ferramentas = ferramentas;
        this.setorCensitarioLocalService = setorCensitarioLocalService;
    }
    HomePage.prototype.getSetoresLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sucess, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sucess = function (setoresDisponiveis) {
                            _this.setoresDisponiveis = setoresDisponiveis;
                            _this.setorCensitarioLocalService.getSetoresOffline().forEach(function (setor) { _this.setoresDisponiveis.setoresCensitarios.push(setor); });
                        };
                        error = function (error) { return console.log(error); };
                        return [4 /*yield*/, this.setorCensitarioLocalService.getSetoresCensitariosDisponiveis()
                                .then(sucess)
                                .catch(error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Função para apagar todos os questionários iniciados, não está disponível para o usuário
    HomePage.prototype._limpar = function () {
        this.questionarioIniciadoLocalService._removeQuestionarioIniciadosAll();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.getSetoresLocal();
    };
    // Verifica os questionários iniciados sempre que a tela é chamada
    HomePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSetoresLocal()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getQuestionariosIniciados()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getQuestionariosIniciados = function () {
        var _this = this;
        var atribuicao = function (questionariosIniciadosLocalmente) { return _this.questionariosIniciados = questionariosIniciadosLocalmente; };
        this.questionarioIniciadoLocalService.getQuestionariosIniciados()
            .then(atribuicao)
            .catch(function (error) { return console.error(error); });
    };
    // Barra de opções de ações para o usuário
    HomePage.prototype.$opcoesQuestionario = function (questionario) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Opções de Questionário',
            buttons: [
                {
                    text: 'Continuar',
                    handler: function () {
                        var area = _this.getNomeArea(questionario.setor_censitario);
                        _this.navCtrl.push(PerguntaPage, { "questionarioPosicao": _this.questionariosIniciados.questionarios.indexOf(questionario), "area": area });
                    }
                }, {
                    text: 'Verificar Pendências',
                    handler: function () {
                        _this.navCtrl.push(PendenciasPage, { "questionarioPosicao": _this.questionariosIniciados.questionarios.indexOf(questionario) });
                    }
                }, {
                    text: 'Visualizar Respostas',
                    handler: function () {
                        _this.navCtrl.push(VisualizarPage, { "questionarioPosicao": _this.questionariosIniciados.questionarios.indexOf(questionario) });
                    }
                }, {
                    text: 'Concluir',
                    handler: function () {
                        _this.concluirQuestionario(questionario);
                    }
                }, {
                    text: 'Remover',
                    role: 'destructive',
                    handler: function () {
                        _this.removerQuestionario(questionario);
                    }
                }, {
                    text: 'Cancelar Ação',
                    role: 'cancel',
                    handler: function () {
                        console.log('Nenhuma Ação Escolhida');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // Concluir um Questionário Iniciado
    HomePage.prototype.concluirQuestionario = function (questionario) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar: Concluir',
            message: 'Tem certeza que deseja CONCLUIR este questionário?',
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
                        _this.questionarioIniciadoLocalService.concluirQuestionarioIniciado(questionario, _this.questionariosIniciados);
                    }
                }
            ]
        });
        confirm.present();
    };
    // Apagar um Questionário Iniciado
    HomePage.prototype.removerQuestionario = function (questionario) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Atenção',
            message: "Depois que um questionário é removido ele não poderá mais ser editado. Digite REMOVER para executar esta ação.",
            inputs: [
                {
                    name: 'texto',
                    placeholder: 'REMOVER'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        _this.ferramentas.presentToast("Ação Cancelada");
                    }
                },
                {
                    text: 'Confirmar',
                    handler: function (data) {
                        if (data.texto === "REMOVER") {
                            _this.questionarioIniciadoLocalService.removeQuestionarioIniciado(questionario, _this.questionariosIniciados);
                        }
                        else {
                            _this.ferramentas.presentToast("Ação Cancelada");
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.$novaResolucaoQuestionario = function () {
        this.navCtrl.push(QuestionariosPage);
    };
    HomePage.prototype.getSetorSuperior = function (setor_superior) {
        return this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == setor_superior; }); //.nome
    };
    HomePage.prototype.getNomeArea = function (setor) {
        if (setor.setor_superior) {
            return this.getNomeArea(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome;
        }
        return setor.nome;
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [QuestionarioIniciadoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
        }),
        __metadata("design:paramtypes", [LoadingController,
            NavController,
            AlertController,
            QuestionarioIniciadoLocalService,
            ActionSheetController,
            FerramentasProvider,
            SetorCensitarioLocalService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map