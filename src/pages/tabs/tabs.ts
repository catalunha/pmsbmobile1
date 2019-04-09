import { Component } from '@angular/core';

import { ConcluidoPage } from '../concluido/concluido';
import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { ObservacaoPage } from '../observacoes/observacoes';
import { AreaPage } from '../area/area';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AreaPage;
  tab2Root = HomePage;
  tab3Root = ConcluidoPage;
  tab4Root = ObservacaoPage;

  constructor() {

  }
}
