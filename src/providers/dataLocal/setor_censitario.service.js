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
import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SetorCensitarioService } from '../dataServer/setor_censitario.service';
import { SetorCensitarioList } from '../../models/setor_censitario.model';
import { FerramentasProvider } from '../ferramentas/ferramentas';
import { CoreServiceLocal } from './core.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var SetorCensitarioLocalService = /** @class */ (function (_super) {
    __extends(SetorCensitarioLocalService, _super);
    function SetorCensitarioLocalService(storage, setorCensitarioServer, ferramenta) {
        var _this = _super.call(this, storage) || this;
        _this.storage = storage;
        _this.setorCensitarioServer = setorCensitarioServer;
        _this.ferramenta = ferramenta;
        _this.eventoUpdateSetorCensitario = new EventEmitter();
        _this.error = function (error) {
            //this.ferramenta.presentToast("Não foi possível atualizar os dados.");
            console.error(error);
        };
        _this.key = "setores_censitarios_PMSB";
        _this.getSetoresCensitariosServidor();
        return _this;
        //this._removeSetorCensitarioDisponiveisAll(); // Comente esta linha
    }
    SetorCensitarioLocalService.prototype._removeSetorCensitarioDisponiveisAll = function () {
        _super.prototype.removeItemStorage.call(this, this.key);
    };
    SetorCensitarioLocalService.prototype.getSetoresCensitariosDisponiveis = function () {
        return _super.prototype.getStorage.call(this, this.key);
    };
    SetorCensitarioLocalService.prototype.apagarListaOfflinePeloId = function (id) {
        var setores_offline = this.getSetoresOffline().filter(function (setor) { return setor.id != id; });
        _super.prototype.saveLocalStorage.call(this, "setores-offline", JSON.stringify(setores_offline));
        console.log({ setores_offline: this.getSetoresOffline() });
    };
    SetorCensitarioLocalService.prototype.getSetoresOffline = function () {
        var setores_offline = JSON.parse(_super.prototype.getLocalStorage.call(this, 'setores-offline'));
        if (setores_offline) {
            return setores_offline;
        }
        return [];
    };
    SetorCensitarioLocalService.prototype.salvarSetorOffline = function (setor) {
        var setor_lista = this.getSetoresOffline();
        console.log(setor_lista);
        if (!setor_lista) {
            setor_lista = [];
        }
        setor_lista.push(setor);
        _super.prototype.saveLocalStorage.call(this, "setores-offline", JSON.stringify(setor_lista));
    };
    SetorCensitarioLocalService.prototype.apagarListaOffline = function () {
        _super.prototype.removeItemStorage.call(this, 'setores-offline');
    };
    SetorCensitarioLocalService.prototype.prepararSetorParaPostagem = function (setor) {
        var setor_obj = {
            "fake_deletado": false,
            "fake_deletado_em": null,
            "nome": setor.nome,
            "ativo": true,
            "setor_superior": setor.setor_superior
        };
        if (setor.id) {
            setor_obj['id'] = setor.id;
        }
        console.log({ Setor_vai_ser_postado: setor_obj });
        return setor_obj;
    };
    SetorCensitarioLocalService.prototype.postSetorSencitario = function (setor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.setorCensitarioServer.setSetorCensitario(_this.prepararSetorParaPostagem(setor)).subscribe(function (resposta) {
                                _this.getSetoresCensitariosServidor();
                                resolve(true);
                            }, function (erro) {
                                reject({ error: erro, setor: setor });
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SetorCensitarioLocalService.prototype.getSetoresCensitariosServidor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.setorCensitarioServer.getSetoresCensitarios({}).subscribe(function (setorCensitariosList) {
                    _this.adicionarSetorCensitarios(setorCensitariosList);
                }, this.error);
                return [2 /*return*/];
            });
        });
    };
    SetorCensitarioLocalService.prototype.adicionarSetorCensitarios = function (listaSetorCensitario) {
        var _this = this;
        var sucess = function (setorCensitariosList) { return _this.atualizarViewSetorCensitario(setorCensitariosList); };
        this.adicionarVariosSetoresCensitarios(listaSetorCensitario, this.key)
            .then(sucess).catch(this.error);
    };
    SetorCensitarioLocalService.prototype.adicionarVariosSetoresCensitarios = function (listaSetores, key) {
        var setorAux = new SetorCensitarioList(key);
        setorAux.setoresCensitarios = listaSetores.slice();
        return _super.prototype.saveStorage.call(this, setorAux.key, setorAux);
    };
    SetorCensitarioLocalService.prototype.atualizarViewSetorCensitario = function (setorCensitariosList) {
        this.eventoUpdateSetorCensitario.emit(setorCensitariosList);
    };
    SetorCensitarioLocalService.prototype.getSetorSuperior = function (setor_superior, setoresDisponiveis) {
        return setoresDisponiveis.setoresCensitarios.find(function (setor) { return setor.id == setor_superior; }); //.nome
    };
    SetorCensitarioLocalService.prototype.getSetorNome = function (setor, setoresDisponiveis) {
        if (setor.setor_superior) {
            return this.getSetorNome(this.getSetorSuperior(setor.setor_superior, setoresDisponiveis), setoresDisponiveis) + " -> " + setor.nome;
        }
        return setor.nome;
    };
    SetorCensitarioLocalService.prototype.getSetorPeloId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var setorDisponivel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSetoresCensitariosDisponiveis()];
                    case 1:
                        setorDisponivel = _a.sent();
                        return [4 /*yield*/, this.getSetoresOffline().forEach(function (setor) { setorDisponivel.setoresCensitarios.push(setor); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, setorDisponivel.setoresCensitarios.find(function (setor) { return setor.id == id; })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SetorCensitarioLocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage,
            SetorCensitarioService,
            FerramentasProvider])
    ], SetorCensitarioLocalService);
    return SetorCensitarioLocalService;
}(CoreServiceLocal));
export { SetorCensitarioLocalService };
//# sourceMappingURL=setor_censitario.service.js.map