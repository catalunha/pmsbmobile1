import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { QuestionarioDisponivelLocalService } from './../../providers/dataLocal/questionario_disponivel.service';
import { ObservacaoLocalService } from './../../providers/dataLocal/observacao.service';

import { AlertController } from 'ionic-angular';
import { QuestionarioService } from '../../providers/dataServer/questionario.service';
import { SetorCensitarioList } from '../../models/setor_censitario.model';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';

import { QuestionarioConcluidoLocalService } from '../../providers/dataLocal/questionario_concluido.service'
import { QuestionarioIniciadoLocalService } from '../../providers/dataLocal/questionario_iniciado.service'

import { ModalController } from 'ionic-angular';
import { SelecionarAreaPage } from '../selecionar-area/selecionar-area'
import { resolve } from 'url';

import { GruposProvider } from '../../providers/dataServer/grupos.service'

@IonicPage()
@Component({
  selector: 'page-questionarios',
  templateUrl: 'questionarios.html',
  providers: [GruposProvider, QuestionarioDisponivelLocalService, QuestionarioService,
    ObservacaoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
})
export class QuestionariosPage {

  grupo_select
  questionariosDisponiveis: QuestionariosList;
  setoresDisponiveis: SetorCensitarioList;
  grupos
  setorCensitarioOpts: { title: string, subTitle: string };
  marcador_carregando_dados

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private questionarioDisponivelLocalService: QuestionarioDisponivelLocalService,
    private setorCensitarioDisponivelService: SetorCensitarioLocalService,
    private ferramentas: FerramentasProvider,
    public grupoProvider: GruposProvider
  ) {
    this.setorCensitarioOpts = {
      title: 'Setor Centitário',
      subTitle: 'Para poder iniciar um questionário é preciso selecionar um setor'
    };
  }

  async ionViewWillEnter() {
    this.grupo_select = false
    this.marcador_carregando_dados = true
    await this.grupoProvider.getListaGrupoServidor().then((result) => { this.grupos = result })
    await this.questionarioDisponivelLocalService.getQuestionariosServidor().then((d) => {
      this.getQuestionariosLocal();
    }).catch(() => {
      this.getQuestionariosLocal();
      this.ferramentas.presentToast("Você está offline lendo questionarios armazenados.")
      this.marcador_carregando_dados = false
    })
  }

  async ionViewDidEnter() {
    await this.getSetoresLocal()
  }

  async getQuestionariosLocal() {
    console.log('getQuestionariosLocal')
    const sucess = questionariosDisponiveis => {
      console.log(questionariosDisponiveis)
      this.questionariosDisponiveis = questionariosDisponiveis;
      this.marcador_carregando_dados = false
    }
    const error = error => console.log(error);
    await this.questionarioDisponivelLocalService.getQuestionariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

  async getSetoresLocal() {

    const sucess = async setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      await this.setorCensitarioDisponivelService.getSetoresOffline().forEach((setor) => { this.setoresDisponiveis.setoresCensitarios.push(setor) })
    }
    const error = error => console.log(error);
    await this.setorCensitarioDisponivelService.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }


  async $escolherSetor(questionario) {
    let profileModal = this.modalCtrl.create(SelecionarAreaPage, { nenhumVisible: false });
    profileModal.present();
    profileModal.onDidDismiss(async data => {
      if (!data.cancelado) {
        if (data.area && this.setorCensitarioDisponivelService.verificaQuestionarioNaoExisteNaArea(data.area.id, questionario.id)) {
          questionario['setor_censitario'] = data.area
          this.$iniciarQuestionario(questionario)
        } else {
          this.ferramentas.showAlert(`Erro ao criar um novo questionario !`, `O questionario ${questionario.nome} já existe na área ${this.setorCensitarioDisponivelService.getSetorNome(data.area, this.setoresDisponiveis)} `)
        }
      }
    });
  }

  $iniciarQuestionario(questionario: Questionario) {
    if (questionario.setor_censitario) {
      questionario.iniciado_em = new Date().toISOString();
      questionario.atualizado_em = new Date().toISOString();
      const confirm = this.alertCtrl.create({
        title: 'Confirmar Ação',
        message: `Você deseja iniciar uma nova resolução para este questionário na área ${this.setorCensitarioDisponivelService.getSetorNome(questionario.setor_censitario, this.setoresDisponiveis)}`,
        buttons: [
          {
            text: 'Não',
            handler: () => {
              console.log('Ação Cancelada');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.setorCensitarioDisponivelService.salvarRefenciaQuestionarioComArea(questionario.setor_censitario, questionario)
              this.questionarioDisponivelLocalService.adicionarNovoQuestionarioIniciado(questionario);
              //this.navCtrl.pop();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.ferramentas.showAlert("Atenção", "Para iniciar este questionário, primeiro é necessário selecionar um SETOR CENSITÁRIO.");
    }
  }

  // -------- Funcoes de controle da exibicao dos questionarios por grupo --------

  selecionarGrupo(grupo) {
    console.log(grupo)
    this.grupo_select = grupo
  }

  voltarAListaGrupos() {
    this.grupo_select = false
  }

  verificaQuestionarioPertenceGrupo(quest) {
    if (quest.grupo) {
      if (quest.grupo.id == this.grupo_select.id) { return true
      } else { return false }
    }
    return false
  }
}
