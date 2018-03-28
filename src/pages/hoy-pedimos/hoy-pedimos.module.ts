import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HoyPedimosComponent } from './hoy-pedimos'
import { AccountsProvider } from '../../providers/accounts/accounts'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [HoyPedimosComponent],
  entryComponents: [HoyPedimosComponent],
  imports: [
    IonicPageModule.forChild(HoyPedimosComponent),
    IonicStorageModule.forRoot()
  ],
  exports: [HoyPedimosComponent],
  providers: [AccountsProvider]
})
export class HoyPedimosPageModule {}
