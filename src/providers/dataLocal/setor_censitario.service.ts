import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SetorCensitarioService } from '../dataServer/setor_censitario.service';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';

import { FerramentasProvider } from '../ferramentas/ferramentas';
import { CoreServiceLocal } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class SetorCensitarioLocalService extends CoreServiceLocal {

    eventoUpdateSetorCensitario = new EventEmitter<SetorCensitarioList>();
    error = error => {
        this.ferramenta.presentToast("Não foi possível atualizar os dados.");
        console.error(error);
    }
    
    private key: string = "setores_censitarios_PMSB";

    constructor(public storage: Storage,
        private setorCensitarioServer: SetorCensitarioService,
        private ferramenta: FerramentasProvider) {
        super(storage);
        this.getSetoresCensitariosServidor();
        // this._removeSetorCensitarioDisponiveisAll(); // Comente esta linha
    }

    _removeSetorCensitarioDisponiveisAll() {
        super.removeItemStorage(this.key);
    }

    getSetoresCensitariosDisponiveis(): any {
        return super.getStorage(this.key);
    }

    private getSetoresCensitariosServidor() {
        const sucess = setorCensitariosList => this.adicionarSetorCensitarios(setorCensitariosList);
        this.setorCensitarioServer.getSetoresCensitarios({}).subscribe(sucess, this.error);
    }

    private adicionarSetorCensitarios(listaSetorCensitario: SetorCensitario[]) {
        const sucess = setorCensitariosList => this.atualizarViewSetorCensitario(setorCensitariosList);
        this.adicionarVariosSetoresCensitarios(listaSetorCensitario, this.key)
            .then(sucess).catch(this.error);
    }

    private adicionarVariosSetoresCensitarios(listaSetores: SetorCensitario[], key: string): any {
        let setorAux = new SetorCensitarioList(key);
        setorAux.setoresCensitarios = [...listaSetores];
        return super.saveStorage(setorAux.key, setorAux);
    }

    private atualizarViewSetorCensitario(setorCensitariosList: SetorCensitarioList) {
        this.eventoUpdateSetorCensitario.emit(setorCensitariosList);
    }
}