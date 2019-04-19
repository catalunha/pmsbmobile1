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
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';
import { QuestionariosList } from '../../models/questionario.model';
import { removeArrayItem } from 'ionic-angular/util/util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var QuestionarioLocalService = /** @class */ (function (_super) {
    __extends(QuestionarioLocalService, _super);
    function QuestionarioLocalService(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        return _this;
    }
    QuestionarioLocalService.prototype.atualizarQuestionariosList = function (questionarioList) {
        return _super.prototype.saveStorage.call(this, questionarioList.key, questionarioList);
    };
    QuestionarioLocalService.prototype._removeQuestionarioAll = function (key) {
        _super.prototype.removeItemStorage.call(this, key);
    };
    QuestionarioLocalService.prototype.removerQuestionario = function (questionario, questionariosList) {
        if (removeArrayItem(questionariosList.questionarios, questionario)) {
            this.atualizarQuestionariosList(questionariosList);
        }
    };
    QuestionarioLocalService.prototype.adicionarNovoQuestionario = function (questionario, key) {
        var _this = this;
        _super.prototype.getStorage.call(this, key)
            .then(function (listaQuestionarios) {
            if (!listaQuestionarios)
                listaQuestionarios = new QuestionariosList(key);
            listaQuestionarios.questionarios.unshift(questionario);
            _super.prototype.saveStorage.call(_this, listaQuestionarios.key, listaQuestionarios);
        }).catch(function (error) { return console.error(error); });
    };
    QuestionarioLocalService.prototype.adicionarVariosQuestionarios = function (listaQuestionario, key) {
        var questionariosAux = new QuestionariosList(key);
        questionariosAux.questionarios = listaQuestionario.slice();
        return _super.prototype.saveStorage.call(this, questionariosAux.key, questionariosAux);
    };
    QuestionarioLocalService.prototype.getQuestionarios = function (key) {
        return _super.prototype.getStorage.call(this, key);
    };
    QuestionarioLocalService.prototype.alternarLista = function (questionario, questionarioList, to_key) {
        this.adicionarNovoQuestionario(questionario, to_key);
        this.removerQuestionario(questionario, questionarioList);
    };
    QuestionarioLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], QuestionarioLocalService);
    return QuestionarioLocalService;
}(CoreServiceLocal));
export { QuestionarioLocalService };
//# sourceMappingURL=questionario.service.js.map