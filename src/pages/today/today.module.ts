import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { TodayPage } from './today'
import { AccountsProvider } from '../../providers/accounts/accounts'

import { DisponiblePageModule } from './../disponible/disponible.module'
import { DisponiblePage } from '../disponible/disponible'

@NgModule({
  declarations: [TodayPage],
  entryComponents: [],
  imports: [IonicPageModule.forChild(TodayPage)],
  exports: [TodayPage],
  providers: [AccountsProvider]
})
export class TodayPageModule {}
