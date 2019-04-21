import { Component } from '@angular/core';

import { ConcluidoPage } from '../concluido/concluido';
import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { ObservacaoPage } from '../observacoes/observacoes';
import { AreaPage } from '../area/area';
import { AuthenticationServiceLocal } from './../../providers/dataLocal/authentication.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [AuthenticationServiceLocal]
})
export class TabsPage {
  tab1Root = AreaPage;
  tab2Root = HomePage;
  tab3Root = ConcluidoPage;
  tab4Root = ObservacaoPage;

  
  username = ""
  user

  constructor(private authentication_local:AuthenticationServiceLocal) {
    this.user = JSON.parse(this.authentication_local.getUserData())
    this.username = this.user.last_name
  }

  ionViewWillEnter(){
    this.username = this.user.last_name
  }

  ionViewDidEnter() {
    this.username = this.user.last_name
  }
}
