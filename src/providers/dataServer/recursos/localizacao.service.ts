import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreService } from './../core.service';
import { Coordenada } from '../../../models/resposta_pergunta.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LocalizacaoService extends CoreService {

    constructor(private http: Http) {
        super(http, '/api/questionarios/localizacoes');
    }

    public addLocalizacao(localizacao: Coordenada): any {
        return super.add(localizacao);
    }
}