// Imports Nativos
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';

// Imports Pages
import { PendenciasPage } from './../pendencias/pendencias';
import { QuestionariosPage } from './../questionarios/questionarios';
import { PerguntaPage } from '../pergunta/pergunta';
import { VisualizarPage } from '../visualizar/visualizar';

// Imports Models
import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';

// Outros Imports
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service'
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { SetorCensitarioList } from '../../models/setor_censitario.model'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QuestionarioIniciadoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
})

export class HomePage {

  questionariosIniciados: QuestionariosList;
  setoresDisponiveis: SetorCensitarioList;

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private questionarioIniciadoLocalService: QuestionarioIniciadoLocalService,
    public actionSheetCtrl: ActionSheetController,
    public ferramentas: FerramentasProvider,
    private setorCensitarioLocalService: SetorCensitarioLocalService) {
  }

  async getSetoresLocal() {
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      this.setorCensitarioLocalService.getSetoresOffline().forEach((setor)=>{this.setoresDisponiveis.setoresCensitarios.push(setor)})
    }
    const error = error => console.log(error);
    await this.setorCensitarioLocalService.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

  // Função para apagar todos os questionários iniciados, não está disponível para o usuário
  _limpar() {
    this.questionarioIniciadoLocalService._removeQuestionarioIniciadosAll();
  }

  ionViewWillEnter(){
    this.getSetoresLocal()
  }

  // Verifica os questionários iniciados sempre que a tela é chamada
  async ionViewDidEnter() {
    await this.getSetoresLocal()
    await this.getQuestionariosIniciados();
  }

  getQuestionariosIniciados() {
    const atribuicao = questionariosIniciadosLocalmente => this.questionariosIniciados = questionariosIniciadosLocalmente;
    this.questionarioIniciadoLocalService.getQuestionariosIniciados()
      .then(atribuicao)
      .catch(error => console.error(error));
  }

  // Barra de opções de ações para o usuário
  $opcoesQuestionario(questionario: Questionario) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções de Questionário',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            let area =  this.getNomeArea(questionario.setor_censitario)
            this.navCtrl.push(PerguntaPage, { "questionarioPosicao": this.questionariosIniciados.questionarios.indexOf(questionario),"area":area})
          }
        }, {
          text: 'Verificar Pendências',
          handler: () => {
            this.navCtrl.push(PendenciasPage, { "questionarioPosicao": this.questionariosIniciados.questionarios.indexOf(questionario) })
          }
        }, {
          text: 'Visualizar Respostas',
          handler: () => {
            this.navCtrl.push(VisualizarPage, { "questionarioPosicao": this.questionariosIniciados.questionarios.indexOf(questionario) })
          }
        }, {
          text: 'Concluir',
          handler: () => {
            this.concluirQuestionario(questionario);
          }
        }, {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.removerQuestionario(questionario);
          }
        }, {
          text: 'Cancelar Ação',
          role: 'cancel',
          handler: () => {
            console.log('Nenhuma Ação Escolhida');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Concluir um Questionário Iniciado
  concluirQuestionario(questionario: Questionario) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar: Concluir',
      message: 'Tem certeza que deseja CONCLUIR este questionário?',
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
            this.questionarioIniciadoLocalService.concluirQuestionarioIniciado(questionario, this.questionariosIniciados);
          }
        }
      ]
    });
    confirm.present();
  }

  // Apagar um Questionário Iniciado
  removerQuestionario(questionario: Questionario) {
    const prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Depois que um questionário é removido ele não poderá mais ser editado. Digite REMOVER para executar esta ação.",
      inputs: [
        {
          name: 'texto',
          placeholder: 'REMOVER'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.ferramentas.presentToast("Ação Cancelada");
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            if (data.texto === "REMOVER") {
              this.questionarioIniciadoLocalService.removeQuestionarioIniciado(questionario, this.questionariosIniciados);
            } else {
              this.ferramentas.presentToast("Ação Cancelada");
            }
          }
        }
      ]
    });
    prompt.present();
  }

  $novaResolucaoQuestionario() {
    this.navCtrl.push(QuestionariosPage);
  }

  getSetorSuperior(setor_superior) {
    return this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
  }

  getNomeArea(setor) {
    if (setor.setor_superior) {
      return this.getNomeArea(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome
    }
    return setor.nome
  }

}