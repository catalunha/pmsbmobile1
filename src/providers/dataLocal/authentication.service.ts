import { Injectable } from '@angular/core';
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';
import { json } from 'body-parser';
import { Resposta } from '../../models/resposta.model';

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

    saveUserInfo(resposta){
        super.saveLocalStorage(this.key_info, JSON.stringify(resposta))
    }

    // USADO Para logout
    clearAuthentication() {
        super.removeItemLocalStorageUser(this.key);
        super.removeItemLocalStorageUser(this.key_info);
    }

    getAuthentication() {
        return super.getLocalStorageUser(this.key);
    }

    getUserData():any {
        return super.getLocalStorage(this.key_info)
    }

    getUserDataProcessado(){
        var user = JSON.parse(this.getUserData())
        return {
            email:user.email,
            id:user.id,
            username:user.username
        }
    }

}