import { Component } from '@angular/core';

import { ConcluidoPage } from '../concluido/concluido';
import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { ObservacaoPage } from '../observacoes/observacoes';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConcluidoPage;
  tab3Root = ObservacaoPage;

  constructor() {

  }
}
