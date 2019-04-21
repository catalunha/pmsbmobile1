import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { ObservacaoLocalService } from '../../providers/dataLocal/observacao.service';
import { ObservacaoList } from '../../models/observacao.model';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';

import { LoginPage } from './../login/login';

@Component({
  selector: 'page-observacao',
  templateUrl: 'observacoes.html',
  providers: [ObservacaoLocalService, AuthenticationServiceLocal]
})
export class ObservacaoPage {

  listaObservacao: ObservacaoList;
  
  constructor(public navCtrl: NavController,
    private authentication_local: AuthenticationServiceLocal,
    private app: App,
    private observacaoService: ObservacaoLocalService) {
  }

  ionViewDidEnter() {
    this.observacaoService.getListObservacoes().then(
      listaObservacao => {
        if (listaObservacao) {
          this.listaObservacao = listaObservacao;
        }
      }
    ).catch();
  }


  limpar() {
    this.observacaoService.removeObservacoesAll();
    this.listaObservacao = null;
  }

  // Sair do sistema
  logout() {
    this.authentication_local.clearAuthentication();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
