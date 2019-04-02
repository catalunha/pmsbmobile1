import { Injectable } from '@angular/core';
import { CoreServiceLocal } from './core.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthenticationServiceLocal extends CoreServiceLocal {

    key: string = "usuario_atual_PMSB";

    constructor(public storage: Storage) {
        super(storage);
    }

    saveAuthentication(resposta: any) {
        super.saveLocalStorageUser(this.key, JSON.stringify(resposta));
        super.saveStorageUser(this.key, JSON.stringify(resposta));
    }

    // USADO Para logout
    clearAuthentication() {
        super.removeItemLocalStorageUser(this.key);
    }

    getAuthentication() {
        return super.getLocalStorageUser(this.key);
    }

}