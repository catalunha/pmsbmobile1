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
import { ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Camera } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { FerramentasProvider } from './ferramentas';
import { Imagem } from '../../models/resposta.model';
import { LoadingController } from 'ionic-angular';
var CameraService = /** @class */ (function (_super) {
    __extends(CameraService, _super);
    function CameraService(camera, actionSheetCtrl, alert, toast, loadingCtrl) {
        var _this = _super.call(this, alert, toast, loadingCtrl) || this;
        _this.camera = camera;
        _this.actionSheetCtrl = actionSheetCtrl;
        _this.alert = alert;
        _this.toast = toast;
        _this.loadingCtrl = loadingCtrl;
        return _this;
    }
    CameraService.prototype.selecionarImagem = function (pergunta, coordenadas) {
        var _this = this;
        this.coordenadas = coordenadas;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Selecionar Imagem',
            buttons: [
                // {
                //   text: 'Capturar Imagem',
                //   handler: () => {
                //     this.configFoto(pergunta, 0);
                //   }
                // }, 
                {
                    text: 'Abrir da Galeria',
                    handler: function () {
                        _this.configFoto(pergunta, 1);
                    }
                }, {
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
    CameraService.prototype.configFoto = function (pergunta, tipo) {
        if (tipo === 0)
            this.capturarFoto(pergunta);
        else
            this.acessarGaleria(pergunta);
    };
    CameraService.prototype.capturarFoto = function (pergunta) {
        var _this = this;
        var options = {
            // quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            saveToPhotoAlbum: true
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            var base64image = 'data:image/jpeg;base64,' + imageData;
            _this.adicionarResposta(pergunta, base64image);
        }, function (error) {
            console.error(error);
            _super.prototype.showAlert.call(_this, "Falha", "Erros ocorreram na captura da imagem.");
        })
            .catch(function (error) {
            console.error(error);
            _super.prototype.showAlert.call(_this, "Falha", "Erros ocorreram na captura da imagem.");
        });
    };
    CameraService.prototype.acessarGaleria = function (pergunta) {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            var base64image = 'data:image/jpeg;base64,' + imageData;
            _this.adicionarResposta(pergunta, base64image);
        }, function (err) {
            console.log(err);
            _super.prototype.showAlert.call(_this, "Falha", "Erros ocorreram na seleção da imagem.");
        });
    };
    CameraService.prototype.criarRespostaImagem = function () {
        var respostaAux = new Imagem();
        respostaAux.latitude = this.coordenadas.latitude;
        respostaAux.longitude = this.coordenadas.longitude;
        return respostaAux;
    };
    CameraService.prototype.adicionarResposta = function (pergunta, base64image) {
        if (!pergunta.resposta) {
            var respostaAux = this.criarRespostaImagem();
            respostaAux.imagem = base64image;
            pergunta.resposta = respostaAux;
        }
        else {
            pergunta.resposta.latitude = this.coordenadas.latitude;
            pergunta.resposta.longitude = this.coordenadas.longitude;
            pergunta.resposta.imagem = base64image;
        }
    };
    CameraService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Camera,
            ActionSheetController,
            AlertController,
            ToastController,
            LoadingController])
    ], CameraService);
    return CameraService;
}(FerramentasProvider));
export { CameraService };
//# sourceMappingURL=camera.service.js.map