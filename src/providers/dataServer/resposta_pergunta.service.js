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
import { RespostaPergunta } from '../../models/resposta_pergunta.model';
var RespostaPerguntaService = /** @class */ (function (_super) {
    __extends(RespostaPerguntaService, _super);
    function RespostaPerguntaService(http) {
        var _this = _super.call(this, http, '/api/questionarios/respostas_pergunta') || this;
        _this.http = http;
        return _this;
    }
    RespostaPerguntaService.prototype.addRespostaPerguntaAll = function (respostaPerguntaList) {
        return _super.prototype.add.call(this, respostaPerguntaList);
    };
    RespostaPerguntaService.prototype.pushPerguntas = function (questionarioList) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var respostaPerguntaList = _this.converterRespostaPergunta(questionarioList);
            if (_this.listaVazia(respostaPerguntaList)) {
                _this.addRespostaPerguntaAll(respostaPerguntaList).subscribe(function (respostaPerguntaList) {
                    _this.salvarRespostaPerguntaSincronizada(questionarioList, respostaPerguntaList);
                    resolve(respostaPerguntaList);
                }, function (error) { return reject(error); });
            }
            else
                resolve([]);
        });
    };
    RespostaPerguntaService.prototype.converterRespostaPergunta = function (questionarioList) {
        var respostaPerguntaList = new Array();
        for (var _i = 0, _a = questionarioList.questionarios; _i < _a.length; _i++) {
            var questionario = _a[_i];
            for (var _b = 0, _c = questionario.perguntas; _b < _c.length; _b++) {
                var pergunta = _c[_b];
                // Se a pergunta não possui resposta sincronizada e a pergunta possui uma resposta
                if (!pergunta.resposta_pergunta && pergunta.resposta) {
                    var respostaPerguntaAux = new RespostaPergunta(questionario, pergunta);
                    respostaPerguntaList.push(respostaPerguntaAux);
                }
            }
        }
        return respostaPerguntaList;
    };
    RespostaPerguntaService.prototype.salvarRespostaPerguntaSincronizada = function (questionarioList, respostaPerguntaList) {
        var aux = 0;
        loop1: for (var _i = 0, _a = questionarioList.questionarios; _i < _a.length; _i++) {
            var questionario = _a[_i];
            for (var _b = 0, _c = questionario.perguntas; _b < _c.length; _b++) {
                var pergunta = _c[_b];
                if (!pergunta.resposta_pergunta && pergunta.resposta) {
                    pergunta.resposta_pergunta = respostaPerguntaList[aux];
                    aux++;
                    if (aux === respostaPerguntaList.length)
                        break loop1;
                }
            }
        }
    };
    RespostaPerguntaService.prototype.listaVazia = function (array) {
        return array.length > 0;
    };
    RespostaPerguntaService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], RespostaPerguntaService);
    return RespostaPerguntaService;
}(CoreService));
export { RespostaPerguntaService };
//# sourceMappingURL=resposta_pergunta.service.js.map