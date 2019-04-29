import { Injectable } from '@angular/core';
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';

import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { removeArrayItem } from 'ionic-angular/util/util';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class QuestionarioLocalService extends CoreServiceLocal {

    constructor(public storage: Storage) {
        super(storage);
    }

    atualizarQuestionariosList(questionarioList: QuestionariosList): any {
        return super.saveStorage(questionarioList.key, questionarioList)
    }

    _removeQuestionarioAll(key: string) {
        super.removeItemStorage(key);
    }

    async removerQuestionario(questionario: Questionario, questionariosList: QuestionariosList) {
        let aux = questionariosList
        aux.questionarios = await questionariosList.questionarios.filter((quest)=>{ return quest !== questionario })
        await this.atualizarQuestionariosList(aux);
        
        
        //if (removeArrayItem(questionariosList.questionarios, questionario)) {
        //    this.atualizarQuestionariosList(questionariosList);
        //}
    }

    adicionarNovoQuestionario(questionario: Questionario, key: string): any {
        //console.log({adicionarNovoQuestionario:questionario})
        super.getStorage(key)
            .then(
                listaQuestionarios => {
                    if (!listaQuestionarios) {listaQuestionarios = new QuestionariosList(key);}
                    //console.log({questionario:questionario})
                    listaQuestionarios.questionarios.unshift(questionario);
                    super.saveStorage(listaQuestionarios.key, listaQuestionarios);
                }
            ).catch(error => console.error(error));
    }

    adicionarVariosQuestionarios(listaQuestionario: Questionario[], key: string): any {
        let questionariosAux = new QuestionariosList(key);
        questionariosAux.questionarios = [...listaQuestionario];
        return super.saveStorage(questionariosAux.key, questionariosAux);
    }

    getQuestionarios(key: string): any {
        return super.getStorage(key);
    }

    alternarLista(questionario: Questionario, questionarioList: QuestionariosList, to_key: string) {    
        this.adicionarNovoQuestionario(questionario, to_key);
        this.removerQuestionario(questionario, questionarioList);
    }
}