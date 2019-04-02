import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthenticationServiceLocal } from './../providers/dataLocal/authentication.service';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenticationServiceLocal]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authenticarion_local: AuthenticationServiceLocal) {

    let usuario_atual = this.authenticarion_local.getAuthentication();
    if (usuario_atual) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
