import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionariosPage } from './questionarios';

@NgModule({
  declarations: [
    QuestionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionariosPage),
  ],
})
export class QuestionariosPageModule {}
