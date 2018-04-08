import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SigninPage } from './signin'
import { AccountsProvider } from '../../providers/accounts/accounts'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [SigninPage],
  imports: [IonicPageModule.forChild(SigninPage), IonicStorageModule.forRoot()],
  exports: [SigninPage],
  providers: [AccountsProvider]
})
export class SigninPageModule {}
