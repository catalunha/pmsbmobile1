import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationServiceLocal } from '../../providers/dataLocal/authentication.service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { AppVersion } from '@ionic-native/app-version';
import { VersaoAppService } from '../../providers/dataServer/versao_app.service';

@IonicPage()
@Component({
  selector: 'page-atualizacao',
  templateUrl: 'atualizacao.html',
  providers: [AuthenticationServiceLocal]
})
export class AtualizacaoPage {

  block = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authenticarion_local: AuthenticationServiceLocal,
    private ferramenta: FerramentasProvider,
    private appVersion: AppVersion,
    private versaoApp_service: VersaoAppService) {

    this.appAtualizationVerification().then(
      versionVerification => {
        if (versionVerification) {
          // console.log("Block False");
          let usuario_atual = this.authenticarion_local.getAuthentication();
          if (usuario_atual) this.navCtrl.setRoot(TabsPage);
          else this.navCtrl.setRoot(LoginPage);
        } else {
          // console.log("Block True");
          this.block = true;
        }
      }
    );
  }

  public async appAtualizationVerification(): Promise<any> {
    return new Promise(async (resolve) => {
      let appVersion = await this.appVersionVerification();
      let lastVersion = await this.appLastVersionVerification();
      console.log(appVersion);
      console.log(lastVersion);
      resolve(lastVersion === appVersion);
    });
  }

  public appVersionVerification() {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then(
        versao => {
          resolve(versao);
        }
      ).catch(error => {
        console.log(error);
        this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual do aplicativo, por favor atualize!");
        // resolve("");
        resolve("1.0.0"); // REMOVER ESTA LINHA E DESCOMENTAR A LINHA ACIMA!
      });
    });
  }

  public appLastVersionVerification() {
    return new Promise((resolve) => {
      this.versaoApp_service.getVersaoApp({}).subscribe(
        resposta => {
          resolve(resposta);
        },
        error => {
          console.log(error);
          this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual disponível no servidor, por favor atualize!");
          resolve("");
        });
    });
  }
}