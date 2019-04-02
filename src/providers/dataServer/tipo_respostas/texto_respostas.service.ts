import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CoreService } from './../core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { RespostaTipo } from '../../../models/resposta_pergunta.model';

@Injectable()
export class RespostaTextoService extends CoreService {

    constructor(private http: Http) {
        super(http, '/api/questionarios/texto_respostas');
    }

    public addRespostaAll(respostaList: RespostaTipo[]): any {
        return super.add(respostaList);
    }
}