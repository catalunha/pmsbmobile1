import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsuarioService extends CoreService{

    constructor(private http:Http) {
      super(http, '/api/questionarios/usuarios/');
    }

    public getUsuario(id): Observable<any>{
      return super.get(id);
    }
}