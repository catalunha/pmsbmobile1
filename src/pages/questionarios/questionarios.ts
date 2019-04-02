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

@IonicPage()
@Component({
  selector: 'page-questionarios',
  templateUrl: 'questionarios.html',
  providers: [QuestionarioDisponivelLocalService, QuestionarioService,
    ObservacaoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
})
export class QuestionariosPage {

  questionariosDisponiveis: QuestionariosList;
  setoresDisponiveis: SetorCensitarioList;

  setorCensitarioOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private questionarioDisponivelLocalService: QuestionarioDisponivelLocalService,
    private setorCensitarioDisponivelService: SetorCensitarioLocalService,
    private ferramentas: FerramentasProvider
  ) {
    this.getQuestionariosLocal();

    this.setorCensitarioOpts = {
      title: 'Setor Centitário',
      subTitle: 'Para poder iniciar um questionário é preciso selecionar um setor'
    };
  }

  ngOnInit() {
    const atualizarQuestionarios = questionarioDisponivel => this.questionariosDisponiveis = questionarioDisponivel;
    this.questionarioDisponivelLocalService.eventoUpdateQuestionarioDisponivel
      .subscribe(atualizarQuestionarios);

    const atualizarSetores = setoresDisponiveis => this.setoresDisponiveis = setoresDisponiveis;
    this.setorCensitarioDisponivelService.eventoUpdateSetorCensitario
      .subscribe(atualizarSetores);
  }

  getQuestionariosLocal() {
    const sucess = questionariosDisponiveis => {
      this.questionariosDisponiveis = questionariosDisponiveis;
    }
    const error = error => console.log(error);
    this.questionarioDisponivelLocalService.getQuestionariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

  getSetoresLocal() {
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
    }
    const error = error => console.log(error);
    this.setorCensitarioDisponivelService.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

  $iniciarQuestionario(questionario: Questionario) {
    // console.log(questionario.setor_censitario);
    if (questionario.setor_censitario) {
      questionario.iniciado_em = new Date().toISOString();
      questionario.atualizado_em = new Date().toISOString();
      const confirm = this.alertCtrl.create({
        title: 'Confirmar Ação',
        message: 'Você deseja iniciar uma nova resolução para este questionário?',
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
              this.questionarioDisponivelLocalService.adicionarNovoQuestionarioIniciado(questionario);
              this.navCtrl.pop();
            }
          }
        ]
      });
      confirm.present();
    }else{
      this.ferramentas.showAlert("Atenção", "Para iniciar este questionário, primeiro é necessário selecionar um SETOR CENSITÁRIO.");
    }
  }

  stpSelect() {
    console.log('STP selected');
  }
}
