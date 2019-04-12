import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SetorCensitarioService } from '../dataServer/setor_censitario.service';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';

import { FerramentasProvider } from '../ferramentas/ferramentas';
import { CoreServiceLocal } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';


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
        //this._removeSetorCensitarioDisponiveisAll(); // Comente esta linha
    }

    _removeSetorCensitarioDisponiveisAll() {
        super.removeItemStorage(this.key);
    }

    getSetoresCensitariosDisponiveis(): any {
        return super.getStorage(this.key);
    }


    getSetoresOffline() {
        return JSON.parse(super.getLocalStorage('setores-offline'))
    }

    salvarSetorOffline(setor) {
        var setor_lista = this.getSetoresOffline()
        console.log(setor_lista)
        if (!setor_lista) { setor_lista = [] }
        setor_lista.push(setor)
        super.saveLocalStorage(`setores-offline`, JSON.stringify(setor_lista))
    }

    apagarListaOffline(){
        super.removeItemStorage('setores-offline')
    }

    postNovoSetorCensitarioNoServidor(setor) {
        let setor_obj = setor
        if (setor.id) {
            setor_obj = {
                "id":setor.id,
                "fake_deletado": false,
                "fake_deletado_em": null,
                "nome": setor.nome,
                "ativo": true,
                "setor_superior": setor.setor_superior
            }
        }

        return this.setorCensitarioServer.setSetorCensitario(setor_obj)
    }

    public getSetoresCensitariosServidor() {
        this.setorCensitarioServer.getSetoresCensitarios({}).subscribe((setorCensitariosList) => {
            var setores_offline = this.getSetoresOffline()
            console.log(setores_offline)
            if (setores_offline) {
                setores_offline.forEach(setor => {
                    setorCensitariosList.push(setor)
                });
            }
            this.adicionarSetorCensitarios(setorCensitariosList)
        }, this.error);
    }

    public adicionarSetorCensitarios(listaSetorCensitario: SetorCensitario[]) {
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