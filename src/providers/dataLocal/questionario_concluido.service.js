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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { QuestionarioLocalService } from './questionario.service';
var QuestionarioConcluidoLocalService = /** @class */ (function (_super) {
    __extends(QuestionarioConcluidoLocalService, _super);
    function QuestionarioConcluidoLocalService(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.key = "questionarios_concluidos_PMSB";
        _this.secondKey = "questionarios_iniciados_PMSB";
        return _this;
        // this._removeQuestionarioConcluidosAll();
    }
    QuestionarioConcluidoLocalService.prototype._removeQuestionarioConcluidosAll = function () {
        _super.prototype._removeQuestionarioAll.call(this, this.key);
    };
    QuestionarioConcluidoLocalService.prototype.removeQuestionarioConcluido = function (questionario, questionarioList) {
        _super.prototype.removerQuestionario.call(this, questionario, questionarioList);
    };
    QuestionarioConcluidoLocalService.prototype.adicionarNovoQuestionarioConcluido = function (questionario) {
        _super.prototype.adicionarNovoQuestionario.call(this, questionario, this.key);
    };
    QuestionarioConcluidoLocalService.prototype.getQuestionariosConcluidos = function () {
        return _super.prototype.getQuestionarios.call(this, this.key);
    };
    QuestionarioConcluidoLocalService.prototype.editarQuestionarioConcluido = function (questionario, questionarioList) {
        _super.prototype.alternarLista.call(this, questionario, questionarioList, this.secondKey);
    };
    QuestionarioConcluidoLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], QuestionarioConcluidoLocalService);
    return QuestionarioConcluidoLocalService;
}(QuestionarioLocalService));
export { QuestionarioConcluidoLocalService };
//# sourceMappingURL=questionario_concluido.service.js.map