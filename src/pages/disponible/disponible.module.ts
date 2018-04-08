import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DisponiblePage } from './disponible'

@NgModule({
  declarations: [DisponiblePage],
  entryComponents: [DisponiblePage],
  imports: [IonicPageModule.forChild(DisponiblePage)],
  exports: [DisponiblePage]
})
export class DisponiblePageModule {}
