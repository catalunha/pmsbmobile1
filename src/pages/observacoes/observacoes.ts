import { Component } from '@angular/core';
import { NavController, App,LoadingController } from 'ionic-angular';

import { ObservacaoLocalService } from '../../providers/dataLocal/observacao.service';
import { ObservacaoList } from '../../models/observacao.model';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';

import { LoginPage } from './../login/login';
import { BackupProvider } from '../../providers/ferramentas/backup.service'

import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { QuestionarioConcluidoLocalService } from './../../providers/dataLocal/questionario_concluido.service';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service'

@Component({
  selector: 'page-observacao',
  templateUrl: 'observacoes.html',
  providers: [ObservacaoLocalService, AuthenticationServiceLocal,SetorCensitarioService, SetorCensitarioLocalService,QuestionarioConcluidoLocalService]
})
export class ObservacaoPage {

  listaObservacao: ObservacaoList;
  user
  username
  questionariosConcluidos
  setoresDisponiveis

  constructor(public navCtrl: NavController,
    private authentication_local: AuthenticationServiceLocal,
    private app: App,
    private observacaoService: ObservacaoLocalService,
    private backupProvider: BackupProvider,
    private questionario_concluido_service: QuestionarioConcluidoLocalService,
    private setorCensitarioLocalService:SetorCensitarioLocalService,
    private loading:LoadingController) {
  }

  ionViewDidEnter() {
    this.user = JSON.parse(this.authentication_local.getUserData())
    this.username = this.user.last_name
    this.observacaoService.getListObservacoes().then(
      listaObservacao => {
        if (listaObservacao) { this.listaObservacao = listaObservacao;}
      }
    ).catch();
  }

  getQuestionariosConcluidos() {
    return new Promise((resolve,reject)=>{
      this.questionario_concluido_service.getQuestionariosConcluidos().then(
        data => {
          if (data) {
            this.questionariosConcluidos = data
            resolve(data)
          }
        }
      ).catch(console.log('err'));
    })
  }

  async getSetoresLocal() {
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      this.setorCensitarioLocalService.getSetoresOffline().forEach((setor) => { this.setoresDisponiveis.setoresCensitarios.push(setor) })
    }
    const error = error => console.log(error);
    await this.setorCensitarioLocalService.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
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

  async gerarBackup(){
    let load = this.loading.create({
      content: 'Salvando dados...'
    });
    load.present(); 
    await this.getSetoresLocal()
    await this.getQuestionariosConcluidos().then(async(data)=>{
      await this.backupProvider.salvarBackup(data,this.setoresDisponiveis)
    })
    await load.dismiss()
    await this.backupProvider.enviarBackupPorEmail()
  }

}
