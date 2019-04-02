// Imports Nativos
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';

// Imports Pages
import { PerguntaPage } from './../pergunta/pergunta';

// Imports Models
import { QuestionariosList, Questionario } from '../../models/questionario.model';
import { Pergunta } from '../../models/pergunta.model';

@IonicPage()
@Component({
  selector: 'page-pendencias',
  templateUrl: 'pendencias.html',
  providers: [QuestionarioIniciadoLocalService]
})
export class PendenciasPage {

  questionarioIniciadoList: QuestionariosList;
  questionarioAtual: Questionario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private questionarioIniciadoLocalService: QuestionarioIniciadoLocalService) {
    this.recuperaQuestionario();
  }

  // Recupera as perguntas do questionário em escolhido
  recuperaQuestionario() {
    this.questionarioIniciadoLocalService.getQuestionariosIniciados().then(
      questionariosIniciados => {
        this.questionarioIniciadoList = questionariosIniciados;
        this.questionarioAtual = this.questionarioIniciadoList.questionarios[this.navParams.get("questionarioPosicao")];
        this.isDisponivel();
      }
    ).catch(error => console.log(error));
  }

  isDisponivel(){
    this.questionarioAtual.perguntas.forEach(pergunta => {
      // console.log(pergunta.texto);
      pergunta.pergunta_liberada = this.questionarioIniciadoLocalService.isPerguntaDisponivel(pergunta, this.questionarioIniciadoList);
    });
  }
  
  selecionarPergunta(pergunta: Pergunta) {
    this.navCtrl.setRoot(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao"), "perguntaPosicao": this.questionarioAtual.perguntas.indexOf(pergunta) })
  }

  continuar() {
    this.navCtrl.setRoot(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao") })
  }

}
