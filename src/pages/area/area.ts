import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { AlertController } from 'ionic-angular';
import * as uuid from 'uuid'


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
  area_nova = ""
  setoresDisponiveis: SetorCensitarioList;
  setoresOffline: SetorCensitarioList;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public setorCensitario: SetorCensitarioLocalService,
    private ferramentas: FerramentasProvider) {
    this.getSetoresLocal();
  }

  getSetoresLocal() {
    console.log(uuid.v4())
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      console.log(this.setoresDisponiveis.setoresCensitarios);
    }
    const error = error => console.log(error);
    this.setorCensitario.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
    
  }

  getSetorSuperior(setor_superior) {
    return this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
  }

  getSetorNome(setor){
    if(setor.setor_superior){
      return this.getSetorNome(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome 
    }
    return setor.nome
  }

  adicionarNovaArea() {
    if (this.area_nova.length == 0) {
      this.ferramentas.showAlert("O campo nova área está vazio !", "Insira um nome valido no campo nova área.")
    } else {
      let alert = this.alertCtrl.create();
      alert.setCssClass('alertCustomCss')
      alert.setTitle(`A ( ${this.area_nova} ) faz parte de outra área ? caso sim escolha abaixo.`);
      alert.addInput({
        type: 'radio',
        label: "Nenhuma",
        value: null,
        checked: true,
      });
      
      this.setoresDisponiveis.setoresCensitarios.forEach((setor) => {
        alert.addInput({
          type: 'radio',
          label: this.getSetorNome(setor),
          value: setor.id,
          checked: false
        });
      })

      alert.addButton('Cancelar');
      alert.addButton({
        text: 'Salvar',
        handler: data => {
          this.salvarNovaAreaServidor(data)
        }
      });
      alert.present();
    }
  }

  gerarNovaInstanciaSetor(areasup){
    let novo_setor = new SetorCensitario()
    novo_setor.fake_deletado = false
    novo_setor.fake_deletado_em = null
    novo_setor.nome = this.area_nova
    novo_setor.setor_superior = areasup
    novo_setor.id = null
    return novo_setor
  }

  async salvarNovaAreaServidor(areasup) {
    let novo_setor = this.gerarNovaInstanciaSetor(areasup)
    await this.setorCensitario.postNovoSetorCensitarioNoServidor(novo_setor).subscribe(
      resposta => {
        this.ferramentas.presentToast(`A área ${this.area_nova} foi cadastrada com suceso !`) 
      },
      error => {
        novo_setor.id = uuid.v4()
        this.setoresDisponiveis.setoresCensitarios.push(novo_setor)
        this.setorCensitario.salvarSetorOffline(novo_setor)
        this.setorCensitario.adicionarSetorCensitarios(this.setoresDisponiveis.setoresCensitarios)
      }
    )
    await this.atualizarListaSetores()
  }

  async atualizarListaSetores(){
    this.area_nova = ""
    this.setorCensitario.getSetoresCensitariosServidor()
    this.ferramentas.presentLoading(" Aguarde ! Atualizando a pagina. ")
    await setTimeout(async()=>{
      this.getSetoresLocal();
    }, 4000); 
  }
}