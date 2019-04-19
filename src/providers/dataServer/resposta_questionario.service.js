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
import { Http } from '@angular/http';
import { CoreService } from './core.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { RespostaQuestionario } from '../../models/resposta_questionario.model';
var RespostaQuestionarioService = /** @class */ (function (_super) {
    __extends(RespostaQuestionarioService, _super);
    function RespostaQuestionarioService(http) {
        var _this = _super.call(this, http, '/api/questionarios/respostas') || this;
        _this.http = http;
        return _this;
    }
    RespostaQuestionarioService.prototype.getQuestionarios = function (params) {
        return _super.prototype.all.call(this, params);
    };
    RespostaQuestionarioService.prototype.addRespostaQuestionarioAll = function (respostaQuestionarioList) {
        return _super.prototype.add.call(this, respostaQuestionarioList);
    };
    RespostaQuestionarioService.prototype.pushQuestionarios = function (questionarioList) {
        var _this = this;
        // Verificando se existem questionários concluídos
        return new Promise(function (resolve, reject) {
            if (_this.listaVazia(questionarioList.questionarios)) {
                // Recebendo a lista com os questionários que ainda não possuem uma "resposta_questionario"
                var respostaQuestionarioList = _this.converterRespostaQuestionario(questionarioList);
                if (_this.listaVazia(respostaQuestionarioList)) {
                    // [Sincronização] Criando "resposta_questionario" para os questionários concluídos
                    _this.addRespostaQuestionarioAll(respostaQuestionarioList).subscribe(function (respostaQuestionarioList) {
                        _this.salvarRespostaQuestionarioSincronizada(questionarioList, respostaQuestionarioList);
                        resolve(respostaQuestionarioList);
                    }, function (error) { return reject(error); });
                }
                else
                    resolve([]);
            }
            else
                resolve([]);
        });
    };
    RespostaQuestionarioService.prototype.converterRespostaQuestionario = function (questionarioList) {
        var respostaQuestionarioList = new Array();
        for (var _i = 0, _a = questionarioList.questionarios; _i < _a.length; _i++) {
            var questionario = _a[_i];
            if (!questionario.resposta_questionario) {
                var respostaQuestionarioAux = new RespostaQuestionario(questionario.usuario, questionario);
                respostaQuestionarioList.push(respostaQuestionarioAux);
            }
        }
        return respostaQuestionarioList;
    };
    RespostaQuestionarioService.prototype.salvarRespostaQuestionarioSincronizada = function (questionarioList, respostaQuestionarioList) {
        var aux = 0;
        for (var _i = 0, _a = questionarioList.questionarios; _i < _a.length; _i++) {
            var questionario = _a[_i];
            if (!questionario.resposta_questionario) {
                questionario.resposta_questionario = respostaQuestionarioList[aux];
                aux++;
                if (aux === respostaQuestionarioList.length)
                    break;
            }
        }
    };
    RespostaQuestionarioService.prototype.listaVazia = function (array) {
        return array.length > 0;
    };
    RespostaQuestionarioService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], RespostaQuestionarioService);
    return RespostaQuestionarioService;
}(CoreService));
export { RespostaQuestionarioService };
//# sourceMappingURL=resposta_questionario.service.js.map