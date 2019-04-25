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
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service'
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';
import { VersaoAppService } from '../../providers/dataServer/versao_app.service'

import { BackupProvider } from '../../providers/ferramentas/backup.service'

@IonicPage()
@Component({
  selector: 'page-concluido',
  templateUrl: 'concluido.html',
  providers: [AuthenticationServiceLocal, QuestionarioConcluidoLocalService,
    RespostaQuestionarioService, QuestionarioLocalService, RespostaPerguntaService,
    RespostaPossivelEscolhaService, RespostaTextoService, RespostaArquivoService,
    RespostaImagemService, RespostaLocalizacaoService, RespostaNumeroService,
    LocalizacaoService, SetorCensitarioLocalService, SetorCensitarioService]
})
export class ConcluidoPage {
  erro_final
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
  setoresDisponiveis: SetorCensitarioList;

  private validarPostagem = true
  questionario_dict = {}

  err = error => console.error(error);
  erroAndFinishLoading = error => {
    console.log(error)
    this.loading.dismiss();
    this.loadingFinalizar(error, true);
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
    private localizacaoService: LocalizacaoService,
    private setorCensitarioLocalService: SetorCensitarioLocalService,
    private versaoApp: VersaoAppService,
    private backupProvider: BackupProvider,
    private authentication_local: AuthenticationServiceLocal,
  ) {
    this.getSetoresLocal()
    this.erro_final = false
  }

  // limpar() {
  //   this.questionario_concluido_service._removeQuestionarioConcluidosAll();
  // }

  async ngOnInit() {
    await this.getQuestionariosConcluidos()
    await this.getSetoresLocal()
  }

  async ionViewDidEnter() {
    await this.getQuestionariosConcluidos();
  }

  getQuestionariosConcluidos() {
    this.questionario_concluido_service.getQuestionariosConcluidos().then(
      data => {
        if (data) {
          this.questionariosConcluidos = data
          this.atualizarIcons();
        }
      }
    ).catch(this.err);
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
            this.setorCensitarioLocalService.atualizarRefenciaQuestionarioComArea(questionario.setor_censitario.id, questionario.id)
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

  //  ######  Sincronização dos dados  #####

  async sincronizar() {
    if(!this.questionariosConcluidos){ 
      this.ferramenta.showAlert("Erro ! nenhum questionario está na lista de concluídos !","Crie novos questionarios e adicione na lista de concluídos.")
      return
    }

    await this.versaoApp.getVersaoApp({}).subscribe(
      async (resposta) => {
        await this.backupProvider.salvarBackup(this.questionariosConcluidos.questionarios, this.setoresDisponiveis.setoresCensitarios)
        await this.verificarSetoresOffline()
        await this.sincronizarQuestionarioComcluidos()
      }, error => {
        this.ferramenta.showAlert("Erro ao sincronizar ! ", "Verifique sua internet para sincronizar os dados.");
      });
  }


  async sincronizarQuestionarioComcluidos() {
    if (this.questionariosConcluidos && this.questionariosConcluidos.questionarios.length > 0) {
      await this.loadingIniciar();
      await this.verificarAtualizacoesQuestionarios();
    } else {
      this.ferramenta.presentToast("Nenhum Questionário Para Sincronizar");
    }
  }

  async verificarSetoresOffline() {
    let setores_offline = await this.setorCensitarioLocalService.getSetoresOffline()
    if (setores_offline.length > 0) {
      this.validarPostagem = true
      await this.sincronizarSetoresOffline(setores_offline).then(() => {
        this.ferramenta.presentToast(" Áreas offline sincronizadas com sucesso !")
      })
    }
  }

  sincronizarSetoresOffline(setores_offline) {
    return new Promise((resolve, reject) => {
      setores_offline.forEach((val, key, arr) => {
        this.postarSetorOfflineTratandoErros(val)
        if (Object.is(arr.length - 1, key)) { resolve(true) }
      });
    })
  }

  async postarSetorOfflineTratandoErros(setor) {
    console.log(setor.nome)
    this.setorCensitarioLocalService.postSetorSencitario(setor).then((result) => {
      this.apagarSetorOffline(setor)
    }).catch(err => this.tratarErroNomeJaExiste(err))
  }

  async tratarErroNomeJaExiste(error) {
    let error_recebido = error.error.json()
    if (error_recebido.nome == "setor censitario com este nome já existe.") {
      var _setor = error.setor
      _setor.nome = _setor.nome + '/'
      this.postarSetorOfflineTratandoErros(_setor)
    }
  }

  async apagarSetorOffline(setor) {
    await this.setorCensitarioLocalService.apagarListaOfflinePeloId(setor.id)
    await this.setorCensitarioLocalService.getSetoresCensitariosServidor()
  }
  // -----------------------------------------------------------------------//
  // PUSH


  private verificarAtualizacoesQuestionarios() {
    let user_local = this.authentication_local.getUserDataProcessado()
    this.resposta_questionario_service.pushQuestionarios(this.questionariosConcluidos, user_local).then(
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
    let user_local = this.authentication_local.getUserDataProcessado()
    this.iniciarListas();
    for (const questionario of this.questionariosConcluidos.questionarios) {
      questionario.usuario
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
      this.verificarSincronismo("Textos");

    if (this.listaVazia(this.respostaValorList))
      this.postGenerico(this.rValor, this.respostaValorList, this.perguntaValorList, "Valores");
    else
      this.verificarSincronismo("Valores");

    if (this.listaVazia(this.respostaCoordenadaList)) {
      this.postGenerico(this.rLocalizacao, this.respostaCoordenadaList, this.perguntaCoordenadaList, "Coordenadas");
    } else
      this.verificarSincronismo("Coordenadas");

    console.log(this.rPossivelEscolha)
    console.log(this.respostaPossivelEscolhaList)
    console.log(this.perguntaPossivelEscolhaList)


    if (this.listaVazia(this.respostaPossivelEscolhaList))
      this.postGenerico(this.rPossivelEscolha, this.respostaPossivelEscolhaList, this.perguntaPossivelEscolhaList, "Possíveis Escolhas");
    else
      this.verificarSincronismo("Possíveis Escolhas");

    if (this.listaVazia(this.respostaArquivoList))
      this.postGenerico(this.rArquivo, this.respostaArquivoList, this.perguntaArquivoList, "Arquivos");
    else
      this.verificarSincronismo("Arquivos");

    if (this.listaVazia(this.respostaImagemList))
      this.postGenerico(this.rImagem, this.respostaImagemList, this.perguntaImagemList, "Imagens");
    else
      this.verificarSincronismo("Imagens");
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
        this.verificarSincronismo(tipo);
      },
      erro => {
        this.verificarSincronismo(tipo);
        this.erro_final = erro
        this.ferramenta.showAlert("Falha na sincroniza\ção de " + tipo, "");
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

  private loadingFinalizar(tipo, error = false) {
    this.atualizarIcons();
    this.loading.dismiss();
    this.backupProvider.enviarBackupPorEmail()

    error ? this.ferramenta.showAlert("Sincronização Falhou", `Erro ao sincronizar : ${tipo.json()[0].non_field_errors}`)
    : this.ferramenta.showAlert("Sincronização Concluída", "Obrigado.");
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

  private verificarSincronismo(tipo) {
    this.contadorSincronismo < 5 ? this.contadorSincronismo++ : this.loadingFinalizar(tipo);
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

  verificaSetor(_setor){
    let result = false
    this.setoresDisponiveis.setoresCensitarios.forEach(setor => { if(setor.nome == _setor.nome){result=true} })
    return result
  }

}