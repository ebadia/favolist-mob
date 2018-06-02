import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaDiasPage } from './lista-dias';

@NgModule({
  declarations: [
    ListaDiasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaDiasPage),
  ],
})
export class ListaDiasPageModule {}
