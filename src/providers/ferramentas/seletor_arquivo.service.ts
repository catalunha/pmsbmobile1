import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

@Injectable()
export class SeletorArquivoService {

  constructor(private fileChooser: FileChooser,
    private filePath: FilePath) { }

  openFile(): any {
    return this.fileChooser.open();
  }

  readPathFile(file): any {
    return this.filePath.resolveNativePath(file);
  }
}
