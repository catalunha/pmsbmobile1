import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthenticationServiceLocal } from './../providers/dataLocal/authentication.service';
import { VersaoAppService } from '../providers/dataServer/versao_app.service';
import { FerramentasProvider } from '../providers/ferramentas/ferramentas';
import { AppVersion } from '@ionic-native/app-version';
import { AtualizacaoPage } from '../pages/atualizacao/atualizacao';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenticationServiceLocal]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authenticarion_local: AuthenticationServiceLocal,
    private ferramenta: FerramentasProvider,
    private appVersion: AppVersion,
    private versaoApp_service: VersaoAppService) {

    let usuario_atual = this.authenticarion_local.getAuthentication();
    let versionVerification = this.appVersionVerification();
    if(versionVerification){
      if (usuario_atual) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    }else{
      this.rootPage = AtualizacaoPage;
    }
      

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public async appAtualizationVerification(){
    let lastVersion = await this.appLastVersionVerification();
    let appVersion = await this.appVersionVerification();

    if(lastVersion!==appVersion){
      return false;
    }else{
      return true;
    }
  }

  
  public appVersionVerification() {
    return new Promise((resolve, reject) => {
      this.appVersion.getVersionNumber().then(
      versao => {
        resolve(versao);
      }
      ).catch(error => {
        this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual do aplicativo, por favor atualize!");
        this.rootPage = AtualizacaoPage;
        reject(error);
      });
    });
  }
  public appLastVersionVerification(){
    return new Promise((resolve, reject) => {
      this.versaoApp_service.getVersaoApp({}).subscribe(
        resposta => {
          resolve(resposta);
      },
      error => {
        this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual do aplicativo, por favor atualize!");
        this.rootPage = AtualizacaoPage;
        reject(error);
      });
    });
  }
}
