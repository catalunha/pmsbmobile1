import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { QuestionarioLocalService } from './questionario.service';
import { QuestionarioService } from './../dataServer/questionario.service';
import { AtualizaQuestionario } from './atualiza_questionario.service';
import { FerramentasProvider } from './../ferramentas/ferramentas';
import { resolve } from 'dns';

@Injectable()
export class QuestionarioDisponivelLocalService extends QuestionarioLocalService {

    eventoUpdateQuestionarioDisponivel = new EventEmitter<QuestionariosList>();
    function_marcador
    ref
    errorAlert = (error, msg) => {
        this.ferramenta.presentToast(`${msg} Não foi possível atualizar os dados.`);
        console.log(error);
    }

    private key: string = "questionarios_disponivel_PMSB";
    private secondKey: string = "questionarios_iniciados_PMSB";

    constructor(public storage: Storage,
        private questionarioServer: QuestionarioService,
        private avaliadorQuestionario: AtualizaQuestionario,
        private ferramenta: FerramentasProvider) {
        super(storage);
        //this.getQuestionariosServidor();
        // this._removeQuestionarioDisponiveisAll(); // Comente esta linha
    }

    _removeQuestionarioDisponiveisAll() {
        super._removeQuestionarioAll(this.key);
    }

    adicionarNovoQuestionarioIniciado(questionario: Questionario): any {
        super.adicionarNovoQuestionario(questionario, this.secondKey);
    }

    removeQuestionarioDisponivel(questionario: Questionario, questionarioList: QuestionariosList) {
        super.removerQuestionario(questionario, questionarioList);
    }

    adicionarNovoQuestionarioDisponivel(questionario: Questionario): any {
        super.adicionarNovoQuestionario(questionario, this.key);
    }

    getQuestionariosDisponiveis(): any {
        return super.getQuestionarios(this.key);
    }

    // ------------------------------------ //

    private getQuestionariosIniciados(): any {
        return super.getQuestionarios(this.secondKey);
    }

    getQuestionariosServidor() {
        return new Promise(async (resolve, reject) => {
            await console.log('getQuestionariosServidor')
            const sucess = async questionariosList => {
                await this.verificarInicializacao(questionariosList)
                await resolve(questionariosList)
            }
            await this.questionarioServer.getQuestionarios({}).subscribe(sucess, error => {
                this.errorAlert(error, "[ERRO 01]")
                reject(false)
            });
            await console.log("getQuestionariosServidor-FIM")
        })
    }

    private async verificarInicializacao(listaQuestionario: Questionario[]) {
        await this.getQuestionariosDisponiveis().then(
            questionariosList => {
                if (questionariosList) this.verificarAtualizacao(listaQuestionario, questionariosList);
                else this.adicionarQuestionariosDisponiveis(listaQuestionario);
            }
        ).catch(error => this.errorAlert(error, "[ERRO 02]"));
    }

    private async verificarAtualizacao(questionariosServidor: Questionario[], questionariosLocal: QuestionariosList) {
        //console.log('verificarAtualizacao')
        this.avaliadorQuestionario.setObservacoes();
        await this.avaliadorQuestionario.verificarListaQuestionarioPipeline(questionariosServidor, questionariosLocal).then(async (resp) => {
           //console.log('verificarAtualizacao-lista', questionariosLocal)
            this.avaliadorQuestionario.salvarObservacoes();
            return super.atualizarQuestionariosList(questionariosLocal).then(lista => {
                this.atualizarViewQuestionarioDisponivel(lista);
                this.avaliadorQuestionario.setObservacoes(false);
                this.getQuestionariosIniciados().then(
                    questionariosIniciados => {
                        if (questionariosIniciados) {
                            var atualizaIniciados = this.avaliadorQuestionario.verificarQuestionarioEditado(questionariosServidor, questionariosIniciados);
                            if (atualizaIniciados) super.atualizarQuestionariosList(questionariosIniciados);
                        }
                    }
                ).catch(error => this.errorAlert(error, "[ERRO 03]"));
            }).catch(error => this.errorAlert(error, "[ERRO 04]"));
        });
        //await this.ferramenta.presentToast("Questionários Atualizados!");
        //console.log('verificarAtualizacao-END')
    }

    private adicionarQuestionariosDisponiveis(listaQuestionario: Questionario[]) {
        const sucess = questionariosList => this.atualizarViewQuestionarioDisponivel(questionariosList);
        super.adicionarVariosQuestionarios(listaQuestionario, this.key)
            .then(sucess).catch(error => this.errorAlert(error, "[ERRO 05]"));
    }

    private atualizarViewQuestionarioDisponivel(questionariosList: QuestionariosList) {
        //console.log({ questionariosList: questionariosList })
        this.eventoUpdateQuestionarioDisponivel.emit(questionariosList);
        this.ferramenta.presentToast("Questionários Atualizados!");
    }

}