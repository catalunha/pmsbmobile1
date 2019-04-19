import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Questionario, QuestionariosList } from './../../models/questionario.model';
import { RespostaQuestionario } from '../../models/resposta_questionario.model';


@Injectable()
export class RespostaQuestionarioService extends CoreService {

    constructor(private http: Http) {
        super(http, '/api/questionarios/respostas');
    }

    public getQuestionarios(params: any): Observable<Questionario[]> {
        return super.all(params);
    }

    private addRespostaQuestionarioAll(respostaQuestionarioList: RespostaQuestionario[]): Observable<RespostaQuestionario[]> {
        return super.add(respostaQuestionarioList);
    }

    public pushQuestionarios(questionarioList: QuestionariosList, usuario) {
        // Verificando se existem questionários concluídos
        return new Promise((resolve, reject) => {
            if (this.listaVazia(questionarioList.questionarios)) {
                // Recebendo a lista com os questionários que ainda não possuem uma "resposta_questionario"
                var respostaQuestionarioList = this.converterRespostaQuestionario(questionarioList, usuario);
                if (this.listaVazia(respostaQuestionarioList)) {
                    // [Sincronização] Criando "resposta_questionario" para os questionários concluídos
                    this.addRespostaQuestionarioAll(respostaQuestionarioList).subscribe(
                        respostaQuestionarioList => {
                            this.salvarRespostaQuestionarioSincronizada(questionarioList, respostaQuestionarioList);
                            resolve(respostaQuestionarioList);
                        },
                        error => reject(error)
                    );
                } else resolve([]);
            } else resolve([]);
        });
    }

    private converterRespostaQuestionario(questionarioList: QuestionariosList, usuario): RespostaQuestionario[] {
        
        var respostaQuestionarioList: RespostaQuestionario[] = new Array();
        
        for (const questionario of questionarioList.questionarios) {
            if (!questionario.resposta_questionario) {
                //trocar usuario pelo usuario que responde
                var respostaQuestionarioAux = new RespostaQuestionario(usuario, questionario);
                respostaQuestionarioList.push(respostaQuestionarioAux);
            }
        }
        return respostaQuestionarioList;
    }

    private salvarRespostaQuestionarioSincronizada(questionarioList: QuestionariosList, respostaQuestionarioList: RespostaQuestionario[]) {
        var aux = 0;
        for (const questionario of questionarioList.questionarios) {
            if (!questionario.resposta_questionario) {
                questionario.resposta_questionario = respostaQuestionarioList[aux];
                aux++;
                if (aux === respostaQuestionarioList.length) break;
            }
        }
    }

    private listaVazia(array: any): boolean {
        return array.length > 0;
    }
}