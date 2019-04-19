import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { VersaoApp } from '../../models/versaoApp.model';
import { AppVersion } from '@ionic-native/app-version';
import { FerramentasProvider } from '../ferramentas/ferramentas';


@Injectable()
export class VersaoAppService extends CoreService {

  private versaoAtualizada
  private versaoON
  private versaoOff

  constructor(private ferramentasProv: FerramentasProvider, private appVersion: AppVersion, private http: Http) {
    super(http, '/api/versao/app');
    this.versaoAtualizada = false
    this.verificaVesaoOnline()
  }

  public getVersaoApp(params: any): Observable<any> {
    return super.all(params);
  }


  public async verificarVersaoEstaAtualizada() {
    return new Promise((resolve, reject) => {
      this.verificaVesaoOnline().then(() => {
        resolve(this.versaoAtualizada)
      })
    })
  }

  public async verificaVesaoOnline() {
    this.versaoAtualizada = false
    await this.getVersaoApp({}).subscribe(
      resposta => {
        localStorage.removeItem('versao-aplicativo')
        this.verificaVersaoOffline(resposta)
      }, error => {
        this.verificaVersaoAtualizadaNoStorage()
      });
  }

  private verificaVersaoOffline(versao_on) {
    this.appVersion.getVersionNumber().then(
      versao_off => {
        if (versao_off == versao_on) {
          this.versaoAtualizada = true
        }
        this.atualizaStorageVersao(versao_on, this.versaoAtualizada)
      }).catch(error => {
        this.versaoAtualizada = false
      });
  }

  private verificaVersaoAtualizadaNoStorage() {
    let versao: any = this.getVersaoStorage()
    if (versao) {
      if (versao.atualizado) {
        this.versaoAtualizada = true
      }
    } else {
      this.versaoAtualizada = true
    }
  }

  public async atualizaStorageVersao(versao, atualizado) {
    let marcadorVersao = { versao: versao, atualizado: atualizado }
    localStorage.setItem("versao-aplicativo", JSON.stringify(marcadorVersao))
  }

  public getVersaoStorage() {
    let versao = localStorage.getItem('versao-aplicativo')
    if(versao){
      return JSON.parse(versao)
    }else{
      return null
    }
  }

}