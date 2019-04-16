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
  appMyVersion: string;
  lastVersion: string;
  versionVerification: any;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authenticarion_local: AuthenticationServiceLocal,
    private ferramenta: FerramentasProvider,
    private appVersion: AppVersion,
    private versaoApp_service: VersaoAppService) {

    this.versaoApp_service.verificaVesaoOnline()
    this.iniciar()
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  async iniciar() {
    await this.versaoApp_service.verificaVesaoOnline()
    await this.verificaVersaoAtualizadaNoStorage()
  }

  private async determinarRootPage() {
    let usuario_atual = await this.authenticarion_local.getAuthentication();
    if (usuario_atual) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  private async appAtualizationVerification() {
    this.versaoApp_service.verificarVersaoEstaAtualizada().then((result) => {
      this.ferramenta.showAlert(JSON.stringify(result), "")
      this.versionVerification = result
    })
  }

  private async verificaVersaoAtualizadaNoStorage() {
    let versao: any = this.versaoApp_service.getVersaoStorage()
    if (versao) {
      if (versao.atualizado) {
        this.determinarRootPage()
      } else {
        this.rootPage = AtualizacaoPage;
      }
    } else {
      this.determinarRootPage()
    }
  }
}
