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
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { QuestionarioConcluidoLocalService } from './../../providers/dataLocal/questionario_concluido.service';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { RespostaQuestionarioService } from './../../providers/dataServer/resposta_questionario.service';
import { RespostaPerguntaService } from './../../providers/dataServer/resposta_pergunta.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { QuestionarioLocalService } from './../../providers/dataLocal/questionario.service';
import { TipoTextoResposta, TipoPossivelEscolhaResposta, TipoArquivoResposta, TipoImagemResposta, TipoLocalizacaoResposta, TipoNumeroResposta, Coordenada } from '../../models/resposta_pergunta.model';
import { RespostaPossivelEscolhaService } from '../../providers/dataServer/tipo_respostas/possivel_escolhas_respostas.service';
import { RespostaTextoService } from '../../providers/dataServer/tipo_respostas/texto_respostas.service';
import { RespostaArquivoService } from '../../providers/dataServer/tipo_respostas/arquivo_respostas.service';
import { RespostaImagemService } from '../../providers/dataServer/tipo_respostas/imagem_respostas.service';
import { RespostaLocalizacaoService } from '../../providers/dataServer/tipo_respostas/coordenada_respostas.service';
import { RespostaNumeroService } from '../../providers/dataServer/tipo_respostas/numero_respostas.service';
import { LocalizacaoService } from '../../providers/dataServer/recursos/localizacao.service';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { VersaoAppService } from '../../providers/dataServer/versao_app.service';
import { BackupProvider } from '../../providers/ferramentas/backup.service';
var ConcluidoPage = /** @class */ (function () {
    function ConcluidoPage(navCtrl, navParams, loadingCtrl, alertCtrl, questionario_concluido_service, resposta_questionario_service, actionSheetCtrl, ferramenta, questionario_local_service, resposta_pergunta_service, rPossivelEscolha, rTexto, rArquivo, rImagem, rLocalizacao, rValor, localizacaoService, setorCensitarioLocalService, versaoApp, backupProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.questionario_concluido_service = questionario_concluido_service;
        this.resposta_questionario_service = resposta_questionario_service;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ferramenta = ferramenta;
        this.questionario_local_service = questionario_local_service;
        this.resposta_pergunta_service = resposta_pergunta_service;
        this.rPossivelEscolha = rPossivelEscolha;
        this.rTexto = rTexto;
        this.rArquivo = rArquivo;
        this.rImagem = rImagem;
        this.rLocalizacao = rLocalizacao;
        this.rValor = rValor;
        this.localizacaoService = localizacaoService;
        this.setorCensitarioLocalService = setorCensitarioLocalService;
        this.versaoApp = versaoApp;
        this.backupProvider = backupProvider;
        this.validarPostagem = true;
        this.questionario_dict = {};
        this.err = function (error) { return console.error(error); };
        this.erroAndFinishLoading = function (error) {
            _this.loading.dismiss();
            _this.loadingFinalizar(true);
        };
        this.getSetoresLocal();
        this.erro_final = false;
    }
    // limpar() {
    //   this.questionario_concluido_service._removeQuestionarioConcluidosAll();
    // }
    ConcluidoPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getQuestionariosConcluidos()];
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
    ConcluidoPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getQuestionariosConcluidos()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcluidoPage.prototype.getQuestionariosConcluidos = function () {
        var _this = this;
        this.questionario_concluido_service.getQuestionariosConcluidos().then(function (data) {
            if (data) {
                _this.questionariosConcluidos = data;
                _this.atualizarIcons();
            }
        }).catch(this.err);
    };
    ConcluidoPage.prototype.getSetoresLocal = function () {
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
    ConcluidoPage.prototype.atualizarIcons = function () {
        for (var _i = 0, _a = this.questionariosConcluidos.questionarios; _i < _a.length; _i++) {
            var questionarioConcluido = _a[_i];
            questionarioConcluido.questionario_sincronizado = true;
            if (questionarioConcluido.resposta_questionario) {
                for (var _b = 0, _c = questionarioConcluido.perguntas; _b < _c.length; _b++) {
                    var pergunta = _c[_b];
                    if (pergunta.resposta && (!pergunta.resposta_pergunta ||
                        !pergunta.resposta_pergunta.tipo_respostaSincronizada)) {
                        questionarioConcluido.questionario_sincronizado = false;
                        break;
                    }
                }
            }
            else
                questionarioConcluido.questionario_sincronizado = false;
        }
    };
    ConcluidoPage.prototype.opcoesQuestionario = function (questionario) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Opções de Questionário',
            buttons: [
                {
                    text: 'Retornar para Iniciados',
                    handler: function () {
                        _this.editarQuestionarioConcluido(questionario);
                    }
                },
                // {
                //   text: 'Remover',
                //   role: 'destructive',
                //   handler: () => {
                //     console.log('Removendo Questionário');
                //     this.removerQuestionario(questionario);
                //   }
                // },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ConcluidoPage.prototype.editarQuestionarioConcluido = function (questionario) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmar: Iniciar',
            message: 'Tem certeza que deseja INICIAR este questionário novamente?',
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
                        _this.questionario_concluido_service.editarQuestionarioConcluido(questionario, _this.questionariosConcluidos);
                    }
                }
            ]
        });
        confirm.present();
    };
    ConcluidoPage.prototype.removerQuestionario = function (questionario) {
        this.questionario_concluido_service.removeQuestionarioConcluido(questionario, this.questionariosConcluidos);
    };
    //  ######  Sincronização dos dados  #####
    ConcluidoPage.prototype.sincronizar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.versaoApp.getVersaoApp({}).subscribe(function (resposta) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.backupProvider.salvarBackup(this.questionariosConcluidos.questionarios, this.setoresDisponiveis.setoresCensitarios)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.verificarSetoresOffline()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, this.sincronizarQuestionarioComcluidos()];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, this.backupProvider.enviarBackupPorEmail()];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (error) {
                            _this.ferramenta.showAlert("Erro ao sincronizar ! ", "Verifique sua internet para sincronizar os dados.");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcluidoPage.prototype.sincronizarQuestionarioComcluidos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.questionariosConcluidos && this.questionariosConcluidos.questionarios.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadingIniciar()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.verificarAtualizacoesQuestionarios()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.ferramenta.presentToast("Nenhuma Questionário Para Sincronizar");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConcluidoPage.prototype.verificarSetoresOffline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var setores_offline;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setorCensitarioLocalService.getSetoresOffline()];
                    case 1:
                        setores_offline = _a.sent();
                        if (!(setores_offline.length > 0)) return [3 /*break*/, 3];
                        this.validarPostagem = true;
                        return [4 /*yield*/, this.sincronizarSetoresOffline(setores_offline).then(function () {
                                _this.ferramenta.presentToast(" Áreas offline sincronizadas com sucesso !");
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConcluidoPage.prototype.sincronizarSetoresOffline = function (setores_offline) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setores_offline.forEach(function (val, key, arr) {
                _this.postarSetorOfflineTratandoErros(val);
                if (Object.is(arr.length - 1, key)) {
                    resolve(true);
                }
            });
        });
    };
    ConcluidoPage.prototype.postarSetorOfflineTratandoErros = function (setor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(setor.nome);
                this.setorCensitarioLocalService.postSetorSencitario(setor).then(function (result) {
                    _this.apagarSetorOffline(setor);
                }).catch(function (err) { return _this.tratarErroNomeJaExiste(err); });
                return [2 /*return*/];
            });
        });
    };
    ConcluidoPage.prototype.tratarErroNomeJaExiste = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var error_recebido, _setor;
            return __generator(this, function (_a) {
                error_recebido = error.error.json();
                if (error_recebido.nome == "setor censitario com este nome já existe.") {
                    _setor = error.setor;
                    _setor.nome = _setor.nome + '/';
                    this.postarSetorOfflineTratandoErros(_setor);
                }
                return [2 /*return*/];
            });
        });
    };
    ConcluidoPage.prototype.apagarSetorOffline = function (setor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setorCensitarioLocalService.apagarListaOfflinePeloId(setor.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setorCensitarioLocalService.getSetoresCensitariosServidor()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // -----------------------------------------------------------------------//
    // PUSH
    ConcluidoPage.prototype.verificarAtualizacoesQuestionarios = function () {
        var _this = this;
        this.resposta_questionario_service.pushQuestionarios(this.questionariosConcluidos).then(function (respostaQuestionarioList) {
            if (_this.listaVazia(respostaQuestionarioList))
                _this.salvarDataLocal();
            _this.verificarAtualizacoesPerguntas();
        }).catch(this.erroAndFinishLoading);
    };
    ConcluidoPage.prototype.verificarAtualizacoesPerguntas = function () {
        var _this = this;
        this.resposta_pergunta_service.pushPerguntas(this.questionariosConcluidos).then(function (respostaPerguntaList) {
            if (_this.listaVazia(respostaPerguntaList))
                _this.salvarDataLocal();
            _this.verificarRespostas();
        }).catch(this.erroAndFinishLoading);
    };
    ConcluidoPage.prototype.verificarRespostas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, questionario, _b, _c, pergunta, _d, novaLocalizacao;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.iniciarListas();
                        _i = 0, _a = this.questionariosConcluidos.questionarios;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        questionario = _a[_i];
                        // Popular Listas com as Respostas
                        console.log(questionario.usuario);
                        _b = 0, _c = questionario.perguntas;
                        _e.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 11];
                        pergunta = _c[_b];
                        if (!(pergunta.resposta_pergunta && !pergunta.resposta_pergunta.tipo_respostaSincronizada)) return [3 /*break*/, 10];
                        _d = pergunta.tipo;
                        switch (_d) {
                            case 0: return [3 /*break*/, 3];
                            case 1: return [3 /*break*/, 4];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 6];
                            case 4: return [3 /*break*/, 7];
                            case 5: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        this.arrayRespostaPossiveisEscolhas(this.criarListaPossiveisEscolhas(pergunta), this.respostaPossivelEscolhaList, pergunta, this.perguntaPossivelEscolhaList);
                        return [3 /*break*/, 10];
                    case 4:
                        this.arrayRespostaGenerico(new TipoTextoResposta(pergunta), this.respostaTextoList, pergunta, this.perguntaTextoList);
                        return [3 /*break*/, 10];
                    case 5:
                        this.arrayRespostaGenerico(new TipoArquivoResposta(pergunta), this.respostaArquivoList, pergunta, this.perguntaArquivoList);
                        return [3 /*break*/, 10];
                    case 6:
                        this.arrayRespostaGenerico(new TipoImagemResposta(pergunta), this.respostaImagemList, pergunta, this.perguntaImagemList);
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.criarLocalizacao(pergunta)];
                    case 8:
                        novaLocalizacao = _e.sent();
                        if (novaLocalizacao) {
                            this.arrayRespostaGenerico(new TipoLocalizacaoResposta(pergunta, novaLocalizacao.id), this.respostaCoordenadaList, pergunta, this.perguntaCoordenadaList);
                        }
                        else {
                            this.ferramenta.presentToast("Não foi possível criar uma nova localização.");
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        this.arrayRespostaGenerico(new TipoNumeroResposta(pergunta), this.respostaValorList, pergunta, this.perguntaValorList);
                        return [3 /*break*/, 10];
                    case 10:
                        _b++;
                        return [3 /*break*/, 2];
                    case 11:
                        _i++;
                        return [3 /*break*/, 1];
                    case 12:
                        this.sincronizarRespostas();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConcluidoPage.prototype.sincronizarRespostas = function () {
        this.contadorSincronismo = 0;
        if (this.listaVazia(this.respostaTextoList))
            this.postGenerico(this.rTexto, this.respostaTextoList, this.perguntaTextoList, "Textos");
        else
            this.verificarSincronismo();
        if (this.listaVazia(this.respostaValorList))
            this.postGenerico(this.rValor, this.respostaValorList, this.perguntaValorList, "Valores");
        else
            this.verificarSincronismo();
        if (this.listaVazia(this.respostaCoordenadaList)) {
            this.postGenerico(this.rLocalizacao, this.respostaCoordenadaList, this.perguntaCoordenadaList, "Coordenadas");
        }
        else
            this.verificarSincronismo();
        if (this.listaVazia(this.respostaPossivelEscolhaList))
            this.postGenerico(this.rPossivelEscolha, this.respostaPossivelEscolhaList, this.perguntaPossivelEscolhaList, "Possíveis Escolhas");
        else
            this.verificarSincronismo();
        if (this.listaVazia(this.respostaArquivoList))
            this.postGenerico(this.rArquivo, this.respostaArquivoList, this.perguntaArquivoList, "Arquivos");
        else
            this.verificarSincronismo();
        if (this.listaVazia(this.respostaImagemList))
            this.postGenerico(this.rImagem, this.respostaImagemList, this.perguntaImagemList, "Imagens");
        else
            this.verificarSincronismo();
    };
    ConcluidoPage.prototype.criarLocalizacao = function (pergunta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var novaCoordenada = new Coordenada();
            novaCoordenada.altitude = "000";
            novaCoordenada.latitude = String(pergunta.resposta.latitudeResposta).substring(0, 7);
            novaCoordenada.longitude = String(pergunta.resposta.longitudeResposta).substring(0, 7);
            console.log(novaCoordenada);
            _this.localizacaoService.addLocalizacao(novaCoordenada).subscribe(function (novaLocalizacao) { return resolve(novaLocalizacao); }, function (error) { return reject(null); });
        });
    };
    ConcluidoPage.prototype.postGenerico = function (tipoResposta, respostaList, perguntaList, tipo) {
        var _this = this;
        tipoResposta.addRespostaAll(respostaList).subscribe(function (respostaListSincronizada) {
            _this.salvarRespostaGenerico(respostaListSincronizada, perguntaList);
            _this.verificarSincronismo();
        }, function (erro) {
            _this.verificarSincronismo();
            _this.erro_final = erro;
            _this.ferramenta.showAlert("Falha na sincroniza\ção de " + tipo, "");
            console.log(erro);
        });
    };
    ConcluidoPage.prototype.salvarRespostaGenerico = function (respostaListSincronizada, perguntaList) {
        var aux = 0;
        for (var _i = 0, perguntaList_1 = perguntaList; _i < perguntaList_1.length; _i++) {
            var pergunta = perguntaList_1[_i];
            pergunta.resposta_pergunta.tipo_respostaSincronizada = respostaListSincronizada[aux];
            aux++;
        }
        this.salvarDataLocal();
    };
    ConcluidoPage.prototype.arrayRespostaGenerico = function (respostaAux, respostaList, pergunta, perguntaList) {
        respostaList.push(respostaAux);
        perguntaList.push(pergunta);
    };
    ConcluidoPage.prototype.arrayRespostaPossiveisEscolhas = function (respostaAux, respostaList, pergunta, perguntaList) {
        for (var _i = 0, respostaAux_1 = respostaAux; _i < respostaAux_1.length; _i++) {
            var possivel_escolha = respostaAux_1[_i];
            respostaList.push(possivel_escolha);
        }
        perguntaList.push(pergunta);
    };
    ConcluidoPage.prototype.criarListaPossiveisEscolhas = function (pergunta) {
        var lista = new Array();
        // Verificar o tipo da pergunta
        if (pergunta.multipla) {
            for (var _i = 0, _a = pergunta.resposta.possiveis_escolhas_id; _i < _a.length; _i++) {
                var possivel_escolha = _a[_i];
                lista.push(new TipoPossivelEscolhaResposta(pergunta, possivel_escolha.id));
            }
        }
        else {
            lista.push(new TipoPossivelEscolhaResposta(pergunta, pergunta.resposta.possivel_escolha_id.id));
        }
        return lista;
    };
    //-------------------------------------------------------------------------------------//
    // Auxiliares
    ConcluidoPage.prototype.loadingIniciar = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Sincronizando Dados...'
        });
        this.loading.present();
    };
    ConcluidoPage.prototype.loadingFinalizar = function (error) {
        if (error === void 0) { error = false; }
        this.atualizarIcons();
        this.loading.dismiss();
        error ? this.ferramenta.showAlert("Sincronização Falhou", "") :
            this.ferramenta.showAlert("Sincronização Concluída", "Obrigado.");
    };
    ConcluidoPage.prototype.listaVazia = function (array) {
        return array.length > 0;
    };
    ConcluidoPage.prototype.salvarDataLocal = function () {
        this.questionario_local_service.atualizarQuestionariosList(this.questionariosConcluidos);
    };
    //-------------------------------------------------------------------------------------//
    ConcluidoPage.prototype.iniciarListas = function () {
        this.respostaPossivelEscolhaList = new Array();
        this.respostaTextoList = new Array();
        this.respostaArquivoList = new Array();
        this.respostaImagemList = new Array();
        this.respostaCoordenadaList = new Array();
        this.respostaValorList = new Array();
        this.perguntaPossivelEscolhaList = new Array;
        this.perguntaTextoList = new Array();
        this.perguntaArquivoList = new Array();
        this.perguntaImagemList = new Array();
        this.perguntaCoordenadaList = new Array();
        this.perguntaValorList = new Array();
    };
    ConcluidoPage.prototype.verificarSincronismo = function () {
        this.contadorSincronismo < 5 ? this.contadorSincronismo++ : this.loadingFinalizar();
    };
    ConcluidoPage.prototype.getSetorSuperior = function (setor_superior) {
        return this.setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == setor_superior; }); //.nome
    };
    ConcluidoPage.prototype.getSetorNome = function (setor) {
        if (setor.setor_superior) {
            return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome;
        }
        return setor.nome;
    };
    ConcluidoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-concluido',
            templateUrl: 'concluido.html',
            providers: [AuthenticationServiceLocal, QuestionarioConcluidoLocalService,
                RespostaQuestionarioService, QuestionarioLocalService, RespostaPerguntaService,
                RespostaPossivelEscolhaService, RespostaTextoService, RespostaArquivoService,
                RespostaImagemService, RespostaLocalizacaoService, RespostaNumeroService,
                LocalizacaoService, SetorCensitarioLocalService, SetorCensitarioService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            AlertController,
            QuestionarioConcluidoLocalService,
            RespostaQuestionarioService,
            ActionSheetController,
            FerramentasProvider,
            QuestionarioLocalService,
            RespostaPerguntaService,
            RespostaPossivelEscolhaService,
            RespostaTextoService,
            RespostaArquivoService,
            RespostaImagemService,
            RespostaLocalizacaoService,
            RespostaNumeroService,
            LocalizacaoService,
            SetorCensitarioLocalService,
            VersaoAppService,
            BackupProvider])
    ], ConcluidoPage);
    return ConcluidoPage;
}());
export { ConcluidoPage };
//# sourceMappingURL=concluido.js.map