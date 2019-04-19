var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { QuestionarioLocalService } from './questionario.service';
import { QuestionarioService } from './../dataServer/questionario.service';
import { AtualizaQuestionario } from './atualiza_questionario.service';
import { FerramentasProvider } from './../ferramentas/ferramentas';
var QuestionarioDisponivelLocalService = /** @class */ (function (_super) {
    __extends(QuestionarioDisponivelLocalService, _super);
    function QuestionarioDisponivelLocalService(storage, questionarioServer, avaliadorQuestionario, ferramenta) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.questionarioServer = questionarioServer;
        _this.avaliadorQuestionario = avaliadorQuestionario;
        _this.ferramenta = ferramenta;
        _this.eventoUpdateQuestionarioDisponivel = new EventEmitter();
        _this.errorAlert = function (error, msg) {
            _this.ferramenta.presentToast(msg + " N\u00E3o foi poss\u00EDvel atualizar os dados.");
            console.error(error);
        };
        _this.key = "questionarios_disponivel_PMSB";
        _this.secondKey = "questionarios_iniciados_PMSB";
        _this.getQuestionariosServidor();
        return _this;
        // this._removeQuestionarioDisponiveisAll(); // Comente esta linha
    }
    QuestionarioDisponivelLocalService.prototype._removeQuestionarioDisponiveisAll = function () {
        _super.prototype._removeQuestionarioAll.call(this, this.key);
    };
    QuestionarioDisponivelLocalService.prototype.adicionarNovoQuestionarioIniciado = function (questionario) {
        _super.prototype.adicionarNovoQuestionario.call(this, questionario, this.secondKey);
    };
    QuestionarioDisponivelLocalService.prototype.removeQuestionarioDisponivel = function (questionario, questionarioList) {
        _super.prototype.removerQuestionario.call(this, questionario, questionarioList);
    };
    QuestionarioDisponivelLocalService.prototype.adicionarNovoQuestionarioDisponivel = function (questionario) {
        _super.prototype.adicionarNovoQuestionario.call(this, questionario, this.key);
    };
    QuestionarioDisponivelLocalService.prototype.getQuestionariosDisponiveis = function () {
        return _super.prototype.getQuestionarios.call(this, this.key);
    };
    // ------------------------------------ //
    QuestionarioDisponivelLocalService.prototype.getQuestionariosIniciados = function () {
        return _super.prototype.getQuestionarios.call(this, this.secondKey);
    };
    QuestionarioDisponivelLocalService.prototype.getQuestionariosServidor = function () {
        var _this = this;
        var sucess = function (questionariosList) { return _this.verificarInicializacao(questionariosList); };
        this.questionarioServer.getQuestionarios({}).subscribe(sucess, function (error) { return _this.errorAlert(error, "[ERRO 01]"); });
    };
    QuestionarioDisponivelLocalService.prototype.verificarInicializacao = function (listaQuestionario) {
        var _this = this;
        this.getQuestionariosDisponiveis().then(function (questionariosList) {
            if (questionariosList)
                _this.verificarAtualizacao(listaQuestionario, questionariosList);
            else
                _this.adicionarQuestionariosDisponiveis(listaQuestionario);
        }).catch(function (error) { return _this.errorAlert(error, "[ERRO 02]"); });
    };
    QuestionarioDisponivelLocalService.prototype.verificarAtualizacao = function (questionariosServidor, questionariosLocal) {
        var _this = this;
        this.avaliadorQuestionario.setObservacoes();
        var atualizaDisponiveis = this.avaliadorQuestionario.verificarListaQuestionarioPipeline(questionariosServidor, questionariosLocal);
        if (atualizaDisponiveis) {
            this.avaliadorQuestionario.salvarObservacoes();
            console.log("Atualizando Questionários: Disponíveis");
            _super.prototype.atualizarQuestionariosList.call(this, questionariosLocal)
                .then(function (lista) {
                _this.atualizarViewQuestionarioDisponivel(lista);
                _this.avaliadorQuestionario.setObservacoes(false);
                _this.getQuestionariosIniciados().then(function (questionariosIniciados) {
                    if (questionariosIniciados) {
                        console.log("Atualizando Questionários: Iniciados");
                        var atualizaIniciados = _this.avaliadorQuestionario.verificarQuestionarioEditado(questionariosServidor, questionariosIniciados);
                        if (atualizaIniciados)
                            _super.prototype.atualizarQuestionariosList.call(_this, questionariosIniciados);
                    }
                }).catch(function (error) { return _this.errorAlert(error, "[ERRO 03]"); });
            })
                .catch(function (error) { return _this.errorAlert(error, "[ERRO 04]"); });
        }
        else {
            this.ferramenta.presentToast("Questionários Atualizados!");
        }
    };
    QuestionarioDisponivelLocalService.prototype.adicionarQuestionariosDisponiveis = function (listaQuestionario) {
        var _this = this;
        var sucess = function (questionariosList) { return _this.atualizarViewQuestionarioDisponivel(questionariosList); };
        _super.prototype.adicionarVariosQuestionarios.call(this, listaQuestionario, this.key)
            .then(sucess).catch(function (error) { return _this.errorAlert(error, "[ERRO 05]"); });
    };
    QuestionarioDisponivelLocalService.prototype.atualizarViewQuestionarioDisponivel = function (questionariosList) {
        this.eventoUpdateQuestionarioDisponivel.emit(questionariosList);
        this.ferramenta.presentToast("Questionários Atualizados!");
    };
    QuestionarioDisponivelLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage,
            QuestionarioService,
            AtualizaQuestionario,
            FerramentasProvider])
    ], QuestionarioDisponivelLocalService);
    return QuestionarioDisponivelLocalService;
}(QuestionarioLocalService));
export { QuestionarioDisponivelLocalService };
//# sourceMappingURL=questionario_disponivel.service.js.map