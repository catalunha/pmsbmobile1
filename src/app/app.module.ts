// Imports Padrões
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Imports de Plugins/Ferramentas
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

// Imports de Pages
// import { AboutPage } from '../pages/about/about';
import { ObservacaoPage } from '../pages/observacoes/observacoes';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ConcluidoPage } from '../pages/concluido/concluido';
import { PendenciasPage } from '../pages/pendencias/pendencias';
import { PerguntaPage } from '../pages/pergunta/pergunta';
import { QuestionariosPage } from '../pages/questionarios/questionarios';
import { VisualizarPage } from '../pages/visualizar/visualizar';

// Imports de Providers
import { FerramentasProvider } from '../providers/ferramentas/ferramentas';
import { AtualizaQuestionario } from '../providers/dataLocal/atualiza_questionario.service';
import { CameraService } from '../providers/ferramentas/camera.service';
import { LocalizacaoService } from '../providers/ferramentas/localizacao.service';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version';
import { VersaoAppService } from '../providers/dataServer/versao_app.service';
import { AtualizacaoPage } from '../pages/atualizacao/atualizacao';

registerLocaleData(localePtBr)

@NgModule({
  declarations: [
    MyApp,
    ObservacaoPage,
    HomePage,
    TabsPage,
    LoginPage,
    ConcluidoPage,
    PendenciasPage,
    PerguntaPage,
    QuestionariosPage,
    VisualizarPage,
    AtualizacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ObservacaoPage,
    HomePage,
    TabsPage,
    LoginPage,
    ConcluidoPage,
    PendenciasPage,
    PerguntaPage,
    QuestionariosPage,
    VisualizarPage,
    AtualizacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FerramentasProvider,
    Camera,
    Geolocation,
    AtualizaQuestionario,
    FileChooser,
    FilePath,
    CameraService,
    LocalizacaoService,
    File, 
    FileTransfer,
    Base64,
    AppVersion,
    VersaoAppService
  ]
})
export class AppModule { }
