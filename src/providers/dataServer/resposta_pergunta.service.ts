import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RespostaPergunta } from '../../models/resposta_pergunta.model';
import { QuestionariosList } from '../../models/questionario.model';

@Injectable()
export class RespostaPerguntaService extends CoreService {

    constructor(private http: Http) {
        super(http, '/api/questionarios/respostas_pergunta');
    }

    private addRespostaPerguntaAll(respostaPerguntaList: RespostaPergunta[]): Observable<RespostaPergunta[]> {
        return super.add(respostaPerguntaList);
    }

    public pushPerguntas(questionarioList: QuestionariosList): Promise<any> {
        return new Promise((resolve, reject) => {
            var respostaPerguntaList = this.converterRespostaPergunta(questionarioList);
            if (this.listaVazia(respostaPerguntaList)) {
                this.addRespostaPerguntaAll(respostaPerguntaList).subscribe(
                    respostaPerguntaList => {
                        this.salvarRespostaPerguntaSincronizada(questionarioList, respostaPerguntaList);
                        resolve(respostaPerguntaList);
                    },
                    error => console.log({errorpostagem:error})
                );
            } else resolve([]);
        });
    }

    private converterRespostaPergunta(questionarioList: QuestionariosList): RespostaPergunta[] {
        var respostaPerguntaList: RespostaPergunta[] = new Array();
        for (const questionario of questionarioList.questionarios) {
            for (const pergunta of questionario.perguntas) {
                // Se a pergunta não possui resposta sincronizada e a pergunta possui uma resposta
                if (!pergunta.resposta_pergunta && pergunta.resposta) {
                    var respostaPerguntaAux = new RespostaPergunta(questionario, pergunta);
                    respostaPerguntaList.push(respostaPerguntaAux);
                }
            }
        }
        return respostaPerguntaList;
    }

    private salvarRespostaPerguntaSincronizada(questionarioList: QuestionariosList, respostaPerguntaList: RespostaPergunta[]) {
        var aux = 0;
        loop1:
        for (const questionario of questionarioList.questionarios) {
            for (const pergunta of questionario.perguntas) {
                if (!pergunta.resposta_pergunta && pergunta.resposta) {
                    pergunta.resposta_pergunta = respostaPerguntaList[aux];
                    aux++;
                    if (aux === respostaPerguntaList.length) break loop1;
                }
            }
        }
    }

    private listaVazia(array: any): boolean {
        return array.length > 0;
    }
}