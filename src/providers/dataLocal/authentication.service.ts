import { Injectable } from '@angular/core';
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';
import { json } from 'body-parser';
import { Resposta } from '../../models/resposta.model';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable()
export class AuthenticationServiceLocal extends CoreServiceLocal {

    key: string = "usuario_atual_PMSB";
    key_info: string = "usuario_atual_PMSB_dados";
    user
    constructor(public storage: Storage) {
        super(storage);
    }

    saveAuthentication(resposta: any) {
        super.saveLocalStorageUser(this.key, JSON.stringify(resposta));
        super.saveStorageUser(this.key, JSON.stringify(resposta));
    }

    saveUserInfo(resposta) {
        super.saveLocalStorageUser(this.key_info, JSON.stringify(resposta))
    }

    // USADO Para logout
    clearAuthentication() {
        super.removeItemLocalStorageUser(this.key);
        super.removeItemLocalStorageUser(this.key_info);
    }

    getAuthentication() {
        return super.getLocalStorageUser(this.key);
    }

    getUserData(): any {
        return super.getLocalStorageUser(this.key_info)
    }

    getUserDataProcessado() {
        var user = JSON.parse(this.getUserData())
        return {
            email: user.email,
            id: user.id,
            username: user.username
        }
    }

    saveUserReference(model,usuario) {
        var refencia = {
            usuario: usuario,
            senha: model.password,
            token: super.getUserToken()
        }
        localStorage.setItem(model.username, JSON.stringify(refencia))

    }

    getUserReference(usuario_id) {
        let refencia = JSON.parse(localStorage.getItem(usuario_id))
        if (refencia) { return refencia }
        return null
    }

    loginOffline(model) {
        return new Promise((resolve, reject) => {
            let usuario:any = localStorage.getItem(model.username)
            if(usuario){
                usuario = JSON.parse(usuario)
                console.log(usuario)
                if(usuario.senha == model.password){
                    this.saveAuthentication({token:usuario.token})
                    resolve(usuario)
                }else{
                    reject({0:"Falha no login offline !",1:"Verifique Usuário ou Senha"})
                }
            }else{
                reject({0:"Falha no login offline !",1:"Nenhum Usuário salvo com esse username. Para logar em modo offline é preciso ter logado uma vez com o celular conetado a internet !"})
            }
        })
    }

}