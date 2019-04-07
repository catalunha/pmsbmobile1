// Imports Nativos
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from '../../providers/dataLocal/questionario_iniciado.service';

// Imports Models
import { QuestionariosList, Questionario } from '../../models/questionario.model';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-visualizar',
  templateUrl: 'visualizar.html',
  providers: [QuestionarioIniciadoLocalService]
})
export class VisualizarPage {

  questionarioIniciadoList: QuestionariosList;
  questionarioAtual: Questionario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private questionario_local: QuestionarioIniciadoLocalService,
    private socialSharing: SocialSharing) {
    this.recuperaQuestionario();
  }

  recuperaQuestionario() {
    this.questionario_local.getQuestionariosIniciados().then(
      questionariosIniciados => {
        this.questionarioIniciadoList = questionariosIniciados;
        this.questionarioAtual = this.questionarioIniciadoList.questionarios[this.navParams.get("questionarioPosicao")];
      }
    ).catch(
      error => {
        console.log("Erro ao recuperar questionário. Page: Visualizar");
        console.log(error);
      }
    );
  }

  onShare() {
    console.log(JSON.stringify(this.questionarioAtual));
    const message = JSON.stringify(this.questionarioAtual);
    const subject = `Questionário: ${this.questionarioAtual.nome}`
    this.socialSharing.share(message, subject).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }
}
