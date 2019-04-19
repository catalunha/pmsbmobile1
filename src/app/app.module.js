var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { SelecionarAreaPage } from '../pages/selecionar-area/selecionar-area';
import { AtualizacaoPage } from '../pages/atualizacao/atualizacao';
// Imports de Providers
import { FerramentasProvider } from '../providers/ferramentas/ferramentas';
import { AtualizaQuestionario } from '../providers/dataLocal/atualiza_questionario.service';
import { CameraService } from '../providers/ferramentas/camera.service';
import { LocalizacaoService } from '../providers/ferramentas/localizacao.service';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version';
import { VersaoAppService } from '../providers/dataServer/versao_app.service';
import { AreaPage } from '../pages/area/area';
import { Network } from '@ionic-native/network';
import { BackupProvider } from '../providers/ferramentas/backup.service';
import { EmailComposer } from '@ionic-native/email-composer';
registerLocaleData(localePtBr);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                AreaPage,
                SelecionarAreaPage,
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
                AreaPage,
                SelecionarAreaPage,
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
                VersaoAppService,
                Network,
                EmailComposer,
                BackupProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map