import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendenciasPage } from './pendencias';

@NgModule({
  declarations: [
    PendenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(PendenciasPage),
  ],
})
export class PendenciasPageModule {}
