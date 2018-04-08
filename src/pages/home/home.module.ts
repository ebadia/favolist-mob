import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePage } from './home'
import { IonicStorageModule } from '@ionic/storage'
import { UsersProvider } from './../../providers/users/users'

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage), IonicStorageModule.forRoot()],
  providers: [UsersProvider]
})
export class HomePageModule {}
