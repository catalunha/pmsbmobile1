var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { EscolhaUnica, MultiplaEscolha, TextoResposta, Arquivo, Numero, Localizacao } from '../../models/resposta.model';
var PerguntaPage = /** @class */ (function () {
    function PerguntaPage(navCtrl, navParams, selectImage, gps, questionarioIniciadoLocalService, seletorArquivos, ferramenta, base64) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectImage = selectImage;
        this.gps = gps;
        this.questionarioIniciadoLocalService = questionarioIniciadoLocalService;
        this.seletorArquivos = seletorArquivos;
        this.ferramenta = ferramenta;
        this.base64 = base64;
        this.multiplaEscolhaResposta = false;
        this.escolhaUnicaResposta = false;
        this.entradaTextoResposta = false;
        this.selecionarArquivoResposta = false;
        this.selecionarImagemResposta = false;
        this.numeroResposta = false;
        this.coordenadaResposta = false;
        this.escolhaUnica = { possivel_escolha_id: "", latitude: "", longitude: "" };
        this.textoResposta = { texto: "", latitude: "", longitude: "" };
        this.numero = { numero: null, latitude: "", longitude: "" };
        this.coordenadas = { latitude: '', longitude: '' };
        this.error = function (error) { console.log(error); };
        this.recuperaQuestionario();
        this.area = this.navParams.get("area");
    }
    PerguntaPage.prototype.ionViewDidEnter = function () {
        this.gps.startGPS(this.coordenadas);
    };
    PerguntaPage.prototype.ionViewWillLeave = function () {
        this.gps.stopGPS();
    };
    PerguntaPage.prototype.recuperaQuestionario = function () {
        var _this = this;
        this.questionarioIniciadoLocalService.getQuestionariosIniciados().then(function (questionariosIniciados) {
            _this.questionarioIniciadoList = questionariosIniciados;
            _this.questionarioAtual = _this.questionarioIniciadoList.questionarios[_this.navParams.get("questionarioPosicao")];
            var perguntaPosicao = _this.navParams.get("perguntaPosicao");
            if (perguntaPosicao != null) {
                _this.perguntaAtual = _this.questionarioAtual.perguntas[perguntaPosicao];
                _this.selecionarTipo();
            }
            else {
                _this.proximaPergunta();
            }
        }).catch(this.error);
    };
    PerguntaPage.prototype.pular = function () {
        this.proximaPergunta(1);
    };
    PerguntaPage.prototype.proximaPergunta = function (pular) {
        if (pular === void 0) { pular = 0; }
        var posicaoPerguntaAtual;
        var aux = 0;
        this.perguntaAtual ? posicaoPerguntaAtual = this.questionarioAtual.perguntas.indexOf(this.perguntaAtual) + pular : posicaoPerguntaAtual = 0;
        if (posicaoPerguntaAtual > this.questionarioAtual.perguntas.length - 1)
            posicaoPerguntaAtual = 0;
        while (aux < this.questionarioAtual.perguntas.length) {
            var perguntaAtualAux = this.questionarioAtual.perguntas[posicaoPerguntaAtual];
            if (!perguntaAtualAux.resposta) {
                if (this.questionarioIniciadoLocalService.isPerguntaDisponivel(perguntaAtualAux, this.questionarioIniciadoList)) {
                    this.perguntaAtual = perguntaAtualAux;
                    this.selecionarTipo();
                    return;
                }
            }
            (this.questionarioAtual.perguntas.length - 1) > posicaoPerguntaAtual ? posicaoPerguntaAtual++ : posicaoPerguntaAtual = 0;
            aux++;
        }
        this.perguntaAtual = null;
    };
    PerguntaPage.prototype.selecionarTipo = function () {
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
                        var respostaEscolhaUnica = this.perguntaAtual.resposta;
                        this.escolhaUnica = { possivel_escolha_id: respostaEscolhaUnica.possivel_escolha_id.id, latitude: respostaEscolhaUnica.latitude, longitude: respostaEscolhaUnica.longitude };
                    }
                    else {
                        this.escolhaUnica = { possivel_escolha_id: "", latitude: "", longitude: "" };
                    }
                    this.escolhaUnicaResposta = true;
                }
                break;
            case 1:
                if (this.perguntaAtual.resposta) {
                    var respostaTexto = this.perguntaAtual.resposta;
                    this.textoResposta = { texto: respostaTexto.texto, latitude: respostaTexto.latitude, longitude: respostaTexto.longitude };
                }
                else {
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
                    var respostaNumero = this.perguntaAtual.resposta;
                    this.numero = { numero: respostaNumero.numero, latitude: respostaNumero.latitude, longitude: respostaNumero.longitude };
                }
                else {
                    this.numero = { numero: null, latitude: "", longitude: "" };
                }
                this.numeroResposta = true;
                break;
        }
    };
    PerguntaPage.prototype.respostaEscolhaUnica = function (pergunta) {
        var _this = this;
        this.escolhaUnica.latitude = this.coordenadas.latitude;
        this.escolhaUnica.longitude = this.coordenadas.longitude;
        var escolhaUnicaAux = new EscolhaUnica();
        escolhaUnicaAux.latitude = this.escolhaUnica.latitude;
        escolhaUnicaAux.longitude = this.escolhaUnica.longitude;
        escolhaUnicaAux.possivel_escolha_id = pergunta.possiveis_escolhas.find(function (escolha) { return escolha.id === _this.escolhaUnica.possivel_escolha_id; });
        pergunta.resposta = escolhaUnicaAux;
        this.salvarPular();
    };
    PerguntaPage.prototype.respostaCoordenada = function (pergunta) {
        var localizacao = new Localizacao();
        localizacao.latitude = this.coordenadas.latitude;
        localizacao.longitude = this.coordenadas.longitude;
        localizacao.latitudeResposta = this.coordenadas.latitude;
        localizacao.longitudeResposta = this.coordenadas.longitude;
        pergunta.resposta = localizacao;
        this.salvarPular();
    };
    PerguntaPage.prototype.respostaMultiplaEscolha = function (pergunta) {
        var multiplaEscolha = new MultiplaEscolha();
        multiplaEscolha.latitude = this.coordenadas.latitude;
        multiplaEscolha.longitude = this.coordenadas.longitude;
        pergunta.possiveis_escolhas.forEach(function (escolha) {
            if (escolha.marcada) {
                multiplaEscolha.possiveis_escolhas_id.push(escolha);
            }
        });
        pergunta.resposta = multiplaEscolha;
        this.salvarPular();
    };
    PerguntaPage.prototype.respostaTexto = function (pergunta) {
        if (this.textoResposta.texto != "") {
            this.textoResposta.latitude = this.coordenadas.latitude;
            this.textoResposta.longitude = this.coordenadas.longitude;
            var textoAux = new TextoResposta();
            textoAux.texto = this.textoResposta.texto;
            textoAux.latitude = this.textoResposta.latitude;
            textoAux.longitude = this.textoResposta.longitude;
            pergunta.resposta = textoAux;
            this.salvarPular();
        }
        else {
            this.ferramenta.presentToast("Campo Vazio!");
        }
    };
    PerguntaPage.prototype.respostaNumero = function (pergunta) {
        if (this.numeroValido(pergunta, this.numero.numero)) {
            this.numero.latitude = this.coordenadas.latitude;
            this.numero.longitude = this.coordenadas.longitude;
            var numeroAux = new Numero();
            numeroAux.latitude = this.numero.latitude;
            numeroAux.longitude = this.numero.longitude;
            numeroAux.numero = this.numero.numero;
            pergunta.resposta = numeroAux;
            this.salvarPular();
        }
        else {
            this.ferramenta.presentToast("Valor inválido, informe novamente.");
        }
    };
    PerguntaPage.prototype.numeroValido = function (pergunta, numero) {
        if (numero)
            return +numero >= +pergunta.maior_que && +numero <= +pergunta.menor_que;
        return false;
    };
    PerguntaPage.prototype.respostaArquivo = function (pergunta) {
        var _this = this;
        this.seletorArquivos.openFile().then(function (file) {
            _this.seletorArquivos.readPathFile(file).then(function (filePath) {
                _this.filePath = filePath;
                var arquivoAux = new Arquivo();
                arquivoAux.latitude = _this.coordenadas.latitude;
                arquivoAux.longitude = _this.coordenadas.longitude;
                _this.base64.encodeFile(filePath).then(function (base64File) {
                    arquivoAux.fileName = filePath;
                    arquivoAux.file = base64File;
                    pergunta.resposta = arquivoAux;
                }, function (err) { return console.log(err); });
            });
        });
    };
    PerguntaPage.prototype.respostaImagem = function (pergunta) {
        this.selectImage.selecionarImagem(pergunta, this.coordenadas);
    };
    PerguntaPage.prototype.salvarImagem = function (pergunta) {
        if (pergunta.resposta)
            this.salvarPular();
    };
    PerguntaPage.prototype.salvarPular = function () {
        this.atualizarQuestionario();
        this.proximaPergunta();
    };
    PerguntaPage.prototype.atualizarQuestionario = function () {
        this.questionarioAtual.atualizado_em = new Date().toISOString();
        this.questionarioIniciadoLocalService.atualizarQuestionariosList(this.questionarioIniciadoList);
    };
    PerguntaPage.prototype.voltar = function () {
        this.navCtrl.pop();
    };
    PerguntaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pergunta',
            templateUrl: 'pergunta.html',
            providers: [QuestionarioIniciadoLocalService, SeletorArquivoService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            CameraService,
            LocalizacaoService,
            QuestionarioIniciadoLocalService,
            SeletorArquivoService,
            FerramentasProvider,
            Base64])
    ], PerguntaPage);
    return PerguntaPage;
}());
export { PerguntaPage };
//# sourceMappingURL=pergunta.js.map