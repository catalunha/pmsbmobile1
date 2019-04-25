// Imports Nativos
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Imports Services e Providers
import { CameraService } from './../../providers/ferramentas/camera.service';
import { LocalizacaoService } from './../../providers/ferramentas/localizacao.service';
import { SeletorArquivoService } from './../../providers/ferramentas/seletor_arquivo.service';
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';
import { FerramentasProvider } from './../../providers/ferramentas/ferramentas';
import { Base64 } from '@ionic-native/base64';

// Imports Pages
import { TabsPage } from './../tabs/tabs';

// Imports Models
import { Pergunta } from '../../models/pergunta.model';
import { QuestionariosList, Questionario } from '../../models/questionario.model';
import { EscolhaUnica, MultiplaEscolha, TextoResposta, Arquivo, Numero, Resposta, Localizacao } from '../../models/resposta.model';

@IonicPage()
@Component({
  selector: 'page-pergunta',
  templateUrl: 'pergunta.html',
  providers: [QuestionarioIniciadoLocalService, SeletorArquivoService]
})
export class PerguntaPage {
  filePath
  multiplaEscolhaResposta: boolean = false;
  escolhaUnicaResposta: boolean = false;
  entradaTextoResposta: boolean = false;
  selecionarArquivoResposta: boolean = false;
  selecionarImagemResposta: boolean = false;
  numeroResposta: boolean = false;
  coordenadaResposta: boolean = false;

  questionarioIniciadoList: QuestionariosList;
  questionarioAtual: Questionario;
  perguntaAtual: Pergunta;

  escolhaUnica: any = { possivel_escolha_id: "", latitude: "", longitude: "" };
  textoResposta: TextoResposta = { texto: "", latitude: "", longitude: "" };
  numero: Numero = { numero: null, latitude: "", longitude: "" };
  coordenadas: Resposta = { latitude: '', longitude: '' };
  area
  error = error => { console.log(error); }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private selectImage: CameraService,
    private gps: LocalizacaoService,
    private questionarioIniciadoLocalService: QuestionarioIniciadoLocalService,
    private seletorArquivos: SeletorArquivoService,
    private ferramenta: FerramentasProvider,
    private base64: Base64) {
    this.recuperaQuestionario();
    this.area = this.navParams.get("area")
  }

  ionViewDidEnter() {
    this.gps.startGPS(this.coordenadas);
  }

  ionViewWillLeave() {
    this.gps.stopGPS();
  }

  recuperaQuestionario() {
    this.questionarioIniciadoLocalService.getQuestionariosIniciados().then(
      questionariosIniciados => {
        this.questionarioIniciadoList = questionariosIniciados;
        this.questionarioAtual = this.questionarioIniciadoList.questionarios[this.navParams.get("questionarioPosicao")];
        console.log({questionarioAtual:this.questionarioAtual})
        var perguntaPosicao = this.navParams.get("perguntaPosicao");
        if (perguntaPosicao != null) {
          this.perguntaAtual = this.questionarioAtual.perguntas[perguntaPosicao];
          this.selecionarTipo();
        } else {
          this.proximaPergunta();
        }
      }
    ).catch(this.error);
  }

  pular() {
    this.proximaPergunta(1);
  }

  proximaPergunta(pular = 0) {
    var posicaoPerguntaAtual: number;
    var aux = 0;
    this.perguntaAtual ? posicaoPerguntaAtual = this.questionarioAtual.perguntas.indexOf(this.perguntaAtual) + pular : posicaoPerguntaAtual = 0;
    if(posicaoPerguntaAtual > this.questionarioAtual.perguntas.length - 1) posicaoPerguntaAtual = 0;
    while (aux < this.questionarioAtual.perguntas.length) {
      
      var perguntaAtualAux: any = this.questionarioAtual.perguntas[posicaoPerguntaAtual];
      if (!perguntaAtualAux.resposta) {
        if (this.questionarioIniciadoLocalService.isPerguntaDisponivel(perguntaAtualAux,this.questionarioIniciadoList)) {
          this.perguntaAtual = perguntaAtualAux;
          this.selecionarTipo();
          return;
        }
      }
      (this.questionarioAtual.perguntas.length - 1) > posicaoPerguntaAtual ? posicaoPerguntaAtual++ : posicaoPerguntaAtual = 0;
      aux++;
    }
    this.perguntaAtual = null;
  }

  private selecionarTipo() {
    this.multiplaEscolhaResposta = false;
    this.escolhaUnicaResposta = false;
    this.entradaTextoResposta = false;
    this.selecionarArquivoResposta = false;
    this.selecionarImagemResposta = false;
    this.numeroResposta = false;
    this.coordenadaResposta = false;

    switch (this.perguntaAtual.tipo) {
      case 0:
        if (this.perguntaAtual.multipla) {
          this.multiplaEscolhaResposta = true;
        }
        else {
          if (this.perguntaAtual.resposta) {
            var respostaEscolhaUnica: any = this.perguntaAtual.resposta;
            this.escolhaUnica = { possivel_escolha_id: respostaEscolhaUnica.possivel_escolha_id.id, latitude: respostaEscolhaUnica.latitude, longitude: respostaEscolhaUnica.longitude };
          } else {
            this.escolhaUnica = { possivel_escolha_id: "", latitude: "", longitude: "" };
          }
          this.escolhaUnicaResposta = true;
        }
        break;
      case 1:
        if (this.perguntaAtual.resposta) {
          var respostaTexto: any = this.perguntaAtual.resposta;
          this.textoResposta = { texto: respostaTexto.texto, latitude: respostaTexto.latitude, longitude: respostaTexto.longitude };
        } else {
          this.textoResposta = { texto: "", latitude: "", longitude: "" };
        }
        this.entradaTextoResposta = true;
        break;
      case 2:
        this.selecionarArquivoResposta = true;
        break;
      case 3:
        this.selecionarImagemResposta = true;
        break;
      case 4:
        this.coordenadaResposta = true;
        break;
      case 5:
        if (this.perguntaAtual.resposta) {
          var respostaNumero: any = this.perguntaAtual.resposta;
          this.numero = { numero: respostaNumero.numero, latitude: respostaNumero.latitude, longitude: respostaNumero.longitude };
        } else {
          this.numero = { numero: null, latitude: "", longitude: "" };
        }
        this.numeroResposta = true;
        break;
    }
  }

  respostaEscolhaUnica(pergunta: Pergunta) {
    this.escolhaUnica.latitude = this.coordenadas.latitude;
    this.escolhaUnica.longitude = this.coordenadas.longitude;
    var escolhaUnicaAux = new EscolhaUnica();
    escolhaUnicaAux.latitude = this.escolhaUnica.latitude;
    escolhaUnicaAux.longitude = this.escolhaUnica.longitude;
    let aux = pergunta.possiveis_escolhas.find(escolha => escolha.id === this.escolhaUnica.possivel_escolha_id);
    if(aux){
      escolhaUnicaAux.possivel_escolha_id = aux
      pergunta.resposta = escolhaUnicaAux;
      this.salvarPular();
    }else{
      this.ferramenta.presentToast("A pergunta deve ser respondida para salvar!")
    }
 
  }

  respostaCoordenada(pergunta: any) {
    var localizacao = new Localizacao();
    localizacao.latitude = this.coordenadas.latitude;
    localizacao.longitude = this.coordenadas.longitude;
    localizacao.latitudeResposta = this.coordenadas.latitude;
    localizacao.longitudeResposta = this.coordenadas.longitude;
    pergunta.resposta = localizacao;
    this.salvarPular();
  }

  respostaMultiplaEscolha(pergunta: any) {
    var multiplaEscolha = new MultiplaEscolha();
    multiplaEscolha.latitude = this.coordenadas.latitude;
    multiplaEscolha.longitude = this.coordenadas.longitude;
    pergunta.possiveis_escolhas.forEach(escolha => {
      if (escolha.marcada) {
        multiplaEscolha.possiveis_escolhas_id.push(escolha);
      }
    });
    pergunta.resposta = multiplaEscolha;
    this.salvarPular();
  }

  respostaTexto(pergunta: any) {
    if (this.textoResposta.texto.length > 0) {
      this.textoResposta.latitude = this.coordenadas.latitude;
      this.textoResposta.longitude = this.coordenadas.longitude;
      var textoAux = new TextoResposta();
      textoAux.texto = this.textoResposta.texto;
      textoAux.latitude = this.textoResposta.latitude;
      textoAux.longitude = this.textoResposta.longitude;
      pergunta.resposta = textoAux;
      this.salvarPular();
    } else {
      this.ferramenta.presentToast("Campo Vazio!");
    }
  }

  respostaNumero(pergunta: Pergunta) {
    if (this.numeroValido(pergunta, this.numero.numero)) {
      this.numero.latitude = this.coordenadas.latitude;
      this.numero.longitude = this.coordenadas.longitude;
      var numeroAux = new Numero();
      numeroAux.latitude = this.numero.latitude;
      numeroAux.longitude = this.numero.longitude;
      numeroAux.numero = this.numero.numero;
      pergunta.resposta = numeroAux;
      this.salvarPular();
    } else {
      this.ferramenta.presentToast("Valor inválido, informe novamente.");
    }
  }

  private numeroValido(pergunta: any, numero): boolean {
    if (numero) return +numero >= +pergunta.maior_que && +numero <= +pergunta.menor_que;
    return false;
  }

  respostaArquivo(pergunta: any) {
    this.seletorArquivos.openFile().then(
      file => {
        this.seletorArquivos.readPathFile(file).then(
          filePath => {
            this.filePath = filePath
            var arquivoAux = new Arquivo();
            arquivoAux.latitude = this.coordenadas.latitude;
            arquivoAux.longitude = this.coordenadas.longitude;
            this.base64.encodeFile(filePath).then((base64File: string) => {
              arquivoAux.fileName = filePath;
              arquivoAux.file = base64File;
              pergunta.resposta = arquivoAux;
            }, (err) => console.log(err));
          }
        );
      }
    );
  }

  respostaImagem(pergunta: Pergunta) {
    this.selectImage.selecionarImagem(pergunta, this.coordenadas);
  }

  salvarImagem(pergunta: any) {
    if (pergunta.resposta) this.salvarPular();
  }

  private salvarPular() {
    this.atualizarQuestionario();
    this.proximaPergunta();
  }

  private atualizarQuestionario() {
    this.questionarioAtual.atualizado_em = new Date().toISOString();
    this.questionarioIniciadoLocalService.atualizarQuestionariosList(this.questionarioIniciadoList);
  }

  voltar() {
    this.navCtrl.popToRoot();
  }

}
