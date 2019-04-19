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
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FerramentasProvider } from './ferramentas';
import { EmailComposer } from '@ionic-native/email-composer';
/*
  Generated class for the FileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BackupProvider = /** @class */ (function () {
    function BackupProvider(emailComposer, ferramentasService, file) {
        this.emailComposer = emailComposer;
        this.ferramentasService = ferramentasService;
        this.file = file;
        this.root_path = "file:///";
        this.teste = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    }
    BackupProvider.prototype.salvarBackup = function (questionario, areas) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fileSave = {
                            areas: areas,
                            questionarios: questionario
                        };
                        return [4 /*yield*/, this.vericarRepositorioExiste()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //---------------------- Salvar backup localmente --------------------------------
    BackupProvider.prototype.vericarRepositorioExiste = function () {
        var _this = this;
        this.file.checkDir(this.file.externalApplicationStorageDirectory, 'pmsb').then(function (_) {
            _this.salvarLocalmenteFile();
        }).catch(function (err) {
            _this.criarDiretorio();
        });
    };
    BackupProvider.prototype.criarDiretorio = function () {
        var _this = this;
        this.file.createDir(this.file.externalApplicationStorageDirectory, "pmsb", false).then(function (_) {
            _this.salvarLocalmenteFile();
        }).catch(function (erro) {
            _this.ferramentasService.showAlert('O diretorio não foi criado', "");
        });
    };
    BackupProvider.prototype.salvarLocalmenteFile = function () {
        var _this = this;
        this.nome_file = this.gerarNomeArquivo();
        this.diretorio = this.file.externalApplicationStorageDirectory + "/pmsb/" + this.nome_file;
        this.file.writeFile(this.file.externalApplicationStorageDirectory + "/pmsb", this.nome_file, JSON.stringify(this.fileSave), { replace: false })
            .then(function () {
        }).catch(function (err) {
            _this.ferramentasService.showAlert('O file não foi criado', JSON.stringify(err));
            console.error(err);
        });
    };
    BackupProvider.prototype.gerarNomeArquivo = function () {
        var date = new Date().toLocaleString();
        return "pmsb-" + date.replace(/[^\d]/g, '-') + ".json";
    };
    //---------------------- Salvar backup no email --------------------------------
    BackupProvider.prototype.enviarBackupPorEmail = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'pmsb.web@gmail.com',
            cc: '',
            bcc: [''],
            attachments: [
                this.diretorio
            ],
            subject: this.nome_file,
            body: 'Não alterar esse email, somente enviar !',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    BackupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EmailComposer, FerramentasProvider, File])
    ], BackupProvider);
    return BackupProvider;
}());
export { BackupProvider };
//# sourceMappingURL=backup.service.js.map