import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { VersaoApp } from '../../models/versaoApp.model';

 
@Injectable()
export class VersaoAppService extends CoreService{

    constructor(private http:Http) {
      super(http, '/api/versao');
    }

    public getVersaoApp(params: any): Observable<VersaoApp[]>{
      return super.all(params);
    }
}