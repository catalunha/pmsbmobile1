import { ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from "ionic-angular/components/alert/alert-controller";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { FerramentasProvider } from './ferramentas'
import { Resposta, Imagem } from '../../models/resposta.model';
import { Pergunta } from '../../models/pergunta.model';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class CameraService extends FerramentasProvider {

  constructor(private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private alert: AlertController,
    private toast: ToastController,
    public loadingCtrl: LoadingController) {
    super(alert, toast, loadingCtrl);
  }

  coordenadas: any;

  selecionarImagem(pergunta: Pergunta, coordenadas: any) {
    this.coordenadas = coordenadas;
    const actionSheet = this.actionSheetCtrl.create({
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
          handler: () => {
            this.configFoto(pergunta, 1);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private configFoto(pergunta: Pergunta, tipo: Number) {
    if (tipo === 0) this.capturarFoto(pergunta);
    else this.acessarGaleria(pergunta);
  }

  private capturarFoto(pergunta: any) {
    const options: CameraOptions = {
      // quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.adicionarResposta(pergunta, base64image);
      }, (error) => {
        console.error(error);
        super.showAlert("Falha", "Erros ocorreram na captura da imagem.")
      })
      .catch((error) => {
        console.error(error);
        super.showAlert("Falha", "Erros ocorreram na captura da imagem.")
      });
  }

  private acessarGaleria(pergunta: any) {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.adicionarResposta(pergunta, base64image);
    }, (err) => {
      console.log(err);
      super.showAlert("Falha", "Erros ocorreram na seleção da imagem.");
    });
  }

  private criarRespostaImagem(): Imagem {
    var respostaAux = new Imagem();
    respostaAux.latitude = this.coordenadas.latitude;
    respostaAux.longitude = this.coordenadas.longitude;
    return respostaAux;
  }

  private adicionarResposta(pergunta, base64image){
    if (!pergunta.resposta) {
      var respostaAux = this.criarRespostaImagem();
      respostaAux.imagem = base64image;
      pergunta.resposta = respostaAux;
    } else {
      pergunta.resposta.latitude = this.coordenadas.latitude;
      pergunta.resposta.longitude = this.coordenadas.longitude;
      pergunta.resposta.imagem = base64image;
    }
  }

}
