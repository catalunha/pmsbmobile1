import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class CoreServiceLocal {

    keyUser: string = "usuario_atual_PMSB";

    constructor(public storage: Storage) { }

    // Browser
    saveLocalStorage(key, objeto: any) {
        localStorage.setItem(`${key}/${this.getUserToken()}`, objeto);
    }
    
    // Browser
    removeItemLocalStorage(key) {
        localStorage.removeItem(`${key}/${this.getUserToken()}`);
    }
    
    // Browser
    getLocalStorage(key): any{
        return localStorage.getItem(`${key}/${this.getUserToken()}`);
    }
    
    // Device
    saveStorage(key, objeto: any): any{
        return this.storage.set(`${key}/${this.getUserToken()}`, objeto);
    }
    
    // Device
    removeItemStorage(key){
        this.storage.remove(`${key}/${this.getUserToken()}`);
    }
    
    // Device
    getStorage(key): any {
        return this.storage.get(`${key}/${this.getUserToken()}`);
    }
    
    // ---------------------------------------

    // Browser
    saveLocalStorageUser(key, objeto: any) {
        localStorage.setItem(key, objeto);
    }
    
    // Browser
    removeItemLocalStorageUser(key) {
        localStorage.removeItem(key);
    }
    
    // Browser
    getLocalStorageUser(key): any{
        return localStorage.getItem(key);
    }
    
    // Device
    saveStorageUser(key, objeto: any): any{
        return this.storage.set(key, objeto);
    }
    
    // Device
    removeItemStorageUser(key){
        this.storage.remove(key);
    }
    
    // Device
    getStorageUser(key): any {
        return this.storage.get(key);
    }

    getUserToken(){
        let usuario_atual_PMSB = JSON.parse(localStorage.getItem(this.keyUser));
        if(usuario_atual_PMSB) return usuario_atual_PMSB["token"];
        return "";
    }

}