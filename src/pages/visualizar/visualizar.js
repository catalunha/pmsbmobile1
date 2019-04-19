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
import { QuestionarioIniciadoLocalService } from '../../providers/dataLocal/questionario_iniciado.service';
var VisualizarPage = /** @class */ (function () {
    function VisualizarPage(navCtrl, navParams, questionario_local) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionario_local = questionario_local;
        this.recuperaQuestionario();
    }
    VisualizarPage.prototype.recuperaQuestionario = function () {
        var _this = this;
        this.questionario_local.getQuestionariosIniciados().then(function (questionariosIniciados) {
            _this.questionarioIniciadoList = questionariosIniciados;
            _this.questionarioAtual = _this.questionarioIniciadoList.questionarios[_this.navParams.get("questionarioPosicao")];
        }).catch(function (error) {
            console.log("Erro ao recuperar questionário. Page: Visualizar");
            console.log(error);
        });
    };
    VisualizarPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-visualizar',
            templateUrl: 'visualizar.html',
            providers: [QuestionarioIniciadoLocalService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            QuestionarioIniciadoLocalService])
    ], VisualizarPage);
    return VisualizarPage;
}());
export { VisualizarPage };
//# sourceMappingURL=visualizar.js.map