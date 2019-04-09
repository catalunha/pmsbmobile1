import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetorCensitarioList } from '../../models/setor_censitario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';

/**
 * Generated class for the AreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
  providers: [SetorCensitarioLocalService, SetorCensitarioService]
})
export class AreaPage {

  setoresDisponiveis: SetorCensitarioList;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public setorCensitario: SetorCensitarioLocalService,
               private ferramentas: FerramentasProvider) {
    this.getSetoresLocal();
    
  }

  getSetoresLocal() {
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      console.log(this.setoresDisponiveis.setoresCensitarios);
    }
    const error = error => console.log(error);
    this.setorCensitario.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }

}
