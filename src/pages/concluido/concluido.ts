import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { QuestionarioConcluidoLocalService } from './../../providers/dataLocal/questionario_concluido.service';
import { QuestionariosList, Questionario } from '../../models/questionario.model';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';
import { RespostaQuestionarioService } from './../../providers/dataServer/resposta_questionario.service';
import { RespostaPerguntaService } from './../../providers/dataServer/resposta_pergunta.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { QuestionarioLocalService } from './../../providers/dataLocal/questionario.service';
import { TipoTextoResposta, TipoPossivelEscolhaResposta, TipoArquivoResposta, TipoImagemResposta, TipoLocalizacaoResposta, TipoNumeroResposta, Coordenada } from '../../models/resposta_pergunta.model';
import { RespostaPossivelEscolhaService } from '../../providers/dataServer/tipo_respostas/possivel_escolhas_respostas.service';
import { RespostaTextoService } from '../../providers/dataServer/tipo_respostas/texto_respostas.service';
import { RespostaArquivoService } from '../../providers/dataServer/tipo_respostas/arquivo_respostas.service';
import { RespostaImagemService } from '../../providers/dataServer/tipo_respostas/imagem_respostas.service';
import { RespostaLocalizacaoService } from '../../providers/dataServer/tipo_respostas/coordenada_respostas.service';
import { RespostaNumeroService } from '../../providers/dataServer/tipo_respostas/numero_respostas.service';
import { Pergunta } from '../../models/pergunta.model';
import { LocalizacaoService } from '../../providers/dataServer/recursos/localizacao.service';

@IonicPage()
@Component({
  selector: 'page-concluido',
  templateUrl: 'concluido.html',
  providers: [AuthenticationServiceLocal, QuestionarioConcluidoLocalService,
    RespostaQuestionarioService, QuestionarioLocalService, RespostaPerguntaService,
    RespostaPossivelEscolhaService, RespostaTextoService, RespostaArquivoService,
    RespostaImagemService, RespostaLocalizacaoService, RespostaNumeroService,
    LocalizacaoService]
})
export class ConcluidoPage {

  questionariosConcluidos: QuestionariosList;

  respostaPossivelEscolhaList: TipoPossivelEscolhaResposta[];
  respostaTextoList: TipoTextoResposta[];
  respostaArquivoList: TipoArquivoResposta[];
  respostaImagemList: TipoImagemResposta[];
  respostaCoordenadaList: TipoLocalizacaoResposta[];
  respostaValorList: TipoNumeroResposta[];

  perguntaPossivelEscolhaList: Pergunta[];
  perguntaTextoList: Pergunta[];
  perguntaArquivoList: Pergunta[];
  perguntaImagemList: Pergunta[];
  perguntaCoordenadaList: Pergunta[];
  perguntaValorList: Pergunta[];

  contadorSincronismo: number;
  loading;

  err = error => console.error(error);
  erroAndFinishLoading = error => {
    console.error(error);
    this.loadingFinalizar(true);
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private questionario_concluido_service: QuestionarioConcluidoLocalService,
    private resposta_questionario_service: RespostaQuestionarioService,
    public actionSheetCtrl: ActionSheetController,
    private ferramenta: FerramentasProvider,
    private questionario_local_service: QuestionarioLocalService,
    private resposta_pergunta_service: RespostaPerguntaService,
    private rPossivelEscolha: RespostaPossivelEscolhaService,
    private rTexto: RespostaTextoService,
    private rArquivo: RespostaArquivoService,
    private rImagem: RespostaImagemService,
    private rLocalizacao: RespostaLocalizacaoService,
    private rValor: RespostaNumeroService,
    private localizacaoService: LocalizacaoService) {
  }

  // limpar() {
  //   this.questionario_concluido_service._removeQuestionarioConcluidosAll();
  // }

  ionViewDidEnter() {
    this.getQuestionariosConcluidos();
  }

  getQuestionariosConcluidos() {
    this.questionario_concluido_service.getQuestionariosConcluidos().then(
      data => {
        if (data) {
          this.questionariosConcluidos = data;
          this.atualizarIcons();
        }
      }
    ).catch(this.err);
  }

  atualizarIcons() {
    for (const questionarioConcluido of this.questionariosConcluidos.questionarios) {
      questionarioConcluido.questionario_sincronizado = true;
      if (questionarioConcluido.resposta_questionario) {
        for (const pergunta of questionarioConcluido.perguntas) {
          if (pergunta.resposta && (!pergunta.resposta_pergunta ||
            !pergunta.resposta_pergunta.tipo_respostaSincronizada)) {
            questionarioConcluido.questionario_sincronizado = false;
            break;
          }
        }
      } else questionarioConcluido.questionario_sincronizado = false;
    }
  }

  opcoesQuestionario(questionario: Questionario) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções de Questionário',
      buttons: [
        {
          text: 'Retornar para Iniciados',
          handler: () => {
            this.editarQuestionarioConcluido(questionario);
          }
        },
        // {
        //   text: 'Remover',
        //   role: 'destructive',
        //   handler: () => {
        //     console.log('Removendo Questionário');
        //     this.removerQuestionario(questionario);
        //   }
        // },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  editarQuestionarioConcluido(questionario: Questionario) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar: Iniciar',
      message: 'Tem certeza que deseja INICIAR este questionário novamente?',
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
            this.questionario_concluido_service.editarQuestionarioConcluido(questionario, this.questionariosConcluidos);
          }
        }
      ]
    });
    confirm.present();
  }

  removerQuestionario(questionario: Questionario) {
    this.questionario_concluido_service.removeQuestionarioConcluido(questionario, this.questionariosConcluidos);
  }

  sincronizar() {
    // console.log(this.questionariosConcluidos);
    if (this.questionariosConcluidos && this.questionariosConcluidos.questionarios.length > 0) {
      this.loadingIniciar();
      this.verificarAtualizacoesQuestionarios();
    } else {
      this.ferramenta.presentToast("Nenhuma Questionário Para Sincronizar");
    }
  }

  // -----------------------------------------------------------------------//
  // PUSH

  private verificarAtualizacoesQuestionarios() {
    this.resposta_questionario_service.pushQuestionarios(this.questionariosConcluidos).then(
      respostaQuestionarioList => {
        if (this.listaVazia(respostaQuestionarioList)) this.salvarDataLocal();
        this.verificarAtualizacoesPerguntas();
      }
    ).catch(this.erroAndFinishLoading);
  }

  private verificarAtualizacoesPerguntas() {
    this.resposta_pergunta_service.pushPerguntas(this.questionariosConcluidos).then(
      respostaPerguntaList => {
        if (this.listaVazia(respostaPerguntaList)) this.salvarDataLocal();
        this.verificarRespostas();
      }
    ).catch(this.erroAndFinishLoading);
  }

  private async verificarRespostas() {
    this.iniciarListas();
    for (const questionario of this.questionariosConcluidos.questionarios) {
      // Popular Listas com as Respostas
      for (const pergunta of questionario.perguntas) {
        // Se a resposta_pergunta foi sincronizada mas a tipo_resposta não
        if (pergunta.resposta_pergunta && !pergunta.resposta_pergunta.tipo_respostaSincronizada) {
          switch (pergunta.tipo) {
            case 0:
              this.arrayRespostaPossiveisEscolhas(this.criarListaPossiveisEscolhas(pergunta),
                this.respostaPossivelEscolhaList, pergunta, this.perguntaPossivelEscolhaList);
              break;
            case 1:
              this.arrayRespostaGenerico(new TipoTextoResposta(pergunta),
                this.respostaTextoList, pergunta, this.perguntaTextoList);
              break;
            case 2:
              this.arrayRespostaGenerico(new TipoArquivoResposta(pergunta),
                this.respostaArquivoList, pergunta, this.perguntaArquivoList);
              break;
            case 3:
              this.arrayRespostaGenerico(new TipoImagemResposta(pergunta),
                this.respostaImagemList, pergunta, this.perguntaImagemList);
              break;
            case 4:
              let novaLocalizacao = await this.criarLocalizacao(pergunta);
              if (novaLocalizacao) {
                this.arrayRespostaGenerico(new TipoLocalizacaoResposta(pergunta, novaLocalizacao.id),
                  this.respostaCoordenadaList, pergunta, this.perguntaCoordenadaList);
              } else {
                this.ferramenta.presentToast("Não foi possível criar uma nova localização.");
              }
              break;
            case 5:
              this.arrayRespostaGenerico(new TipoNumeroResposta(pergunta),
                this.respostaValorList, pergunta, this.perguntaValorList);
              break;
          }
        }
      }
    }
    this.sincronizarRespostas();
  }

  private sincronizarRespostas() {
    this.contadorSincronismo = 0;

    if (this.listaVazia(this.respostaTextoList))
      this.postGenerico(this.rTexto, this.respostaTextoList, this.perguntaTextoList, "Textos");
    else
      this.verificarSincronismo();

    if (this.listaVazia(this.respostaValorList))
      this.postGenerico(this.rValor, this.respostaValorList, this.perguntaValorList, "Valores");
    else
      this.verificarSincronismo();

    if (this.listaVazia(this.respostaCoordenadaList)) {
      this.postGenerico(this.rLocalizacao, this.respostaCoordenadaList, this.perguntaCoordenadaList, "Coordenadas");
    } else
      this.verificarSincronismo();

    if (this.listaVazia(this.respostaPossivelEscolhaList))
      this.postGenerico(this.rPossivelEscolha, this.respostaPossivelEscolhaList, this.perguntaPossivelEscolhaList, "Possíveis Escolhas");
    else
      this.verificarSincronismo();

    if (this.listaVazia(this.respostaArquivoList))
      this.postGenerico(this.rArquivo, this.respostaArquivoList, this.perguntaArquivoList, "Arquivos");
    else
      this.verificarSincronismo();

    if (this.listaVazia(this.respostaImagemList))
      this.postGenerico(this.rImagem, this.respostaImagemList, this.perguntaImagemList, "Imagens");
    else
      this.verificarSincronismo();
  }

  private criarLocalizacao(pergunta): any {
    return new Promise((resolve, reject) => {
      const novaCoordenada = new Coordenada();
      novaCoordenada.altitude = "000";
      novaCoordenada.latitude = String(pergunta.resposta.latitudeResposta).substring(0, 7);
      novaCoordenada.longitude = String(pergunta.resposta.longitudeResposta).substring(0, 7);
      console.log(novaCoordenada);
      this.localizacaoService.addLocalizacao(novaCoordenada).subscribe(
        novaLocalizacao => resolve(novaLocalizacao),
        error => reject(null)
      );
    });
  }

  private postGenerico(tipoResposta, respostaList, perguntaList, tipo: string) {
    tipoResposta.addRespostaAll(respostaList).subscribe(
      respostaListSincronizada => {
        this.salvarRespostaGenerico(respostaListSincronizada, perguntaList);
        this.verificarSincronismo();
      },
      erro => {
        this.verificarSincronismo();
        this.ferramenta.showAlert("Falha na sincronização de " + tipo, "Houve um erro inesperado nesta sincronização.");
        console.log(erro);
      }
    );
  }

  private salvarRespostaGenerico(respostaListSincronizada, perguntaList) {
    var aux = 0;
    for (const pergunta of perguntaList) {
      pergunta.resposta_pergunta.tipo_respostaSincronizada = respostaListSincronizada[aux];
      aux++;
    }
    this.salvarDataLocal();
  }

  private arrayRespostaGenerico(respostaAux, respostaList, pergunta, perguntaList) {
    respostaList.push(respostaAux);
    perguntaList.push(pergunta);
  }

  private arrayRespostaPossiveisEscolhas(respostaAux, respostaList, pergunta, perguntaList) {
    for (const possivel_escolha of respostaAux) {
      respostaList.push(possivel_escolha);
    }
    perguntaList.push(pergunta);
  }

  private criarListaPossiveisEscolhas(pergunta): TipoPossivelEscolhaResposta[] {
    var lista: TipoPossivelEscolhaResposta[] = new Array();
    // Verificar o tipo da pergunta
    if (pergunta.multipla) {
      for (const possivel_escolha of pergunta.resposta.possiveis_escolhas_id) {
        lista.push(new TipoPossivelEscolhaResposta(pergunta, possivel_escolha.id));
      }
    } else {
      lista.push(new TipoPossivelEscolhaResposta(pergunta,
        pergunta.resposta.possivel_escolha_id.id));
    }
    return lista;
  }

  //-------------------------------------------------------------------------------------//
  // Auxiliares

  private loadingIniciar() {
    this.loading = this.loadingCtrl.create({
      content: 'Sincronizando Dados...'
    });
    this.loading.present();
  }

  private loadingFinalizar(error = false) {
    this.atualizarIcons();
    this.loading.dismiss();
    error ? this.ferramenta.showAlert("Sincronização Falhou", "") :
      this.ferramenta.showAlert("Sincronização Concluída", "Obrigado.");
  }

  private listaVazia(array: any): boolean {
    return array.length > 0;
  }

  private salvarDataLocal() {
    this.questionario_local_service.atualizarQuestionariosList(this.questionariosConcluidos);
  }

  //-------------------------------------------------------------------------------------//

  private iniciarListas() {
    this.respostaPossivelEscolhaList = new Array();
    this.respostaTextoList = new Array();
    this.respostaArquivoList = new Array();
    this.respostaImagemList = new Array();
    this.respostaCoordenadaList = new Array();
    this.respostaValorList = new Array();

    this.perguntaPossivelEscolhaList = new Array;
    this.perguntaTextoList = new Array();
    this.perguntaArquivoList = new Array();
    this.perguntaImagemList = new Array();
    this.perguntaCoordenadaList = new Array();
    this.perguntaValorList = new Array();
  }

  private verificarSincronismo() {
    this.contadorSincronismo < 5 ? this.contadorSincronismo++ : this.loadingFinalizar();
  }
}
