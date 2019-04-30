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

import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';

@IonicPage()
@Component({
  selector: 'page-pendencias',
  templateUrl: 'pendencias.html',
  providers: [QuestionarioIniciadoLocalService, SetorCensitarioLocalService,SetorCensitarioService]
})
export class PendenciasPage {

  questionarioIniciadoList: QuestionariosList;
  questionarioAtual: Questionario;
  setoresDisponiveis: SetorCensitarioList;
  setoresOffline: SetorCensitarioList;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private questionarioIniciadoLocalService: QuestionarioIniciadoLocalService,
    public setorCensitario: SetorCensitarioLocalService) {
    this.ionVieWillEnter()
    this.recuperaQuestionario();
  }

  // Recupera as perguntas do questionário em escolhido
  recuperaQuestionario() {
    this.questionarioIniciadoLocalService.getQuestionariosIniciados().then(
      questionariosIniciados => {
        this.questionarioIniciadoList = questionariosIniciados;
        this.questionarioAtual = this.questionarioIniciadoList.questionarios[this.navParams.get("questionarioPosicao")];
        //console.log({questionario_atual:this.questionarioAtual})
        this.isDisponivel();
      }
    ).catch(error => console.log(error));
  }

  ionVieWillEnter() {
    this.setoresDisponiveis = null
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      this.setorCensitario.getSetoresOffline().forEach((setor) => { this.setoresDisponiveis.setoresCensitarios.push(setor) })
    }
    const error = error => console.log(error);
    this.setorCensitario.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

  isDisponivel() {
    console.log(this.questionarioAtual.setor_censitario.nome);
    this.questionarioAtual.perguntas.forEach(pergunta => {
      // console.log(pergunta.texto);
      pergunta.pergunta_liberada = this.questionarioIniciadoLocalService.isPerguntaDisponivel(pergunta, this.questionarioIniciadoList);
    });
  }

  selecionarPergunta(pergunta: Pergunta) {
    this.navCtrl.push(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao"), "perguntaPosicao": this.questionarioAtual.perguntas.indexOf(pergunta) })
  }

  continuar() {
    this.navCtrl.push(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao") })
  }

  nomeArea() {
    return this.getSetorNome(this.questionarioAtual.setor_censitario)
  }

  getSetorSuperior(setor_superior) {
    return this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
  }

  getSetorNome(setor) {
    if (setor.setor_superior) {
      return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome
    }
    return setor.nome
  }

  getIndex(quest){
    return 1 + this.questionarioAtual.perguntas.indexOf(quest)
  }

}
