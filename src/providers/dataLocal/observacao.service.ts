import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observacao, ObservacaoList } from '../../models/observacao.model';
import { CoreServiceLocal } from './core.service';

@Injectable()
export class ObservacaoLocalService extends CoreServiceLocal{

    private key: string = "lista_observacoes_PMSB";
   
    constructor(public storage: Storage) {
        super(storage);
        // this.removeObservacoesAll();
    }

    removeObservacoesAll(){
        super.removeItemStorage(this.key);
    }

    getListObservacoes(): any {
        return super.getStorage(this.key);
    }
    
    atualizarListObservacoes(observacaoList: ObservacaoList){
        super.saveStorage(observacaoList.key, observacaoList);
    };

    adicionarListaObservacoes(lista: Observacao[]){
        super.getStorage(this.key).then(
            listaObservacoes => {
                if(!listaObservacoes) listaObservacoes = new ObservacaoList(this.key);
                listaObservacoes.lista = [...lista, ...listaObservacoes.lista];
                this.atualizarListObservacoes(listaObservacoes);
            }
        ).catch(error => console.log(error));
    }
}