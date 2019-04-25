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
import { PopoverArrowDirection } from '@ionic-native/camera';


@Injectable()
export class SetorCensitarioLocalService extends CoreServiceLocal {

    eventoUpdateSetorCensitario = new EventEmitter<SetorCensitarioList>();
    setorDisponivel

    error = error => {
        //this.ferramenta.presentToast("Não foi possível atualizar os dados.");
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

    apagarListaOfflinePeloId(id){
       let setores_offline = this.getSetoresOffline().filter(setor=>{ return setor.id != id})
       super.saveLocalStorage(`setores-offline`, JSON.stringify(setores_offline))
       console.log({setores_offline:this.getSetoresOffline()})
    }

    getSetoresOffline() {
        let setores_offline = JSON.parse(super.getLocalStorage('setores-offline'))
        if(setores_offline) {return setores_offline}
        return []
    }

    salvarSetorOffline(setor) {
        var setor_lista = this.getSetoresOffline()
        console.log(setor_lista)
        if (!setor_lista) { setor_lista = [] }
        setor_lista.push(setor)
        super.saveLocalStorage(`setores-offline`, JSON.stringify(setor_lista))
    }

    apagarListaOffline() {
        super.removeItemStorage('setores-offline')
    }

    private prepararSetorParaPostagem(setor) {
        let setor_obj = {
            "fake_deletado": false,
            "fake_deletado_em": null,
            "nome": setor.nome,
            "ativo": true,
            "setor_superior": setor.setor_superior
        }
        if (setor.id) {
            setor_obj['id'] = setor.id
        }
        console.log({ Setor_vai_ser_postado: setor_obj })
        return setor_obj
    }

    async postSetorSencitario(setor) {
        return await new Promise((resolve, reject) => {
            this.setorCensitarioServer.setSetorCensitario(this.prepararSetorParaPostagem(setor)).subscribe((resposta) => {
                this.getSetoresCensitariosServidor()
                resolve(true)
            }, (erro) => {
                console.log({post_setor:erro, setor:setor})
                reject({ error: erro, setor: setor })
            })
        })
    }

    async getSetoresCensitariosServidor() {
        this.setorCensitarioServer.getSetoresCensitarios({}).subscribe((setorCensitariosList) => {
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


    getSetorSuperior(setor_superior, setoresDisponiveis) {
        return setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
    }

    getSetorNome(setor, setoresDisponiveis) {
        if (setor.setor_superior) {
            return this.getSetorNome(this.getSetorSuperior(setor.setor_superior, setoresDisponiveis), setoresDisponiveis) + " -> " + setor.nome
        }
        return setor.nome
    }

    async getSetorPeloId(id) {
        let setorDisponivel = await this.getSetoresCensitariosDisponiveis()
        await this.getSetoresOffline().forEach( setor => { setorDisponivel.setoresCensitarios.push(setor)});
        return await setorDisponivel.setoresCensitarios.find((setor) => { return setor.id == id })
    }

    salvarRefenciaQuestionarioComArea(area,questionario){
        let areas_ref = super.getLocalStorage("referencia-questionario-area")
        if(areas_ref){
            areas_ref = JSON.parse(areas_ref)
            if(!areas_ref[area.id]){
                areas_ref[area.id] = []
            }
            areas_ref[area.id].push({id:questionario.id,status:'iniciado'})
        }else{
            areas_ref = {}
            areas_ref[area.id] = []
            areas_ref[area.id].push({id:questionario.id,status:'iniciado'})
        }
        super.saveLocalStorage("referencia-questionario-area",JSON.stringify(areas_ref))
        //this.adicionarReferenciaQuestionarioArea(area,questionario.id)
    }

    verificaQuestionarioNaoExisteNaArea(area_id, questionario_id){
        let areas_ref = super.getLocalStorage("referencia-questionario-area")
        if(areas_ref){
            areas_ref = JSON.parse(areas_ref)
            if(areas_ref[area_id]){
               return this.realizarBusca(areas_ref[area_id],questionario_id)
            }else{ return true }
        }else{ return true }
    }

    private realizarBusca(quest_list, id){
        let quest_aux  = quest_list.find((quest)=>{ return quest.id == id})
        if(quest_aux){ return false }
        else { return true }
    }

    getListaRefenciaQuestionarioComArea(){
        let areas_ref = super.getLocalStorage("referencia-questionario-area")
        if(areas_ref){ return JSON.parse(areas_ref) } 
        else{ return {} }
    }

    removerRefenciaQuestionarioComArea( area_id, questionario_id ){
        let areas_ref = JSON.parse(super.getLocalStorage("referencia-questionario-area"))
        areas_ref[area_id] = areas_ref[area_id].filter((quest)=>{ return quest.id != questionario_id})
        super.saveLocalStorage("referencia-questionario-area",JSON.stringify(areas_ref))
    }

    atualizarRefenciaQuestionarioComArea(area_id, questionario_id){
        let areas_ref = JSON.parse(super.getLocalStorage("referencia-questionario-area"))
        areas_ref[area_id].forEach((quest)=>{ 
            if(quest.id == questionario_id){
                if(quest.status == 'iniciado'){quest.status = 'concluido'}
                else{quest.status = 'iniciado'}
            }
        })
        super.saveLocalStorage("referencia-questionario-area",JSON.stringify(areas_ref))
    }

}