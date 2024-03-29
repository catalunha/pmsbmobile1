import { Injectable } from '@angular/core';
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { ToastController } from 'ionic-angular';

@Injectable()
export class FerramentasProvider {

  constructor(public alertCtrl: AlertController,
              public toastCtrl: ToastController) {}

  showAlert(main_text: string, sub_text: string) {
    let alert = this.alertCtrl.create({
      title: main_text,
      subTitle: sub_text,
      buttons: ["OK"]
    });
    alert.present();
  }

  presentToast(texto: string) {
    const toast = this.toastCtrl.create({
      message: texto,
      duration: 4000
    });
    toast.present();
  }

}
