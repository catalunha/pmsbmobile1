import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import { SetorCensitario } from '../../models/setor_censitario.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

 
@Injectable()
export class SetorCensitarioService extends CoreService{

    constructor(private http:Http) {
      super(http, '/api/questionarios/setores_censitarios');
    }

    public getSetoresCensitarios(params: any): Observable<SetorCensitario[]>{
      return super.all(params);
    }

    public setSetorCensitario(params: any){
      super.atualizarHeaders()
      return super.add(params)
    }

}