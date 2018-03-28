import { TodayPageModule } from './../pages/today/today.module'
import { DisponiblePageModule } from './../pages/disponible/disponible.module'
import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'
import { AuthInteceptor } from './../providers/accounts/auth.interceptor'

import { MyApp } from './app.component'
import { ComponentsModule } from './../components/components.module'
import { UsersProvider } from '../providers/users/users'
import { AccountsProvider } from '../providers/accounts/accounts'
import { AvailablesProvider } from '../providers/availables/availables'
import { OrdersProvider } from '../providers/orders/orders'
import { WebsocketService } from '../common/websocket.service'
import { HoyPedimosPageModule } from '../pages/hoy-pedimos/hoy-pedimos.module'

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    DisponiblePageModule,
    HoyPedimosPageModule,
    TodayPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptor, multi: true },
    UsersProvider,
    AccountsProvider,
    AvailablesProvider,
    OrdersProvider,
    WebsocketService
  ]
})
export class AppModule {}
