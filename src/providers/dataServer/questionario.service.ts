import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Questionario } from './../../models/questionario.model';
 
@Injectable()
export class QuestionarioService extends CoreService{

    constructor(private http:Http) {
      super(http, '/api/questionarios/questionarios');
    }

    public getQuestionarios(params: any): Observable<Questionario[]>{
      return super.all(params);
    }
}