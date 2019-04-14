import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AppVersion } from '@ionic-native/app-version';
import { AuthenticationService } from './../../providers/dataServer/authentication.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { UsuarioService } from './../../providers/dataServer/usuario.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService, AuthenticationServiceLocal, UsuarioService]
})
export class LoginPage {
  versionNumber;
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
    private appVersion: AppVersion) {
      this.appVersionVerification()
  }

  public appVersionVerification() {
    this.appVersion.getVersionNumber().then(
    versao => {
      this.versionNumber = versao;
    }
    ).catch(error => {
      this.ferramenta.showAlert("Falha na Verificação!", "Não foi possivel verificar a versão atual do aplicativo, por favor atualize!");
    });
  }

  public login() {

    let loading = this.loadingCtrl.create({
      content: 'Efetuando login...'
    });
    loading.present();
  
    this.authentication_service.login(this.model).subscribe(
      resposta => {
        this.authentication_local.saveAuthentication(resposta);
        //this.ferramenta.showAlert("Bem vindo(a)!", "Login realizado com sucesso.");
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      },
      error => {
        this.ferramenta.showAlert("Falha no login!", "Verifique Usuário e Senha");
        loading.dismiss();
        console.error(JSON.stringify(error));
      }
    );
  }



}
