import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AppVersion } from '@ionic-native/app-version';
import { AuthenticationService } from './../../providers/dataServer/authentication.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { UsuarioService } from './../../providers/dataServer/usuario.service';
import * as JwtDecode from "jwt-decode";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationService, AuthenticationServiceLocal, UsuarioService]
})
export class LoginPage {
  versionNumber;
  blockApp: boolean = false;
  public model: any = {
    username: "",
    password: ""
  };

  //helper = new JwtHelperService();

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

  public async login() {

    let loading = await this.loadingCtrl.create({
      content: 'Efetuando login...'
    });
    await loading.present();
    await this.authentication_service.login(this.model).subscribe(
      resposta => {
        this.salvarInformacoesUsuario(resposta)
      },
      error => {
        if(error.status == 0){
          this.logarUsuarioModoOffline()
        }else{
          this.ferramenta.showAlert("Falha no login !", "Verifique Usuário e Senha");
        }        
        console.error(error.status);
      }
    );
    await loading.dismiss();
  }

  logarUsuarioModoOffline(){
    this.authentication_local.loginOffline(this.model).then((resposta:any)=>{
      this.authentication_local.saveUserInfo(resposta.usuario)
      this.navCtrl.setRoot(TabsPage);
    }).catch(erro=>{
      this.ferramenta.showAlert(erro['0'],erro['1'])
      console.log(erro)
    })
  }

  salvarInformacoesUsuario(resposta_tk) {
    this.authentication_service.postUsuarioInformacoes(this.model).subscribe(
      (resposta) => {
        this.authentication_local.saveAuthentication(resposta_tk);
        this.salvarDadosDoUsuario(this.parseJwt(resposta.token))
      }, (erro) => {
        this.ferramenta.showAlert("Falha no login !", "Verifique Usuário e Senha");
      })
  }

  salvarDadosDoUsuario(user) {
    this.authentication_service.atualizarHeaders()
    this.authentication_service.getByUrl("/api/contas/users/" + user.user_id).subscribe(resposta => {
      this.testaGrupoDoUsuario(resposta)
    }, erro => {
      this.ferramenta.showAlert("Falha no login !", "Verifique Usuário e Senha");
    })
  }

  async testaGrupoDoUsuario(usuario) {
    if (this.verificarSeUsuarioPertenceGrupo(usuario, 10)) {
      this.authentication_local.saveUserInfo(usuario)
      this.authentication_local.saveUserReference(this.model, usuario)
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.ferramenta.showAlert("Acesso não autorizado no momento.", "")
    }
  }

  public parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };


  public verificarSeUsuarioPertenceGrupo(user, group_id) {
    if (user['groups'].length <= 0) { return false }
    var resultado = false
    user['groups'].forEach(element => {
      if (element == group_id) { resultado = true }
    })
    return resultado
  }

}
