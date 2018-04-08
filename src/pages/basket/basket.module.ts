import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { BasketPage } from './basket'
import { AccountsProvider } from '../../providers/accounts/accounts'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [BasketPage],
  imports: [IonicPageModule.forChild(BasketPage), IonicStorageModule.forRoot()],
  exports: [BasketPage],
  providers: [AccountsProvider]
})
export class BasketPageModule {}
