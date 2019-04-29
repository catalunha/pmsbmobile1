import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { QuestionarioLocalService } from './questionario.service';
import { Pergunta } from '../../models/pergunta.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class QuestionarioIniciadoLocalService extends QuestionarioLocalService {

    private key: string = "questionarios_iniciados_PMSB";
    private secondKey: string = "questionarios_concluidos_PMSB";

    constructor(public storage: Storage) {
        super(storage);
        // this._removeQuestionarioIniciadosAll(); // COMENTE ESTA LINHA
    }

    // Usado apenas por devs
    _removeQuestionarioIniciadosAll() {
        super._removeQuestionarioAll(this.key);
    }

    removeQuestionarioIniciado(questionario: Questionario, questionarioList: QuestionariosList) {
        super.removerQuestionario(questionario, questionarioList);
    }

    adicionarNovoQuestionarioIniciado(questionario: Questionario): any {
        super.adicionarNovoQuestionario(questionario, this.key);
    }

    getQuestionariosIniciados(): any {
        return super.getQuestionarios(this.key);
    }

    async concluirQuestionarioIniciado(questionario: Questionario, questionarioList: QuestionariosList) {
        console.log('concluirQuestionarioIniciado')
        super.alternarLista(questionario, questionarioList, this.secondKey);
    }

    // ------------------ Requisitos --------------------- //

    isPerguntaDisponivel(pergunta: Pergunta, questionarioList: QuestionariosList): boolean {
        let disponivel = true;
        if (pergunta.perguntarequisito_set) {
            var resposta;
            pergunta.perguntarequisito_set.forEach(perguntaRequisitoSet => {
                resposta = questionarioList.questionarios
                    .find(q => q.id === perguntaRequisitoSet.pergunta_requisito.questionario).perguntas
                    .find(p => p.id === perguntaRequisitoSet.pergunta_requisito.pergunta).resposta;
                if (resposta === undefined) disponivel = false;
            });
        }

        if (!disponivel) return disponivel;

        if (pergunta.escolharequisito_set) {
            pergunta.escolharequisito_set.forEach(escolhaRequisitoSet => {
                try{
                    var perguntaR = questionarioList.questionarios.find(q => q.id === escolhaRequisitoSet.questionario)//.perguntas.find(p => p.id === escolhaRequisitoSet.pergunta);
                    var pergunta_perguntas = perguntaR.perguntas
                    var pergunta_aux = pergunta_perguntas.find(p => p.id === escolhaRequisitoSet.pergunta);

                    var resposta: any = pergunta_aux.resposta;
                    if (resposta) {
                        if (pergunta_aux.multipla) {
                            var escolhaMarcada = resposta.possiveis_escolhas_id.find(er => er.id === escolhaRequisitoSet.escolha_requisito);
                            if (!escolhaMarcada) disponivel = false;
                        }else{
                            if(!(resposta.possivel_escolha_id.id === escolhaRequisitoSet.escolha_requisito)){
                                disponivel = false;
                            }
                        }
                    }else disponivel = false;
                }catch(err){
                    console.log({perguntaR:questionarioList.questionarios})
                }

            });
        }
        return disponivel;
    }
}