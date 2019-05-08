import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Http } from '@angular/http';
import { promises } from 'fs';
import { rejects } from 'assert';

/*
  Generated class for the GruposProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GruposProvider extends CoreService {

  constructor(public http: Http) {
    super(http,'/api/questionarios/grupo/')
  }

  getListaGrupoServidor(){
    return new Promise((resolve,rejects)=>{
      super.all({}).subscribe( resposta => {
        this.salvarListaGruposNoStorage(resposta['results'])
        console.log(resposta['results'])
        resolve(resposta['results'])
      }, async error => {
        let grupo_questionario_lista = await this.recuperarListaGruposDoStorage()
        await resolve(grupo_questionario_lista)
      })
    })
  }

  private salvarListaGruposNoStorage(obj){
    localStorage.setItem('grupo-questionario-lista',JSON.stringify(obj))
  }

  private recuperarListaGruposDoStorage(){
    let grupo_questionario_lista = localStorage['grupo-questionario-lista']
    if(grupo_questionario_lista){return JSON.parse(grupo_questionario_lista)}
    else{ return false }
  }

}
