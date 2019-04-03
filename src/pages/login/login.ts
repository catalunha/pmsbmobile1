import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AppVersion } from '@ionic-native/app-version';
import { AuthenticationService } from './../../providers/dataServer/authentication.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { UsuarioService } from './../../providers/dataServer/usuario.service';
import { VersaoAppService } from '../../providers/dataServer/versao_app.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService, AuthenticationServiceLocal, UsuarioService]
})
export class LoginPage {
  versionNumber;
  lastVersion;
  minVersion;
  blockApp : boolean = false;
  public model: any = {
    username: "",
    password: ""
  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private authentication_service: AuthenticationService,
    private authentication_local: AuthenticationServiceLocal,
    private ferramenta: FerramentasProvider,
    private appVersion: AppVersion,
    private versaoApp_service: VersaoAppService) {
      this.appVersionVerification()
  }

  public appVersionVerification() {
    this.appVersion.getVersionNumber().then(
      versao => {
        this.versionNumber = versao;
      }
    ).catch(error => console.log(error));
    this.versionNumber = Number(this.versionNumber);
    this.lastVersion = Number(this.versaoApp_service.getVersaoApp);
    console.log(this.versaoApp_service.getVersaoApp);
    if (this.versionNumber<this.lastVersion){
        this.ferramenta.showAlert("Aplicativo Desatualizado", "O aplicativo não possui a versão minima para uso, por favor atualize seu aplicativo");
        this.blockApp = true;
    }else{
      this.ferramenta.showAlert("Aplicativo Atualizado", "Aplicativo atualizado!");
    }
  }

  public login() {

    let loading = this.loadingCtrl.create({
      content: 'Efetuando login...'
    });
    loading.present();
  
    this.authentication_service.login(this.model).subscribe(
      resposta => {
        this.authentication_local.saveAuthentication(resposta);
        this.ferramenta.showAlert("Bem vindo(a)!", "Login realizado com sucesso.");
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      },
      error => {
        this.ferramenta.showAlert("Falha no login!", "Verifique Usuário e Senha");
        loading.dismiss();
        console.error(error);
      }
    );
  }



}
