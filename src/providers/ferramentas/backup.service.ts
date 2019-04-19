import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FerramentasProvider } from './ferramentas'
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the FileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BackupProvider {
  root_path = "file:///"
  teste = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  questionario_backup
  areas_backup
  fileSave
  diretorio
  nome_file

  constructor(private emailComposer: EmailComposer, private ferramentasService: FerramentasProvider, private file: File) {
  }

  public async salvarBackup(questionario, areas) {
    this.fileSave = {
      areas: areas,
      questionarios: questionario
    }
    await this.vericarRepositorioExiste()
  }

  //---------------------- Salvar backup localmente --------------------------------

  private vericarRepositorioExiste() {
    this.file.checkDir(this.file.externalApplicationStorageDirectory, 'pmsb').then(_ => {
      this.salvarLocalmenteFile()
    }).catch((err) => {
      this.criarDiretorio()
    });
  }

  private criarDiretorio() {
    this.file.createDir(this.file.externalApplicationStorageDirectory, "pmsb", false).then(_ => {
      this.salvarLocalmenteFile()
    }).catch((erro) => {
      this.ferramentasService.showAlert('O diretorio não foi criado', "")
    })
  }

  private salvarLocalmenteFile() {
    this.nome_file = this.gerarNomeArquivo()
    this.diretorio = this.file.externalApplicationStorageDirectory + "/pmsb/" + this.nome_file
    this.file.writeFile(this.file.externalApplicationStorageDirectory + "/pmsb", this.nome_file, JSON.stringify(this.fileSave), { replace: false })
      .then(() => {
      }).catch((err) => {
        this.ferramentasService.showAlert('O file não foi criado', JSON.stringify(err))
        console.error(err);
      });
  }

  private gerarNomeArquivo() {
    var date = new Date().toLocaleString()
    return "pmsb-" + date.replace(/[^\d]/g, '-') + ".json"
  }

  //---------------------- Salvar backup no email --------------------------------

  public enviarBackupPorEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });

    let email = {
      to: 'pmsb.web@gmail.com',
      cc: '',
      bcc: [''],
      attachments: [
        this.diretorio
      ],
      subject: this.nome_file,
      body: 'Não alterar esse email, somente enviar !',
      isHtml: true
    };

    this.emailComposer.open(email);
  }


}
