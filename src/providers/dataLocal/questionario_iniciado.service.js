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
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QuestionarioLocalService } from './questionario.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var QuestionarioIniciadoLocalService = /** @class */ (function (_super) {
    __extends(QuestionarioIniciadoLocalService, _super);
    function QuestionarioIniciadoLocalService(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.key = "questionarios_iniciados_PMSB";
        _this.secondKey = "questionarios_concluidos_PMSB";
        return _this;
        // this._removeQuestionarioIniciadosAll(); // COMENTE ESTA LINHA
    }
    // Usado apenas por devs
    QuestionarioIniciadoLocalService.prototype._removeQuestionarioIniciadosAll = function () {
        _super.prototype._removeQuestionarioAll.call(this, this.key);
    };
    QuestionarioIniciadoLocalService.prototype.removeQuestionarioIniciado = function (questionario, questionarioList) {
        _super.prototype.removerQuestionario.call(this, questionario, questionarioList);
    };
    QuestionarioIniciadoLocalService.prototype.adicionarNovoQuestionarioIniciado = function (questionario) {
        _super.prototype.adicionarNovoQuestionario.call(this, questionario, this.key);
    };
    QuestionarioIniciadoLocalService.prototype.getQuestionariosIniciados = function () {
        return _super.prototype.getQuestionarios.call(this, this.key);
    };
    QuestionarioIniciadoLocalService.prototype.concluirQuestionarioIniciado = function (questionario, questionarioList) {
        _super.prototype.alternarLista.call(this, questionario, questionarioList, this.secondKey);
    };
    // ------------------ Requisitos --------------------- //
    QuestionarioIniciadoLocalService.prototype.isPerguntaDisponivel = function (pergunta, questionarioList) {
        var disponivel = true;
        if (pergunta.perguntarequisito_set) {
            var resposta;
            pergunta.perguntarequisito_set.forEach(function (perguntaRequisitoSet) {
                resposta = questionarioList.questionarios
                    .find(function (q) { return q.id === perguntaRequisitoSet.pergunta_requisito.questionario; }).perguntas
                    .find(function (p) { return p.id === perguntaRequisitoSet.pergunta_requisito.pergunta; }).resposta;
                if (resposta === undefined)
                    disponivel = false;
            });
        }
        if (!disponivel)
            return disponivel;
        if (pergunta.escolharequisito_set) {
            pergunta.escolharequisito_set.forEach(function (escolhaRequisitoSet) {
                var perguntaR = questionarioList.questionarios
                    .find(function (q) { return q.id === escolhaRequisitoSet.questionario; }).perguntas
                    .find(function (p) { return p.id === escolhaRequisitoSet.pergunta; });
                var resposta = perguntaR.resposta;
                if (resposta) {
                    if (perguntaR.multipla) {
                        var escolhaMarcada = resposta.possiveis_escolhas_id.find(function (er) { return er.id === escolhaRequisitoSet.escolha_requisito; });
                        if (!escolhaMarcada)
                            disponivel = false;
                    }
                    else {
                        if (!(resposta.possivel_escolha_id.id === escolhaRequisitoSet.escolha_requisito)) {
                            disponivel = false;
                        }
                    }
                }
                else
                    disponivel = false;
            });
        }
        return disponivel;
    };
    QuestionarioIniciadoLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], QuestionarioIniciadoLocalService);
    return QuestionarioIniciadoLocalService;
}(QuestionarioLocalService));
export { QuestionarioIniciadoLocalService };
//# sourceMappingURL=questionario_iniciado.service.js.map