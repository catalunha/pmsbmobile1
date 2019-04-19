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
import { ObservacaoList } from '../../models/observacao.model';
import { CoreServiceLocal } from './core.service';
var ObservacaoLocalService = /** @class */ (function (_super) {
    __extends(ObservacaoLocalService, _super);
    function ObservacaoLocalService(storage) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.key = "lista_observacoes_PMSB";
        return _this;
        // this.removeObservacoesAll();
    }
    ObservacaoLocalService.prototype.removeObservacoesAll = function () {
        _super.prototype.removeItemStorage.call(this, this.key);
    };
    ObservacaoLocalService.prototype.getListObservacoes = function () {
        return _super.prototype.getStorage.call(this, this.key);
    };
    ObservacaoLocalService.prototype.atualizarListObservacoes = function (observacaoList) {
        _super.prototype.saveStorage.call(this, observacaoList.key, observacaoList);
    };
    ;
    ObservacaoLocalService.prototype.adicionarListaObservacoes = function (lista) {
        var _this = this;
        _super.prototype.getStorage.call(this, this.key).then(function (listaObservacoes) {
            if (!listaObservacoes)
                listaObservacoes = new ObservacaoList(_this.key);
            listaObservacoes.lista = lista.concat(listaObservacoes.lista);
            _this.atualizarListObservacoes(listaObservacoes);
        }).catch(function (error) { return console.log(error); });
    };
    ObservacaoLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], ObservacaoLocalService);
    return ObservacaoLocalService;
}(CoreServiceLocal));
export { ObservacaoLocalService };
//# sourceMappingURL=observacao.service.js.map