import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HoyTenemosComponent } from './hoy-tenemos'
import { AccountsProvider } from '../../providers/accounts/accounts'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [HoyTenemosComponent],
  entryComponents: [HoyTenemosComponent],
  imports: [
    IonicPageModule.forChild(HoyTenemosComponent),
    IonicStorageModule.forRoot()
  ],
  exports: [HoyTenemosComponent],
  providers: [AccountsProvider]
})
export class HoyTenemosComponentModule {}
