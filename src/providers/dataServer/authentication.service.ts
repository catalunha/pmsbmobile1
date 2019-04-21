import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/map'
import { Usuario } from './../../models/usuario.model';

@Injectable()
export class AuthenticationService extends CoreService {

    constructor(private http: Http) {
        super(http, '/api/auth/get-auth-token');
    }

    login(instance: any): Observable<Usuario> {
        return super.post(instance);
    }

    postUsuarioInformacoes(instance){
        return super.postUserInfo(instance,"/api/auth/jwt/auth-token/")
    }
}