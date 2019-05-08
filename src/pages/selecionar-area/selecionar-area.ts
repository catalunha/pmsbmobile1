import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';
import { ViewController } from 'ionic-angular';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';

/**
 * Generated class for the SelecionarAreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecionar-area',
  templateUrl: 'selecionar-area.html',
  providers: [SetorCensitarioLocalService, SetorCensitarioService]
})
export class SelecionarAreaPage {
  setoresDisponiveis: SetorCensitarioList;
  area = null
  Nenhum = null
  nenhumVisible

  constructor(private ferramentas: FerramentasProvider, public viewCtrl: ViewController
    ,public navCtrl: NavController
    ,public navParams: NavParams
    ,public setorCensitario: SetorCensitarioLocalService) {}

  async ionViewWillEnter(){
    this.nenhumVisible = this.navParams.get('nenhumVisible');
    this.setoresDisponiveis = null
    const sucess = async setoresDisponiveis => {
      this.setoresDisponiveis = await setoresDisponiveis;
      await this.setorCensitario.getSetoresOffline().forEach((setor)=>{this.setoresDisponiveis.setoresCensitarios.push(setor)})
      await this.setoresDisponiveis.setoresCensitarios.forEach((setor)=>{setor['_nome']=this.getSetorNome(setor)})
      await this.ordenarSetores()
    }
    const error = error => console.log(error);
    this.setorCensitario.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  } 

  getSetorSuperior(setor_superior) {
    return this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
  }

  getSetorNome(setor) {
    if (setor.setor_superior) {
      return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome
    }
    return setor.nome
  }

  adicionarNovaArea(){
    if(!this.area){
      this.ferramentas.showAlert('Para continuar escolha uma das áreas listadas.',"")
      return
    }
    let area = this.setoresDisponiveis.setoresCensitarios.find(setor=>{return setor.id == this.area})
    this.viewCtrl.dismiss({ area: area, cancelado:false});
  }

  async ordenarSetores() {
    this.setoresDisponiveis.setoresCensitarios.sort(function (a, b) {
      a = a['_nome'].toLowerCase();
      b = b['_nome'].toLowerCase();
      if (a > b) { return 1 }
      else if (a < b) { return -1 } 
      else if (a === b) { return 0 }
    })
  }

  cancelar(){
    this.viewCtrl.dismiss({ area: null , cancelado:true});
  }

}
