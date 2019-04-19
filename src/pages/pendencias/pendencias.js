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
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';
// Imports Pages
import { PerguntaPage } from './../pergunta/pergunta';
var PendenciasPage = /** @class */ (function () {
    function PendenciasPage(navCtrl, navParams, appCtrl, questionarioIniciadoLocalService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appCtrl = appCtrl;
        this.questionarioIniciadoLocalService = questionarioIniciadoLocalService;
        this.recuperaQuestionario();
    }
    // Recupera as perguntas do questionário em escolhido
    PendenciasPage.prototype.recuperaQuestionario = function () {
        var _this = this;
        this.questionarioIniciadoLocalService.getQuestionariosIniciados().then(function (questionariosIniciados) {
            _this.questionarioIniciadoList = questionariosIniciados;
            _this.questionarioAtual = _this.questionarioIniciadoList.questionarios[_this.navParams.get("questionarioPosicao")];
            _this.isDisponivel();
        }).catch(function (error) { return console.log(error); });
    };
    PendenciasPage.prototype.isDisponivel = function () {
        var _this = this;
        this.questionarioAtual.perguntas.forEach(function (pergunta) {
            // console.log(pergunta.texto);
            pergunta.pergunta_liberada = _this.questionarioIniciadoLocalService.isPerguntaDisponivel(pergunta, _this.questionarioIniciadoList);
        });
    };
    PendenciasPage.prototype.selecionarPergunta = function (pergunta) {
        this.navCtrl.setRoot(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao"), "perguntaPosicao": this.questionarioAtual.perguntas.indexOf(pergunta) });
    };
    PendenciasPage.prototype.continuar = function () {
        this.navCtrl.setRoot(PerguntaPage, { "questionarioPosicao": this.navParams.get("questionarioPosicao") });
    };
    PendenciasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pendencias',
            templateUrl: 'pendencias.html',
            providers: [QuestionarioIniciadoLocalService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            App,
            QuestionarioIniciadoLocalService])
    ], PendenciasPage);
    return PendenciasPage;
}());
export { PendenciasPage };
//# sourceMappingURL=pendencias.js.map