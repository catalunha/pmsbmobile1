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

import { ModalController } from 'ionic-angular';
import { SelecionarAreaPage} from '../selecionar-area/selecionar-area'

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
    public modalCtrl: ModalController,
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

  ionViewWillEnter(){
    //this.getSetoresLocal()
    this.getQuestionariosLocal();
  }

  async ionViewDidEnter() {
    //await this.getQuestionariosLocal();
    await this.getSetoresLocal() 
  }

  async getQuestionariosLocal() {
    const sucess = questionariosDisponiveis => {
      this.questionariosDisponiveis = questionariosDisponiveis;
    }
    const error = error => console.log(error);
    await this.questionarioDisponivelLocalService.getQuestionariosDisponiveis()
      .then(sucess)
      .catch(error);
    //await console.log(this.questionariosDisponiveis.questionarios)
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

    let profileModal = this.modalCtrl.create(SelecionarAreaPage,{nenhumVisible:false});
    profileModal.present();
    profileModal.onDidDismiss(async data => {
      if(!data.cancelado){
        console.log(data.area)
        if(data.area){
          questionario['setor_censitario'] = data.area
          this.$iniciarQuestionario(questionario)
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
              this.questionarioDisponivelLocalService.adicionarNovoQuestionarioIniciado(questionario);
              this.navCtrl.pop();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.ferramentas.showAlert("Atenção", "Para iniciar este questionário, primeiro é necessário selecionar um SETOR CENSITÁRIO.");
    }
  }

  stpSelect() {
    console.log('STP selected');
  }
}
