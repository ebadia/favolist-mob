import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoginPage } from './login'
import { AccountsProvider } from '../../providers/accounts/accounts'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage), IonicStorageModule.forRoot()],
  exports: [LoginPage],
  providers: [AccountsProvider]
})
export class LoginPageModule {}
