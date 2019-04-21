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
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.verificaVersaoOnline()
    });
  }

  private async verificaVersaoOnline() {
    this.determinarRootPage()

    this.versaoApp_service.getVersaoApp({}).subscribe(
      resposta => {
        this.verificaVersaoOffline(resposta)
      }, error => {
        this.verificaVersaoAtualizadaNoStorage()
      });
  }

  private verificaVersaoOffline(versao_on) {
    this.appVersion.getVersionNumber().then(
      versao_off => {
        if (versao_off == versao_on) {
          this.determinarRootPage()
          this.versaoApp_service.atualizaStorageVersao(versao_on, true)
        } else {
          this.rootPage = AtualizacaoPage
          this.versaoApp_service.atualizaStorageVersao(versao_on, false)
        }
      }).catch(error => { this.ferramenta.showAlert("Houve um erro na verificação de versão !", "") });
  }

  private async determinarRootPage() {
    let usuario_atual = await this.authenticarion_local.getAuthentication();
    let usuario_dados = await JSON.parse(this.authenticarion_local.getUserData())

    if (this.verificarSeUsuarioPertenceGrupo, 10) {
      if (usuario_atual && usuario_dados) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    } else {
      this.ferramenta.showAlert("Acesso não autorizado no momento.", "")
      this.rootPage = LoginPage;
    }
  }

  public verificarSeUsuarioPertenceGrupo(user, group_id) {
    if (user['groups'].length <= 0) { return false }
    var resultado = false
    user['groups'].forEach(element => {
      if (element == group_id) { resultado = true }
    })
    return resultado
  }

  private verificaVersaoAtualizadaNoStorage() {
    let versao: any = this.versaoApp_service.getVersaoStorage()
    if (versao) {
      if (versao.atualizado) {
        this.determinarRootPage()
      } else {
        this.rootPage = AtualizacaoPage
      }
    } else {
      this.rootPage = AtualizacaoPage
      this.ferramenta.showAlert("Acesso não autorizado no momento.", "")
    }
  }

}
