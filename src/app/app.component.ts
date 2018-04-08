import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { IonicPage, NavController, App, MenuController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { OrdersProvider } from '../providers/orders/orders'
import { ToastController } from 'ionic-angular'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'LoginPage'

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private app$: App,
    private storage$: Storage,
    private order$: OrdersProvider,
    private toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()

      this.order$.messages.subscribe(msg => {
        if (msg.event === 'item updated') {
          console.log(msg)
          this.presentToast()
        }
      })
    })
  }

  logout() {
    this.storage$.clear().then(current => {
      this.app$.getRootNavs()[0].setRoot('LoginPage')
      this.menuCtrl.close()
    })
  }

  misTiendas() {
    this.app$.getRootNavs()[0].setRoot('HomePage')
    // this.menuCtrl.close()
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Pedido actualizado',
      duration: 3000,
      position: 'top'
    })
    toast.present()
  }
}
