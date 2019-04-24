import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetorCensitarioList, SetorCensitario } from '../../models/setor_censitario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service';
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { AlertController, Platform } from 'ionic-angular';
import * as uuid from 'uuid'
import { CssSelector } from '@angular/compiler';
import { ModalController } from 'ionic-angular';
import { SelecionarAreaPage } from '../selecionar-area/selecionar-area'
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
  area

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public plt: Platform,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public setorCensitario: SetorCensitarioLocalService,
    private ferramentas: FerramentasProvider) {
  }

  async ionViewDidLoad() {
    this.ferramentas.presentLoading(" Aguarde ! Atualizando a pagina. ")
    await this.atualizarListaSetores()
    await this.getSetoresLocal();
  }

  ionViewDidEnter() {
    //this.atualizarListaSetores()
    this.getSetoresLocal();
  }

  getSetoresLocal() {
    this.setoresDisponiveis = null
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      console.log(this.setoresDisponiveis.setoresCensitarios);
      this.setorCensitario.getSetoresOffline().forEach((setor) => { this.setoresDisponiveis.setoresCensitarios.push(setor) })
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

  adicionarNovaArea() {
    if (!this.area) {
      this.ferramentas.showAlert('Para continuar escolha uma das áreas listadas.', "")
      return
    }
    if (this.area_nova.length == 0) {
      this.ferramentas.showAlert("O campo nova área está vazio !", "Insira um nome valido no campo nova área.")
      return 
    }

    let area = this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == this.area })
    if (area) { this.salvarNovaAreaServidor(area.id) } 
    else { this.salvarNovaAreaServidor(null) }

    /** 
    let profileModal = this.modalCtrl.create(SelecionarAreaPage, {nenhumVisible:true});
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(!data.cancelado){
        console.log(data.area)
        if(data.area){
          this.salvarNovaAreaServidor(data.area.id)
        }else{
          this.salvarNovaAreaServidor(null)
        }
      }
    });*/

  }

  gerarNovaInstanciaSetor(areasup) {
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
    await this.setorCensitario.postSetorSencitario(novo_setor).then(
      resposta => {
        this.ferramentas.presentToast(`A área ${this.area_nova} foi cadastrada com suceso !`)
        this.atualizarListaSetores()
      }).catch(
        error => { this.tratarErrorSetor(error, novo_setor) }
      )
  }

  async tratarErrorSetor(error, novo_setor) {
    let err = error.error.json()
    console.log(error.error.status)

    if (error.error.status == 400) {
      this.ferramentas.showAlert(err.nome, "")
    } else if (error.error.status == 0) {
      if (this.setoresDisponiveis.setoresCensitarios.find((setor) => { return setor.nome == novo_setor.nome })) {
        this.ferramentas.showAlert("setor censitario com esse nome já existe.", "")
      } else {
        novo_setor.id = uuid.v4()
        await this.setorCensitario.salvarSetorOffline(novo_setor)
        await this.ferramentas.presentLoading(" Aguarde ! Atualizando a pagina. ")
        await this.atualizarListaSetores()
      }

    }
  }

  async atualizarListaSetores() {
    this.area_nova = ""
    await this.setorCensitario.getSetoresCensitariosServidor()
    await setTimeout(async () => {
      this.getSetoresLocal();
    }, 3000);
  }
}