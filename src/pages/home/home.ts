// Imports Nativos
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';

// Imports Services e Providers
import { QuestionarioIniciadoLocalService } from './../../providers/dataLocal/questionario_iniciado.service';

// Imports Pages
import { PendenciasPage } from './../pendencias/pendencias';
import { QuestionariosPage } from './../questionarios/questionarios';
import { PerguntaPage } from '../pergunta/pergunta';
import { VisualizarPage } from '../visualizar/visualizar';

// Imports Models
import { Questionario, QuestionariosList } from '../../models/questionario.model';
import { FerramentasProvider } from '../../providers/ferramentas/ferramentas';

// Outros Imports
import { SetorCensitarioLocalService } from '../../providers/dataLocal/setor_censitario.service'
import { SetorCensitarioService } from '../../providers/dataServer/setor_censitario.service';
import { SetorCensitarioList } from '../../models/setor_censitario.model'
import { resolve } from 'path';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QuestionarioIniciadoLocalService, SetorCensitarioLocalService, SetorCensitarioService]
})

export class HomePage {
  marcador_carregando_dados = true
  marcador_selecao = true
  marcador_fim = false
  objectKeys = Object.keys;
  questionariosIniciados: QuestionariosList;
  setoresDisponiveis: SetorCensitarioList;
  questionariosIniciadosAux: QuestionariosList

  setor_censitario_atual
  //Setores ref é uma estrutura de relação de area com os questionarios já respondidos
  setores_ref

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private questionarioIniciadoLocalService: QuestionarioIniciadoLocalService,
    public actionSheetCtrl: ActionSheetController,
    public ferramentas: FerramentasProvider,
    private setorCensitarioLocalService: SetorCensitarioLocalService) {
      delete localStorage['setores_ref']
      this.getSetoresLocal()
    }

  async getSetoresLocal() {
    const sucess = setoresDisponiveis => {
      this.setoresDisponiveis = setoresDisponiveis;
      this.setorCensitarioLocalService.getSetoresOffline().forEach((setor) => { this.setoresDisponiveis.setoresCensitarios.push(setor) })
    }
    const error = error => console.log(error);
    await this.setorCensitarioLocalService.getSetoresCensitariosDisponiveis()
      .then(sucess)
      .catch(error);
  }


   async ionViewWillEnter() {
    this.marcador_fim = false
    await this.getQuestionariosIniciados().then(()=>{
      this.iniciar()
    });
    await this.getSetoresLocal()
    await this.atualizarSetoresRef()  
  }

  // Verifica os questionários iniciados sempre que a tela é chamada
  async iniciar() {
    this.marcador_selecao = true
    this.marcador_carregando_dados = await true
    this.setores_ref = await this.setorCensitarioLocalService.getListaRefenciaQuestionarioComArea()
    await this.atualizarMarcadorRef()
  }

  getQuestionariosIniciados() {
    return new Promise((resolve,reject)=>{
      this.questionariosIniciadosAux = null
      const atribuicao = questionariosIniciadosLocalmente => {
        this.questionariosIniciadosAux = questionariosIniciadosLocalmente;
        resolve(questionariosIniciadosLocalmente)
      }
      this.questionarioIniciadoLocalService.getQuestionariosIniciados()
        .then(atribuicao)
        .catch(error => console.error(error));
    })
  }

  async atualizarSetoresRef(){
    this.setores_ref = await this.setorCensitarioLocalService.getListaRefenciaQuestionarioComArea()
  }

  async atualizarMarcadorRef(){
    if(localStorage['setores_ref']){
      await this.selecionarArea(JSON.parse(localStorage['setores_ref']).id)
    }else{
      this.marcador_fim = true
      //await this.getSetoresLocal()
      //await this.getQuestionariosIniciados();
    }
  }

  // Barra de opções de ações para o usuário
  $opcoesQuestionario(questionario: Questionario) {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções de Questionário',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            let area = this.getNomeArea(questionario.setor_censitario)
            localStorage['setores_ref'] = JSON.stringify(this.setor_censitario_atual)
            this.navCtrl.push(PerguntaPage, { "questionarioPosicao": this.questionariosIniciadosAux.questionarios.indexOf(questionario), "area": area })
          }
        }, {
          text: 'Verificar Pendências',
          handler: () => {
            localStorage['setores_ref'] = JSON.stringify(this.setor_censitario_atual)
            this.navCtrl.push(PendenciasPage, { "questionarioPosicao": this.questionariosIniciadosAux.questionarios.indexOf(questionario)})
          }
        }, {
          text: 'Visualizar Respostas',
          handler: () => {
            localStorage['setores_ref'] = JSON.stringify(this.setor_censitario_atual)
            this.navCtrl.push(VisualizarPage, { "questionarioPosicao": this.questionariosIniciadosAux.questionarios.indexOf(questionario) })
          }
        }, {
          text: 'Concluir',
          handler: () => {
            this.concluirQuestionario(questionario);
          }
        }, {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.removerQuestionario(questionario);
          }
        }, {
          text: 'Cancelar Ação',
          role: 'cancel',
          handler: () => {
            console.log('Nenhuma Ação Escolhida');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Concluir um Questionário Iniciado
  concluirQuestionario(questionario: Questionario) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmar: Concluir',
      message: 'Tem certeza que deseja CONCLUIR este questionário?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Ação Cancelada');
          }
        },
        {
          text: 'Sim',
          handler: async () => {
            await this.setorCensitarioLocalService.atualizarRefenciaQuestionarioComArea(questionario.setor_censitario.id, questionario.id,'concluido')
            await this.questionarioIniciadoLocalService.concluirQuestionarioIniciado(questionario, this.questionariosIniciadosAux);
            this.ferramentas.presentLoading("Carregando...",3000)
            await this.resetarPagina()
          }
        }
      ]
    });
    confirm.present();
  }

  // Apagar um Questionário Iniciado
  removerQuestionario(questionario: Questionario) {
    const prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Depois que um questionário é removido ele não poderá mais ser editado. Digite REMOVER para executar esta ação.",
      inputs: [
        {
          name: 'texto',
          placeholder: 'REMOVER'  
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.ferramentas.presentToast("Ação Cancelada");
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            if (data.texto === "REMOVER") {
              this.setorCensitarioLocalService.removerRefenciaQuestionarioComArea(questionario.setor_censitario.id, questionario.id)
              this.questionarioIniciadoLocalService.removeQuestionarioIniciado(questionario, this.questionariosIniciadosAux);
              this.resetarPagina()
            } else {
              this.ferramentas.presentToast("Ação Cancelada");
            }
          }
        }
      ]
    });
    prompt.present();
  }

  async resetarPagina(){
    console.log('resetarPagina')
    await this.atualizarSetoresRef()
    let aux = await this.getSetoresIniciadosList(this.setores_ref[this.setor_censitario_atual.id])
    if(aux.length < 1){ this.voltarAListaAreas() }
    await this.iniciar()
  }

  $novaResolucaoQuestionario() {
    this.navCtrl.push(QuestionariosPage);
  }

  getSetorSuperior(setor_superior) {
    return this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == setor_superior })//.nome
  }

  getNomeArea(setor) {
    if (setor.setor_superior) {
      return this.getNomeArea(this.getSetorSuperior(setor.setor_superior)) + " -> " + setor.nome
    }
    return setor.nome
  }

  getSetorNomeAreaId(id) {
    let setor = this.setoresDisponiveis.setoresCensitarios.find(setor => { return setor.id == id })
    return this.getNomeArea(setor)
  }

  async selecionarArea(setor) {

    this.questionariosIniciados = await null
    
    this.questionariosIniciados = await new QuestionariosList(this.questionariosIniciadosAux.key)
    
    this.setor_censitario_atual = await {id:setor,nome:this.getSetorNomeAreaId(setor)}
    
    localStorage['setores_ref'] = await JSON.stringify(this.setor_censitario_atual)
    
    await this.setores_ref[setor].forEach((quest) => {
      if(quest.status == 'iniciado'){ this.adicionarQuestionarioAListaLocal(quest,setor) }
    })
    this.marcador_selecao = false
    this.marcador_fim = true
  }

  async adicionarQuestionarioAListaLocal(quest_ref,setor) {

    let questionario:any = this.questionariosIniciadosAux.questionarios.find(
      (quest) => { return quest.id == quest_ref.id && quest.setor_censitario.id == setor}
    )
    if (questionario) { this.questionariosIniciados.questionarios.push(questionario)}
  }

  voltarAListaAreas(){
    delete localStorage['setores_ref']
    this.marcador_selecao = true
    this.iniciar()
  }

  getSetoresIniciadosList(setores){
    return setores.filter((quest)=>{return quest.status == "iniciado"})
  }

}