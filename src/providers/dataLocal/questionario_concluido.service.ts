import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { QuestionarioLocalService } from './questionario.service';

@Injectable()
export class QuestionarioConcluidoLocalService extends QuestionarioLocalService {

    private key: string = "questionarios_concluidos_PMSB";
    private secondKey: string = "questionarios_iniciados_PMSB";

    constructor(public storage: Storage) {
        super(storage);
        // this._removeQuestionarioConcluidosAll();
    }

    _removeQuestionarioConcluidosAll(){
        super._removeQuestionarioAll(this.key);
    }

    removeQuestionarioConcluido(questionario: Questionario, questionarioList: QuestionariosList){
        super.removerQuestionario(questionario, questionarioList);
    }

    adicionarNovoQuestionarioConcluido(questionario: Questionario): any {
        super.adicionarNovoQuestionario(questionario, this.key);
    }

    getQuestionariosConcluidos(): any {
        return super.getQuestionarios(this.key);
    }

    editarQuestionarioConcluido(questionario: Questionario, questionarioList: QuestionariosList){
        super.alternarLista(questionario, questionarioList, this.secondKey);
    }
    
}